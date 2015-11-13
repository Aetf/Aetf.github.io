#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

SITEURL = 'http://unlimitedcodeworks.xyz'
RELATIVE_URLS = False

try:
    FEED_ATOM = feed_atom
    FEED_ALL_ATOM = feed_all_atom
    CATEGORY_FEED_ATOM = category_feed_atom
    FEED_RSS = feed_rss
    FEED_ALL_RSS = feed_all_rss
    CATEGORY_FEED_RSS = category_feed_rss
except: pass

DELETE_OUTPUT_DIRECTORY = True

# Following items are often useful when publishing

#DISQUS_SITENAME = ""
#GOOGLE_ANALYTICS = ""
