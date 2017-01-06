BUILDTOOLS=$(CURDIR)/tools
BUILDDIR=$(CURDIR)/build
VENVDIR=$(BUILDDIR)/venv

PIP?=$(VENVDIR)/bin/pip
PY?=$(VENVDIR)/bin/python

PELICAN?=$(VENVDIR)/bin/pelican
PELICANOPTS= -d --ignore-cache

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/blog
CONFFILE=$(BASEDIR)/config/main.py
PUBLISHCONF=$(BASEDIR)/config/publish.py

OUTPUTDIR=$(BUILDDIR)/output

GITHUB_PAGES_BRANCH=master

SSH_HOST=vps-trans
SSH_TARGET_DIR=/home/aetf/WebRoot/blog

DEBUG ?= 0
ifeq ($(DEBUG), 1)
	PELICANOPTS += -D
endif

RELATIVE ?= 0
ifeq ($(RELATIVE), 1)
	PELICANOPTS += --relative-urls
endif

help:
	@echo 'Makefile for a pelican Web site                                           '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make prepare                        install dependencies               '
	@echo '   make html                           (re)generate the web site          '
	@echo '   make clean                          remove the generated files         '
	@echo '   make distclean                      remove all untracked files         '
	@echo '   make regenerate                     regenerate files upon modification '
	@echo '   make publish                        generate using production settings '
	@echo '   make serve [PORT=8000]              serve site at http://localhost:8000'
	@echo '   make serve-global [SERVER=0.0.0.0]  serve (as root) to $(SERVER):80    '
	@echo '   make devserver [PORT=8000]          start/restart develop_server.sh    '
	@echo '   make stopserver                     stop local server                  '
	@echo '   make github                         upload the web site via gh-pages   '
	@echo '   make upload                         upload the web site via rsync+ssh  '
	@echo '                                                                          '
	@echo 'Set the DEBUG variable to 1 to enable debugging, e.g. make DEBUG=1 html   '
	@echo 'Set the RELATIVE variable to 1 to enable relative urls                    '
	@echo '                                                                          '

$(VENVDIR)/pip-selfcheck.json: $(BUILDTOOLS)/requirements.pip
	virtualenv $(VENVDIR)
	$(PIP) install -r $<

prepare: $(VENVDIR)/pip-selfcheck.json

html: prepare
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

distclean:
	git clean -fxd

regenerate: prepare
	$(PELICAN) -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

serve: prepare
ifdef PORT
	cd $(OUTPUTDIR) && $(PY) -m pelican.server $(PORT)
else
	cd $(OUTPUTDIR) && $(PY) -m pelican.server
endif

serve-global:
ifdef SERVER
	cd $(OUTPUTDIR) && $(PY) -m pelican.server 80 $(SERVER)
else
	cd $(OUTPUTDIR) && $(PY) -m pelican.server 80 0.0.0.0
endif

devserver: prepare
ifdef PORT
	$(BUILDTOOLS)/develop_server.sh restart $(PORT)
else
	$(BUILDTOOLS)/develop_server.sh restart
endif

stopserver: prepare
	$(BUILDTOOLS)/develop_server.sh stop
	@echo 'Stopped Pelican and SimpleHTTPServer processes running in background.'

publish: prepare
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)

github: publish
	$(VENVDIR)/bin/ghp-import -m "Generate Pelican site" -b $(GITHUB_PAGES_BRANCH) $(OUTPUTDIR)
	git push origin $(GITHUB_PAGES_BRANCH)

upload: publish
	rsync -P -rvzc --delete $(OUTPUTDIR)/ $(SSH_HOST):$(SSH_TARGET_DIR)

.PHONY: html help clean distclean prepare regenerate serve serve-global devserver publish github ssh_upload rsync_upload
