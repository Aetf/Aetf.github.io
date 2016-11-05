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
DIRECT_TEMPLATES = ['index', 'tags', 'archives', 'blog', 'search']
BLOG_URL = 'blog'
BLOG_SAVE_AS = 'blog/index.html'


AVATAR_IMG = 'assets/img/avatar.jpg'
# the header background for each page
COVER_IMG = "assets/img/cover.png"

# ==================================
# Social Links
# ==================================
SOCIAL = {
    'Github': 'http://github.com/Aetf',
    'Email': 'aetf@unlimitedcodeworks.xyz',
    'Mozillian': 'https://mozillians.org/en-US/u/Aetf/',
    'Twitter': 'https://twitter.com/AetfY',
    'Google+': 'https://plus.google.com/+余佩峰/posts',
    'LinkedIn': 'https://www.linkedin.com/in/peifengyu'
}
GOOGLE_PLUS_PROFILE_URL = 'https://plus.google.com/+余佩峰/posts'
TWITTER_USERNAME = 'AetfY'


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
	The overall theme is modified from and thus largely based on
	<a href="https://github.com/kdheepak89/pelican-smoothie">smoothie</a>
	by <a href="http://kdheepak.com/">Dheepak Krishnamurthy</a>.
</div>
"""

# About me section in landing page
LANDING_PAGE_ABOUT = { 'details':"""
<p>
Congratuations! You have made it to the Unlimited Code Works! Welcome! 
</p>
<p>
Here, I'd like to share some exciting projects I'm currently working on or have worked
on in the past, as well as all kinds of interesting ideas I have, be it silly or not ;).
This also serves as a way of maintaining an archive. Feel absolutely free to get in
touch with me if you find anything interesting!
</p>
<p>
Some words about myself now. My name is Peifeng Yu (Aetf is my nickname) and I'm
currently working towards a Master's degree in Computer Science. I’ve dabbled with
compiler and system architecture, opensource projects and japanese animes
(Yes, animes (ﾉ>ω<)ﾉ).
</p>
<img src="assets/img/me.jpg" alt="Alt text! And a picture of me! I know it's missing. I'm working on it" style="width:100%">
<p></p>
<p>
I love reading stories. Be it animes, comics or games, it is the stories in them that
fascinate me most. As for favorate game types? AVG, RPG, detective games and sometimes
music games. Basically I love all games with a great story. I even tried to figure out
the story behind
<a href='https://en.wikipedia.org/wiki/Fate/unlimited_codes'>Fate/Unlimited Code</a>,
a arcade fighting game :P.
</p>
<p>
Anyway, hope my articles could help you or at least bring you some fun. Live long and
prosper...and el psy congroo!
</p>
"""}
