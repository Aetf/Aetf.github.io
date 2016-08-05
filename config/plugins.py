# -*- coding: utf-8 -*- #
#
# Plugin Settings
# Including:
# * Central Plugin List
# * Per Plugin Settings
# * Jinja Filters

# ==================================
# Central Plugin List
# ==================================
# NOTE: PLUGIN_PATHS is relative to main config file
PLUGIN_PATHS = ["../plugins"]
PLUGINS = ['md-prism-highlight', 'md-metayaml', 'tipue_search', 'tag_cloud',
           'filetime_from_git', 'assets']

# ==================================
# Per Plugin Settings
# ==================================
# md-metayaml

# tipue_search

# tag_cloud
## Count of different font sizes in the tag cloud.
TAG_CLOUD_STEPS = 20
## Maximum number of tags in the cloud.
TAG_CLOUD_MAX_ITEMS = 100
## The tag cloud ordering scheme.
## Valid values: random, alphabetically, alphabetically-rev, size and size-rev
TAG_CLOUD_SORTING = 'random'

# filetime_from_git
GIT_FILETIME_FOLLOW = True

# assets (Assets Management)

# ==================================
# Jinja Filters
# ==================================
import os
import sys
sys.path.append(os.path.abspath(os.path.realpath(__file__)+'/../..'))
import filters
JINJA_FILTERS = filters.filters
