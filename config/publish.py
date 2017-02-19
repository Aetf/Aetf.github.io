# -*- coding: utf-8 -*- #
#
# Publish override settings
# Including:
# * Basic Info Override
# * Feeds Override
# * Services Integration Override
# * Build Settings

import os
import sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from main import *

# ==================================
# Basic Info Override
# ==================================
SITEURL = 'https://unlimitedcodeworks.xyz'

SITE_INDEX_META = '<meta name="ocs-site-verification" content="9589b7319f5e5a86375fe6d729cb8c11" />'

# ==================================
# Feeds Override
# ==================================
FEED_DOMAIN = SITEURL
FEED_ATOM = 'feeds/all'
TAG_FEED_ATOM = 'feeds/tags/%s'

# ==================================
# Services Integration Override
# ==================================
#DISQUS_SITENAME = ""
#GOOGLE_ANALYTICS = ""

# ==================================
# Build Settings
# ==================================
DELETE_OUTPUT_DIRECTORY = True
RELATIVE_URLS = False
