from datetime import date
import calendar

month_abbrs = {v: k for k,v in enumerate(calendar.month_abbr)}
month_names = {v: k for k,v in enumerate(calendar.month_name)}

def periodToDate(period):
	period = list(period)
	if len(period) >= 2:
		try:
			month = month_abbrs[period[1]]
		except KeyError:
			month = month_names[period[1]]	
		period[1] = month

	if len(period) == 3:
		d = date(period[0], period[1], period[2])
	elif len(period) == 2:
		d = date(period[0], period[1], 1)
	else:
		d = date(period[0], 1, 1)
	return d

def datestrfmt(value, year = 1, month = 1, day = 1, **kwargs):
	return strfmt(value, date=date(year, month, day))

def strfmt(value, **kwargs):
	return value.format(**kwargs);