BUILDTOOLS=$(CURDIR)/tools
VENVDIR=$(BUILDTOOLS)/venv

PIP?=$(VENVDIR)/bin/pip
PY?=$(VENVDIR)/bin/python

PELICAN?=$(VENVDIR)/bin/pelican
PELICANOPTS= -d

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/blog
OUTPUTDIR=$(BASEDIR)/build/output
CONFFILE=$(BASEDIR)/config/main.py
PUBLISHCONF=$(BASEDIR)/config/publish.py

GITHUB_PAGES_BRANCH=master

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
	@echo '                                                                          '
	@echo 'Set the DEBUG variable to 1 to enable debugging, e.g. make DEBUG=1 html   '
	@echo 'Set the RELATIVE variable to 1 to enable relative urls                    '
	@echo '                                                                          '

$(PELICAN): $(BUILDTOOLS)/requirements.pip
	pyvenv $(VENVDIR)
	$(PIP) install -r $<

prepare: $(PELICAN)

html: $(PELICAN)
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

distclean:
	git clean -fxd

regenerate: $(PELICAN)
	$(PELICAN) -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

serve: $(PELICAN)
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

devserver: $(PELICAN)
ifdef PORT
	$(BUILDTOOLS)/develop_server.sh restart $(PORT)
else
	$(BUILDTOOLS)/develop_server.sh restart
endif

stopserver: $(PELICAN)
	$(BUILDTOOLS)/develop_server.sh stop
	@echo 'Stopped Pelican and SimpleHTTPServer processes running in background.'

publish: $(PELICAN)
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)

github: publish
	$(VENVDIR)/bin/ghp-import -m "Generate Pelican site" -b $(GITHUB_PAGES_BRANCH) $(OUTPUTDIR)
	#git push origin $(GITHUB_PAGES_BRANCH)

.PHONY: html help clean distclean prepare regenerate serve serve-global devserver publish github
