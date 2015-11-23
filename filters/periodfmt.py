from datetime import date
import calendar

month_abbrs = {v: k for k,v in enumerate(calendar.month_abbr)}
month_names = {v: k for k,v in enumerate(calendar.month_name)}

def periodfmt(period, *args, **kwargs):
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

	return d.strftime(*args, **kwargs)