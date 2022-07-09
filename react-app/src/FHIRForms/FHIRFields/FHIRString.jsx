import React from 'react'
import { useSelector } from 'react-redux'
import { updateFHIR } from '../../../redux/fhir/actions'
import clsx from 'clsx'
import {
	makeStyles,
	TextField,
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	field: {
		margin: theme.spacing(),
		marginBottom: theme.spacing(4),
	},
}))

export default function FHIRString(props) {
	const classes = useStyles()
	const { 
		fieldShape,
		onFormUpdate,
	} = props
	const {
		item,
	} = fieldShape
	const {
		id,
		title,
		autoFocus,
		required,
		description,
		multiline,
		rows,
	} = item

	let variant = `standard`
	// if (multiline) variant = `filled`

	const appSlice = useSelector(state => state.app)
  	const { 
    	showHelpers,
  	} = appSlice

	return	<div className={clsx( classes.field )}>
				
				<TextField 
					fullWidth
					id={ id }
					required={ required }
					autoFocus={ autoFocus }
					variant={ variant }
					label={ title }
					multiline={ multiline }
					rows={ rows }
					helperText={ showHelpers ? description : null }
					onChange={ (e) => {
						onFormUpdate(id, e.target.value)
						updateFHIR (id, e.target.value)
					}}
				/>		
			</div>
}
