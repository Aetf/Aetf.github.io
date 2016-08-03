# -*- coding: utf-8 -*- #
#
# Settings adjusting appearance of the site
# Including:
# * Pagination
# * Typogrify
# * Markdown Extensions
# * Theme Awared Settings

# ==================================
# Pagination
# ==================================
DEFAULT_PAGINATION = False

# ==================================
# Typogrify
# ==================================
TYPOGRIFY = False

# ==================================
# Markdown Extensions
# ==================================
from markdown.extensions.toc import TocExtension
#MD_EXTENSIONS = ['codehilite(css_class=highlight, linenums=False, use_pygments=False)', 'extra']
MD_EXTENSIONS = ['extra', 'admonition',
                 TocExtension(permalink='polymer', baselevel=2)]

# ==================================
# Theme Awared Settings
# ==================================
SUMMARY_MAX_LENGTH = 5
