import React from 'react'
import { useSelector } from 'react-redux'
import { updateFHIR } from '../../../redux/fhir/actions'
import clsx from 'clsx'
import {
	makeStyles,
	Typography,
	Slider,
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	field: {
		margin: theme.spacing(),
		marginBottom: theme.spacing(3),
		position: 'relative',
	},
	title:{
		marginBottom: theme.spacing(5),
	},
	severityIndicator:{
		position: 'absolute',
		top: 0,
		right: 0,
		width: 100,
		textAlign: 'center',
		borderRadius: theme.spacing(),
		padding: theme.spacing(),
		marginTop: theme.spacing(),

	},
	red: {
		background: '#F59395',
	},
	yellow: {
		background: '#FAC232',
	},
	green: {
		background: '#85CCD4',
	},
	whiteTxt: {
		color: '#FFF',
	},
}))

export default function FHIRScale(props) {

	const classes = useStyles()
	const { 
		fieldShape,
		onFormUpdate,
	} = props
	const {
		item,
		min,
		max,
	} = fieldShape
	const {
		id,
		title,
		description,
		resultComponent,
	} = item

	const fhirSlice = useSelector(state => state.fhir)
  	const { 
    	selectedFHIR,
  	} = fhirSlice
  	// const lint = false
  	
  	const appSlice = useSelector(state => state.app)
  	const { 
    	showHelpers,
  	} = appSlice

	const getResultComponent = value => {
		let txtColor = null

		let component = null
		switch (resultComponent) {
		    case `severity`:
		    	// console.log ('sliderValue.', value)
		    	let severityValue = 0
		    	if (selectedFHIR){
		    		severityValue = selectedFHIR.severity
		    	}
		    	
		    	let colorClass = classes.yellow
		    	let title = `Moderate`

		    	if (severityValue > 0 && severityValue < 4 ){
		    		colorClass = classes.green
		    		title = `Mild`
		    		txtColor = classes.whiteTxt
		    	}
		    	if (severityValue >= 4 && severityValue <= 6) {
		    		colorClass = classes.yellow
		    		title = `Moderate`
		    		txtColor = null
		    	}
		    	if (severityValue > 6){
		    		colorClass = classes.red
		    		title = `Severe`
		    		txtColor = classes.whiteTxt
		    	}
		        component = <div className={clsx( colorClass, classes.severityIndicator, txtColor )}>
		        				{title}
		        			</div>
		        break
		    default: {
		      component = null
		    }
		  }
		return component
	}

	return	<div className={clsx( classes.field )}>
				
				<Typography gutterBottom 
					id={`${id}_label`} 
					className={clsx( classes.title )}
					variant={`body1`} 
					color={`textSecondary`}>
			    	{ title }
			    </Typography>

				<Slider
					id={id}
					marks
					aria-labelledby={`${id}_label`}
					valueLabelDisplay={`on`}
					defaultValue={ max/2 }
					min={ min }
					max={ max }
					onChange={ (e, value) => {
						updateFHIR ( id, value )
						onFormUpdate ( id, value )
					}}
				/>

				{ showHelpers ? <Typography 
                	gutterBottom
                	variant={`body2`}
                	color={`textSecondary`}>
			    	{ description }
			    </Typography> : null }

			    { getResultComponent() }
                
			</div>
}

/*


                <pre>
                  { 
                  	
                  		JSON.stringify(props, null, 2) 
                  	
                  }
                </pre>

*/
