# -*- coding: utf-8 -*-
from __future__ import unicode_literals

AUTHOR = 'Aetf'
SITENAME = 'Unlimited Code Works'
SITEURL = 'http://unlimitedcodeworks.xyz'
TIMEZONE = 'Asia/Shanghai'

# can be useful in development, but set to False when you're ready to publish
RELATIVE_URLS = True

# File structures
PATH = 'content'
PAGE_PATHS = ['pages']
STATIC_PATHS = [
    'images',
    'extra/robots.txt',
    ]
ARTICLE_PATHS = ['']
ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
AUTHOR_SAVE_AS = ''
IGNORE_FILES = [
        '*.sublime-project',
        '*.sublime-workspace',
        ]

# Theme and related settings
THEME = 'themes/twenty-pelican-html5up'

SITESUBTITLE = 'A pessimist because of intelligence, but an optimist because of will.'
GITHUB_URL = 'http://github.com/Aetf/'
DISQUS_SITENAME = 'unlimitedcodeworks'

# Improve with typogrify
TYPOGRIFY = True
PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = True
DEFAULT_PAGINATION = 4
DEFAULT_PAGES_ON_MENU = True

# Feed settings
FEED_ATOM = None
FEED_RSS = None
FEED_DOMAIN = SITEURL
FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

# Tag clouds
TAG_CLOUD_STEPS = 4
TAG_CLOUD_MAX_ITEMS = 100

# Global metadata to all the contents
DEFAULT_DATE = 'fs'
DEFAULT_METADATA = (('Author', 'Aetf'),
                    ('yeah', 'it is'),)

# Path-specific metadata
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    }

# Additional links
LINKS = (('Biologeek', 'http://biologeek.org'),
         ('Filyb', "http://filyb.info/"),
         ('Libert-fr', "http://www.libert-fr.com"),
         ('N1k0', "http://prendreuncafe.com/blog/"),
         ('Tarek Ziadé', "http://ziade.org/blog"),
         ('Zubin Mithra', "http://zubin71.wordpress.com/"),)

SOCIAL = (('github', 'http://github.com/Aetf'),)

# Markdown extensions
#MD_EXTENSIONS = [ ]

# custom page generated with a jinja2 template
#TEMPLATE_PAGES = {'pages/jinja2_template.html': 'jinja2_template.html'}

# Plugins
PLUGIN_PATHS = ['plugins']
PLUGINS = []

# code blocks with line numbers
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}
