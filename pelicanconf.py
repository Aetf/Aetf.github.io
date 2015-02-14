# -*- coding: utf-8 -*-
from __future__ import unicode_literals

AUTHOR = 'Aetf'
SITENAME = 'Unlimited Code Works'
SITEURL = ''
TIMEZONE = 'Asia/Shanghai'

# can be useful in development, overrided to False in publishconf.py
RELATIVE_URLS = True

# File structures
PATH = 'content'
PAGE_PATHS = ['pages']
STATIC_PATHS = [
    'images',
    'extra/robots.txt',
    'extra/CNAME',
    ]
ARTICLE_PATHS = ['']
ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
AUTHOR_SAVE_AS = ''

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
FEED_ALL_ATOM = None
AUTHOR_FEED_ATOM = None
CATEGORY_FEED_ATOM = None
FEED_RSS = None
FEED_ALL_RSS = None
CATEGORY_FEED_RSS = None
AUTHOR_FEED_RSS = None
# above disabled for develop, overrided to following values in publishconf.py
feed_rss = None
feed_all_rss = 'feeds/all.rss.xml'
category_feed_rss = 'feeds/%s.rss.xml'

# Tag clouds
TAG_CLOUD_STEPS = 4
TAG_CLOUD_MAX_ITEMS = 100

# Global metadata to all the contents
DEFAULT_DATE = 'fs'
DEFAULT_METADATA = (('yeah', 'it is'),)

# Path-specific metadata
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/CNAME': {'path': 'CNAME'},
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
PLUGIN_PATHS = [
    'plugins',
]
PLUGINS = [
    'cjk_auto_spacing.cjk_auto_spacing',
    'render_math',
    'md_yaml.md_yaml.md_yaml',
    'random_article.random_article',
    'optimize_images.optimize_images',
    'related_posts.related_posts',
]
# Plugin settings
# Random article
RANDOM = 'random.html'
# Related posts
RELATED_POSTS_MAX = 5
#RELATED_POSTS_SKIP_SAME_CATEGORY = True

# Jinja filters
import sys
import os
sys.path.append(os.curdir)
from filters.sidebar import filter_sidebar
JINJA_FILTERS = {'sidebar': filter_sidebar}

# code blocks with line numbers
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}
