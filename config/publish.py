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
sys.path.append(os.curdir)
from main import *

# ==================================
# Basic Info Override
# ==================================
SITEURL = 'http://unlimitedcodeworks.xyz'

# ==================================
# Feeds Override
# ==================================
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/%s.atom.xml'

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