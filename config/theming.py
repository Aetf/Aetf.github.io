# -*- coding: utf-8 -*- #
#
# Theming and settings read by theme templates
# Including:
# * Theme
# * Social Links
# * Custom Contents

# ==================================
# Theme
# ==================================
# NOTE: THEME is relative to main config file
THEME = '../themes/smoothie'

# smoothie uses a non-standard `blog` template for the list of articles
DIRECT_TEMPLATES = ['index', 'archives', 'blog']
BLOG_URL = 'blog'
BLOG_SAVE_AS = 'blog/index.html'


AVATAR_IMG = 'assets/img/avatar.jpg'
# COVER_IMG = "images/covers/red.png"

# ==================================
# Social Links
# ==================================
SOCIAL = {
        'Github': 'http://github.com/Aetf',
        'Email': 'mailto:aetf@unlimitedcodeworks.xyz',
		#'Twitter': 'http://twitter.com/xxxxxx',
        #'GooglePlus': 'https://plus.google.com/+xxxxxx/posts'
}


# ==================================
# Custom Contents
# ==================================

# Title & subtitle
SITE_TITLE_LABEL = "Unlimited Code Works"
SITE_SUBTITLE_LABEL = 'A pessimist because of intelligence, but an optimist because of will.'

# Description in metadata
SITE_DESCRIPTION = 'My name is Aetf. This is my personal blog.'

# A single paragraph before contact me buttons in landing page's contact section
CONTACT_ME_DESCRIPTION = ''

# Legal in footnote
SITE_LICENSE = """
<div xmlns:cc="http://creativecommons.org/ns#"
	 xmlns:dct="http://purl.org/dc/terms/"
	 about="http://kdheepak.com/">
	All content by Aetf on this page is licensed under a
	<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
		Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
	</a>.
</div>
"""

# About me section in landing page
LANDING_PAGE_ABOUT = { 'details':
"""
My name is Aetf. 
I’ve dabbled with mobile application and web development, home automation and photography. 
I’m currently working towards a Master’s degree in Electrical Engineering.
</p><p>
<img src="images/coverPicture.jpg" alt="Alt text! And a picture of me!" style="width:100%">
</p><p>
I love reading up on the history of places.
My dream is that one day I’d have travelled to every country in the world (Four down, 192 to go!).
I love watching movies and having discussions with friends about them. 
I’ve been on the seemingly never ending quest of completing IMDb’s top 250 movies of all time 
(An embarrassingly small 91 down, 159 to go). I love reading books and comic books. 

On this website, I intend to share interesting projects I’m currently working on
or have worked on in the past, partly also as a way of establishing an archive.
If you find anything interesting, feel absolutely free to get in touch with me.
</p></div>
"""
}
