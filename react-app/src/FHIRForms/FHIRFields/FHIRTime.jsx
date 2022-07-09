import React, { useState } from "react"
import { updateFHIR } from '../../../redux/fhir/actions'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import {
  DatePicker,
  TimePicker,
  // DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import {
  Grid,
} from '@material-ui/core/'

export default function FHIRTime(props) {
  // https://material-ui-pickers.dev/demo/datepicker
  const { 
    fieldShape,
    onFormUpdate,
  } = props
  const {
    item,
  } = fieldShape
  const {
    id,
  } = item
  const [selectedDate, handleDateChange] = useState(new Date())

  return <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <DatePicker
                autoOk
                orientation={`portrait`}
                // openTo="date"
                value={selectedDate}
                onChange={ (newDate) => {
                  handleDateChange(newDate)  
                  updateFHIR ( id, moment(newDate).unix() )
                  onFormUpdate ( id, moment(newDate).unix() )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TimePicker
                autoOk
                orientation={`portrait`}
                value={selectedDate}
                onChange={ (newDate) => {
                  handleDateChange(newDate)
                  updateFHIR ( id, moment(newDate).unix() )
                  onFormUpdate ( id, moment(newDate).unix() )
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
}

