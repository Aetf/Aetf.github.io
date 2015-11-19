# -*- coding: utf-8 -*- #
#
# Basic configuration of pelican
# Including:
# * Basic Info
# * File Structures
# * URL Mappings
# * Default Metadata

# ==================================
# Basic Info
# ==================================
AUTHOR = 'Aetf'
SITENAME = 'Unlimited Code Works'
# Site URL should be left empty when deployment local
SITEURL = ''

TIMEZONE = 'America/Detroit'
DEFAULT_LANG = 'zh'

# ==================================
# File Structures
# ==================================
# NOTE: PATH, OUTPUT_PATH, CACHE_PATH is relative to main config file
PATH = '../blog'
OUTPUT_PATH = '../build/output'
CACHE_PATH = '../build/cache'

# Followings are relative to PATH
ARTICLE_PATHS = ['']
PAGE_PATHS = ['pages']
STATIC_PATHS = ['assets']

# ==================================
# URL Mappings
# ==================================
INDEX_SAVE_AS = 'index.html'

# Articles
ARTICLE_URL = 'blog/{date:%Y}/{date:%b}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'blog/{date:%Y}/{date:%b}/{date:%d}/{slug}/index.html'
ARTICLE_LANG_URL = 'blog/{date:%Y}/{date:%b}/{date:%d}/{slug}-{lang}/'
ARTICLE_LANG_SAVE_AS = 'blog/{date:%Y}/{date:%b}/{date:%d}/{slug}-{lang}/index.html'

# Pages
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
PAGE_LANG_URL = '{slug}-{lang}/'
PAGE_LANG_SAVE_AS = '{slug}-{lang}/index.html'

# Categories
CATEGORY_URL = 'category/{slug}/'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
CATEGORIES_SAVE_AS = 'category/index.html'

# Tags
TAG_URL = 'tags/{slug}/'
TAG_SAVE_AS = 'tags/{slug}/index.html'
TAGS_SAVE_AS = 'tags/index.html'

# Author
AUTHOR_URL = ''
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''

# Archives
YEAR_ARCHIVE_SAVE_AS = ''
MONTH_ARCHIVE_SAVE_AS = ''
DAY_ARCHIVE_SAVE_AS = ''
ARCHIVES_SAVE_AS = 'archives.html'

# Static files
#STATIC_URL = '{path}'
#STATIC_SAVE_AS = '{path}'

# Special handles for files that should appear at root level
EXTRA_PATH_METADATA = {
    'assets/misc/CNAME': {'path': 'CNAME'},
}

# ==================================
# Default Metadata
# ==================================
DEFAULT_DATE = 'fs'