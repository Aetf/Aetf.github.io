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
DIRECT_TEMPLATES = ['index', 'archives', 'blog', 'search']
BLOG_URL = 'blog'
BLOG_SAVE_AS = 'blog/index.html'


AVATAR_IMG = 'assets/img/avatar.jpg'
COVER_IMG = "assets/img/cover.png"

# ==================================
# Social Links
# ==================================
SOCIAL = {
        'Github': 'http://github.com/Aetf',
        'Email': 'aetf@unlimitedcodeworks.xyz',
        'Mozillian': 'https://mozillians.org/en-US/u/Aetf/',
		#'Twitter': 'http://twitter.com/xxxxxx',
        'Google+': 'https://plus.google.com/+余佩峰/posts'
}


# ==================================
# Custom Contents
# ==================================

# Title & subtitle
SITE_TITLE_LABEL = "Unlimited Code Works"
SITE_SUBTITLE_LABEL = 'A pessimist because of intelligence, <br/>but an optimist because of will.'

# Description in metadata
SITE_DESCRIPTION = 'My name is Aetf. This is my personal blog.'

# A single paragraph before contact me buttons in landing page's contact section
CONTACT_ME_DESCRIPTION = ''

# Legal note in footer
SITE_LICENSE = """
<div xmlns:cc="http://creativecommons.org/ns#"
	 xmlns:dct="http://purl.org/dc/terms/"
	 about="http://unlimitedcodeworks.xyz/">
	<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
		<img alt="Creative Commons License" style="border-width:0"
			 src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
	</a>
	<br />
	All content by Aetf on this page is licensed under a 
	<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
	Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
	</a>.
	<br />
	The overall theme is modified and thus largely based on
	<a href="https://github.com/kdheepak89/pelican-smoothie">smoothie</a>
	by <a href="http://kdheepak.com/">Dheepak Krishnamurthy</a>.
</div>
"""

# About me section in landing page
LANDING_PAGE_ABOUT = { 'details':
"""
<p>
My name is Aetf. 
I’ve dabbled with mobile application and web development, home automation and photography. 
I’m currently working towards a Master’s degree in Computer Science.
</p>
<img src="images/coverPicture.jpg" alt="Alt text! And a picture of me!" style="width:100%">
<p></p>
<p>
The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. 
The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. 
The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. 
</p>
<p>
On this website, I intend to share interesting projects I’m currently working on
or have worked on in the past, partly also as a way of establishing an archive.
If you find anything interesting, feel absolutely free to get in touch with me.
</p>
"""}
