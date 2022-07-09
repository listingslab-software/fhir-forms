import React from 'react'
import clsx from 'clsx'
import {
	makeStyles,
} from '@material-ui/core/'


const useStyles = makeStyles(theme => ({
	field: {
		margin: theme.spacing(2),
	},
}))

export default function InputReminder(props) {
	const classes = useStyles()
	const hideNow = true
	if (hideNow) return null
	return	<div className={clsx( classes.field )}>
	THIS IS A REMINDER
</div>
}

/*
<pre>
	{ JSON.stringify(props.options, null, 2) }
</pre>
*/