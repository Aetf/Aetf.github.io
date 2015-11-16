#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Aetf'
SITENAME = 'Unlimited Code Works'
SITEURL = ''

TIMEZONE = 'America/Detroit'
DEFAULT_LANG = 'zh'

# File structures
PATH = 'content'
PAGE_PATHS = ['pages']
STATIC_PATHS = [
    'misc',
    'images',
]
ARTICLE_PATHS = ['']

# Url structures
ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html'
ARTICLE_LANG_URL = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}-{lang}/'
ARTICLE_LANG_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{date:%d}/{slug}-{lang}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
PAGE_LANG_URL = '{slug}-{lang}/'
PAGE_LANG_SAVE_AS = '{slug}-{lang}/index.html'
CATEGORY_URL = 'category/{slug}/'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
TAG_URL = 'tags/{slug}/'
TAG_SAVE_AS = 'tags/{slug}/index.html'
AUTHOR_URL = ''
AUTHOR_SAVE_AS = ''

YEAR_ARCHIVE_SAVE_AS = ''
MONTH_ARCHIVE_SAVE_AS = ''
DAY_ARCHIVE_SAVE_AS = ''
ARCHIVES_SAVE_AS = 'archives.html'
AUTHORS_SAVE_AS = ''
CATEGORIES_SAVE_AS = 'categories.html'
TAGS_SAVE_AS = 'tags.html'
#TAGS_SAVE_AS = ''
INDEX_SAVE_AS = 'index.html'

#STATIC_URL = '{path}'
#STATIC_SAVE_AS = '{path}'
EXTRA_PATH_METADATA = {
    'misc/CNAME': {'path': 'CNAME'},
}

# Theme and related settings
#THEME = 'themes/twenty-pelican-html5up'

SITESUBTITLE = 'A pessimist because of intelligence, but an optimist because of will.'
GITHUB_URL = 'http://github.com/Aetf/'
DISQUS_SITENAME = 'unlimitedcodeworks'

# Feed generation is usually not desired when developing
FEED_ATOM = None
FEED_ALL_ATOM = None
AUTHOR_FEED_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

FEED_RSS = None
FEED_ALL_RSS = None
CATEGORY_FEED_RSS = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
