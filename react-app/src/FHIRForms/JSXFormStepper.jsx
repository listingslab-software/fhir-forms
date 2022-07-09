import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from '@material-ui/core/'
import {
  FHIRString,
  FHIRTime,
  FHIRScale,
} from './'
import { Icon } from '../../theme'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    background: 'white',
    borderRadius: theme.spacing(3),
  },
  helper: {
    marginTop: theme.spacing(3),
  },
  padTop:{
    marginTop: theme.spacing(3),
  },
  wanngiBtn:{
    borderRadius: theme.spacing(3),
  },
  submitBtn:{
    margin: theme.spacing(3),
  },
  btnTxt: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))

export default function JSXFormStepper(props) {
 
  const classes = useStyles()
  const { 
    activeStep,
    onFormUpdate,
    onFormSave,
    form,
  } = props
  const { 
    dataShape,
    steps,
  } = form
  const appSlice = useSelector(state => state.app)
  const { 
    showHelpers,
  } = appSlice
  const symptomsSlice = useSelector(state => state.symptoms)
  const { 
    valid,
  } = symptomsSlice
  if (!steps) return null

  const getFieldShape = (dataShape, id) => {
    return dataShape[id]
  }

  return <div className={clsx( classes.main )}>

            <Stepper 
              activeStep={ activeStep } 
              orientation={ `vertical` }
              color={ `secondary` }
            >
              
              { steps.map((item, i) => {                
                const { 
                  title,
                  description,
                  fields,
                } = item

                return  <Step key={`step_${i}`}>

                            { showHelpers ? null : null }

                            <StepLabel>
                              <Typography variant={`body1`}>
                                { title }
                              </Typography>
                            </StepLabel>
                            

                            <StepContent>
                              { showHelpers ? <Typography 
                                className={clsx( classes.helper )}
                                variant={`body2`} 
                                color={`textSecondary`}>
                                { description }
                              </Typography> : null }

                              { fields.length ? <React.Fragment>

                                { fields.map( (item, i) => {
                                  const { id } = item
                                  const fieldShape = getFieldShape(dataShape, id)
                                  let field = null
                                  const { component } = fieldShape
                                  switch (component) {

                                    case `FHIRString`:
                                        field = <FHIRString 
                                        onFormUpdate={ onFormUpdate }
                                        fieldShape={{
                                          ...fieldShape,
                                          item,
                                        }} />
                                        break

                                    case `FHIRTime`:
                                        field = <FHIRTime
                                        onFormUpdate={ onFormUpdate }
                                        fieldShape={{
                                          ...fieldShape,
                                          item,
                                        }} />
                                        break

                                    case `FHIRScale`:
                                        field = <FHIRScale 
                                        onFormUpdate={ onFormUpdate }
                                        fieldShape={{
                                          ...fieldShape,
                                          item,
                                        }} />
                                        break
                                    
                                    default: {
                                      field = `Nothing to see here ${component}` 
                                    }
                                  }
                                  return  <div key={`field_${i}`}>
                                            { field }
                                          </div>
                                })}
                              </React.Fragment> : null }
                              
                              { valid ? <Button
                                          fullWidth
                                          size={ `small` }
                                          className={ clsx(classes.wanngiBtn, classes.padTop) }
                                          variant={`contained`}
                                          color={`primary`}
                                          onClick={(e) => {
                                            e.preventDefault()
                                            onFormSave()
                                          }}>
                                        <Icon icon={`save`} color={`inherit`} />
                                          <span className={classes.btnTxt}>
                                            Save
                                          </span>
                                      </Button> : null }
                              
                            </StepContent>
                          </Step>
              })}
            </Stepper>
          </div>
}

/*
*/