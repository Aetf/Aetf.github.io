from jinja2 import contextfilter

@contextfilter
def absurl(ctx, url, **kwargs):
	return ctx['SITEURL'] + '/' + url