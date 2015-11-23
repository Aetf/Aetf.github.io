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
PLUGINS = ['md-metayaml', 'tipue_search']

# ==================================
# Per Plugin Settings
# ==================================
# md-metayaml
# tipue_search

# ==================================
# Jinja Filters
# ==================================
import os
import sys
sys.path.append(os.path.abspath(os.path.realpath(__file__)+'/../..'))
import filters
JINJA_FILTERS = filters.filters
