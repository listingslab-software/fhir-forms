import React, { useState } from "react"
import moment from 'moment'
import clsx from 'clsx'
import {
  makeStyles,
  IconButton, 
  InputAdornment,
} from '@material-ui/core/'
import AlarmIcon from "@material-ui/icons/AddAlarm"
import { Icon } from '../../../theme'
import { 
  DateTimePicker,
  DatePicker,
} from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(2),
  },
}))

export default function InputFullDateTime(props) {

  const classes = useStyles()
  const {
    options,
    onFormChange,
  } = props

  const {
    mapKey,
    defaultValue,
    required,
    pickerOptions,
    label,
    helperText,
  } = options
  
  // let format = `YYYY-MM-DDTHH:mm:ssZ`
  let viewFormat = `YYYY`
  let showTime = false

  // console.log ('options', options)

  if (pickerOptions){
    // format = pickerOptions.format
    showTime = pickerOptions.showTime
    viewFormat = pickerOptions.viewFormat
  }

  const [selectedDate, handleDateChange] = useState(defaultValue)

  if (!showTime){
    return <div className={clsx(classes.field)}>
              <DatePicker
                  format={ `YYYY-MM-DDTHH:mm:ssZ` }
                  labelFunc={(e) => {
                    return moment(e).format(viewFormat)
                  }}
                  id={ mapKey}
                  autoOk
                  fullWidth
                  required={ required }
                  name={ mapKey}
                  label={ label }
                  value={ selectedDate }
                  allowKeyboardControl={ true }
                  helperText={ helperText }
                  variant={ `inline` }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={`end`}>
                        <IconButton>
                          <Icon icon={`alarm`} color={`primary`} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(value) => {
                    handleDateChange(value)
                  }}
                  onAccept={() => {
                    setTimeout(() => {
                      onFormChange()
                    }, 500)
                  }}
                />
              </div>
  }

  return <div className={clsx(classes.field)}>
        	<DateTimePicker
              autoOk
              fullWidth
              required={ required }
              id={ mapKey}
              name={ mapKey}
              label={ label }
              value={ selectedDate }
              allowKeyboardControl={ true }
              helperText={ helperText }
              format={ `YYYY-MM-DDTHH:mm:ssZ` }
              InputProps={{
                endAdornment: (
                  <InputAdornment position={`end`}>
                    <IconButton>
                      <AlarmIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(value) => {
                handleDateChange(value)
              }}
              onAccept={() => {
                setTimeout(() => {
                  onFormChange()
                }, 500)
              }}
            />
          </div>
}
