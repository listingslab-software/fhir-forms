import React from 'react';
import clsx from 'clsx'
import moment from 'moment'
import {
    makeStyles,
    MenuItem,
    Button,
	ButtonBase,
    Typography,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    FormControl,
    Select,
    Input,
    InputLabel,
    Checkbox,
    ListItemText,
} from '@material-ui/core/'
import { 
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker,
    TimePicker,
} from "@material-ui/pickers"
import MomentUtils from '@date-io/moment'
import AlarmIcon from "@material-ui/icons/AddAlarm"
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { Icon } from '../../../theme'
import { v4 as uuidv4 } from 'uuid';

const gradient = {
	bottom: `#f3f6ff`,
	top: `#f3f6ff`,
	icon: `rgba(98,32,186, 1)`,
}

const useStyles = makeStyles(theme => ({
	field: {
		margin: theme.spacing(2),
    },
    containerDiv:{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    dialogContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "330px",

    },
	ctaBtn:{
		borderRadius: theme.spacing(3),
		textAlign: 'left',
		width: '100%',
		height: 75,
		display: 'relative',
	},
	plusIcon:{
		position: 'absolute',
		left: theme.spacing(2),
		bottom: theme.spacing(1.75),
		height: 32,
		width: 32,
	},
	icon: {
		position: 'absolute',
		left: '%50',
		top: theme.spacing(2),
		height: 50,
		width: 50,
	},
	white: {
		color: theme.palette.primary.main,
	},
	labelText: {
		position: 'absolute',
		left: theme.spacing(3),
		top: theme.spacing(2.5),
	},
	action:{
		marginBottom: -8,
	},
	  previewChip: {
      minWidth: 160,
      maxWidth: 210
    },
    reminderTextEntry: {
        width: "275px",
        marginBottom: "25px",
    },
    reminderIntervalEntry: {
        width: "125px",
        marginBottom: "25px",
        marginRight: "13px",
        marginLeft: "0px",
    },
    helperText: {
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
        marginBottom: "10px",
    },
    textSpacing: {
        marginTop: "5px"
    },
    alarm: {
        marginRight: "10px",
    },
}))

export default function InputReminders(props) {
  const { 
      reduxKey,
      onFormChange,
      onReminderChange,
      remindersObject,
    } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [reminderType, setReminderType] = React.useState('Once')
  const [activeReminder, setActiveReminder] = React.useState(false)

  //To avoid endless issues with the date time pickers, I've put everything into stateful variables here
  const [startDateTime, setStartDateTime] = React.useState(moment())
  const [startDate, setStartDate] = React.useState(moment())
  const [endDate, setEndDate] = React.useState(moment())
  const [time, setTime] = React.useState(moment())
  const [selectedDays, setSelectedDays] = React.useState([])
  const [selectedNumberValue, setSelectedNumberValue] = React.useState(2)
  const [selectedInterval, setSelectedInterval] = React.useState("Months")

  //Drop down menu definitions
  const reminderTypes = [
    {
      value: 'Once',
      label: 'Once',
    },
    {
      value: 'Daily',
      label: 'Daily',
    },
    {
      value: 'Weekly',
      label: 'Weekly',
    },
    {
      value: 'Custom',
      label: 'Custom',
    },
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const nums = []
  for (let i = 1; i <= 30; i++) {
      nums.push(i)
  }
  const intervals = ["Days", "Weeks", "Months", "Years"]
  const item_height = 48
  const item_padding_top = 8
  
  //This variable is displayed on the original PH form
  let helperText = "No reminder set."
  
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: item_height * 4.5 + item_padding_top,
        width: 250,
      },
    },
  }

  //Function to convert weeks to days and vice versa
  const weekdaySort = (input, numberToString) => {
    let output
    if (!numberToString) {
        switch (input) {
            case `Monday`:
                output = 1
                break
            case `Tuesday`:
                output = 2
                break
            case `Wednesday`:
                output = 3
                break
            case `Thursday`:
                output = 4
                break
            case `Friday`:
                output = 5
                break
            case `Saturday`:
                output = 6
                break
            case `Sunday`:
                output = 7
                break
            default:
                break
        }
        return output
    }
    else {
        switch (input) {
            case 1:
                output = `Monday`
                break
            case 2:
                output = `Tuesday`
                break
            case 3:
                output = `Wednesday`
                break
            case 4:
                output = `Thursday`
                break
            case 5:
                output = `Friday`
                break
            case 6:
                output = `Saturday`
                break
            case 7:
                output = `Sunday`
                break
            default:
                break
        }
        return output
    }
  }

  //This function formats the data into the correct shape before sending it back to formDialog.jsx
  //through onFormUpdate and onReminderChange
  const dataFormatter = (formChange) => {
    let data = {}
    const reminderId = uuidv4()
    const id = uuidv4()

    //This switch case could be reduced in size in future (some data properties are constant)
    switch (reminderType) {
        case `Once`:
            //Deep copy the start moment so the .startOf function doesn't alter it
            const start = moment(startDateTime)
            const timeCopy = moment(startDateTime)
            data = {
                StartDateTime: start.startOf('day').format(),
                EndDateTime: start.startOf('day').format(), 
                NotificationLeadTimeUnit: "Minute",
                NotificationLeadTimeValue: 0,
                NotificationNotes: "",
                RepeatingUnit: "Once",
                RepeatingValue: 0,
                ReminderTimeSlot: [
                    {
                        reminderId: reminderId,
                        id: id,
                        notificationTime: timeCopy.format().substring(11),//Notification time
                        notificationDays: [],
                    }
                ],
                reminderId: reminderId,
                type: reduxKey,
            }
            break
        case `Daily`:
            data = {
                StartDateTime: startDate.startOf('day').format(),
                EndDateTime: endDate.endOf('day').format(),
                NotificationLeadTimeUnit: "Minute",
                NotificationLeadTimeValue: 0,
                NotificationNotes: "",
                RepeatingUnit: "Daily",
                RepeatingValue: 0,
                ReminderTimeSlot: [
                    {
                        reminderId: reminderId,
                        id: id,
                        notificationTime: time.format().substring(11),
                        notificationDays: [],
                    }
                ],
                reminderId: reminderId,
                type: reduxKey,
            }
            break
        case `Weekly`:
            let notificationDays = []
            //Convert selected days of the week into numerical form 
            for (let day in selectedDays) {
                notificationDays.push(weekdaySort(selectedDays[day], false))
            }
            data = {
                StartDateTime: startDate.startOf('day').format(),
                EndDateTime: endDate.endOf('day').format(),
                NotificationLeadTimeUnit: "Minute",
                NotificationLeadTimeValue: 0,
                NotificationNotes: "",
                RepeatingUnit: "Weekly",
                RepeatingValue: 0,
                ReminderTimeSlot: [
                    {
                        reminderId: reminderId,
                        id: id,
                        notificationTime: time.format().substring(11),
                        notificationDays: notificationDays,
                    }
                ],
                reminderId: reminderId,
                type: reduxKey,
            }
            break;
        default:
            data = {
                StartDateTime: startDate.startOf('day').format(),
                EndDateTime: endDate.endOf('day').format(),
                NotificationLeadTimeUnit: "Minute",
                NotificationLeadTimeValue: 0,
                NotificationNotes: "",
                RepeatingUnit: selectedInterval,
                RepeatingValue: selectedNumberValue,
                ReminderTimeSlot: [
                    {
                        reminderId: reminderId,
                        id: id,
                        notificationTime: time.format().substring(11),
                        notificationDays: [],
                    }
                ],
                reminderId: reminderId,
                type: reduxKey,
            }
            break
    }
    onReminderChange(data)
    if (formChange) onFormChange([], [], data)
  }

  //Grab current reminder details that are passed props (if there are any) and store in state
  React.useEffect(() => {
    if (Object.keys(remindersObject).length !== 0 &&
    remindersObject.constructor === Object) {
        let reminderData = remindersObject
        setActiveReminder(true)
        setStartDate(moment(reminderData.StartDateTime))
        setEndDate(moment(reminderData.EndDateTime))
        setTime(moment().set({
            'hour': reminderData.ReminderTimeSlot[0].notificationTime.substring(0, 2), 
            'minute': reminderData.ReminderTimeSlot[0].notificationTime.substring(3, 5)
        }))
        setStartDateTime(moment(reminderData.StartDateTime).set({
            'hour': reminderData.ReminderTimeSlot[0].notificationTime.substring(0, 2), 
            'minute': reminderData.ReminderTimeSlot[0].notificationTime.substring(3, 5)
        }))
        let recurrence = reminderData.RepeatingUnit
        if (recurrence === 'Weekly') {
            let currentDays = reminderData.ReminderTimeSlot[0].notificationDays
            let arrayDays = []
            for (let day in currentDays) {
                arrayDays.push(weekdaySort(currentDays[day], true))
            }
            setSelectedDays(arrayDays)
        }
        if (recurrence !== 'Once' && recurrence !== 'Daily' && recurrence !== 'Weekly') {
            setReminderType('Custom')
            setSelectedInterval(reminderData.RepeatingUnit)
            setSelectedNumberValue(reminderData.RepeatingValue)
        }
        else {
            setReminderType(recurrence)
        }
    }
    else {
        setReminderType('Once')
    }  
    
  }, [remindersObject])

  const handleClose = () => {
    setOpen(false);
  };

  //Modifying the helper text variable from above to provide some context outside of the dialog box
  if (activeReminder) {
      if (reminderType === 'Once') {
          helperText = `Reminder set for ${time.format('h:mm a')}, ${startDate.format('D MMMM YYYY')}.`
      }
      else if (reminderType === "Daily" || reminderType === "Weekly") {
          helperText = `Reminder set for ${time.format('h:mm a')}, ${reminderType.toLowerCase()} until ${endDate.format('D MMMM YYYY')}.`
      }
      else {
          helperText = `Reminder set for ${time.format('h:mm a')} every ${selectedNumberValue} ${selectedInterval} until ${endDate.format('D MMMM YYYY')}.`
      }
  }

  //This should likely be split into different files for each reminder type in future
  return (
    <div className={classes.containerDiv}>
      <Typography className={classes.helperText}>
        <AccessAlarmIcon color="primary" className={classes.alarm}/> 
        <span className={classes.textSpacing}> {helperText} </span>
      </Typography>
      <ButtonBase 
            className={clsx(classes.ctaBtn)}
            style={{ background: 'linear-gradient(' + gradient.top + ' 0%, ' + gradient.bottom + ' 100%)' }}
            onClick={(e) => {
                e.preventDefault()
                setOpen(true)
            }}>
            <div className={clsx(classes.icon)}>
                <Icon icon={`documents`} color="primary" />
            </div>				
            <div className={ classes.labelText }>
                <Typography className={clsx(classes.white, classes.action)}>
                    { `Manage` }
                </Typography>
                <Typography className={clsx(classes.white )}>
                    {`Reminders`}
                </Typography>
            </div> 
        </ButtonBase>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reminders</DialogTitle>
            <DialogContent className={classes.dialogContainer}>
                    <TextField
                        className={classes.reminderTextEntry}
                        id="standard-select-recursion"
                        select
                        label="Reminder Recursion"
                        value={reminderType}
                        onChange={(event) => setReminderType(event.target.value)}>
                    {reminderTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>

                    {reminderType === 'Once' ? 
                        <div>
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                            <DateTimePicker
                                className={classes.reminderTextEntry}
                                autoOk
                                fullWidth
                                value={startDateTime}
                                label="Reminder date and time"
                                allowKeyboardControl={ true }
                                format={ `MMMM D YYYY, h:mm a` }
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={setStartDateTime}
                                onAccept={() => {}}/>
                        </MuiPickersUtilsProvider>
                        </div> 
                    : null}

                    {reminderType === 'Daily' ? 
                        <div>
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                        <DatePicker
                            className={classes.reminderTextEntry}
                            clearable
                            value={startDate}
                            label="Start Date"
                            onChange={date => setStartDate(date)}
                            format={`MMMM D YYYY`}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position={`end`}>
                                    <IconButton>
                                        <AlarmIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                        />

                            <TimePicker 
                                className={classes.reminderTextEntry}
                                autoOk 
                                value={time}
                                label="Daily reminder time" 
                                onChange={setTime}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }} 
                            />
                                
                            <DatePicker
                                className={classes.reminderTextEntry}
                                clearable
                                value={endDate}
                                label="Finish Date"
                                onChange={date => setEndDate(date)}
                                format={`MMMM D YYYY`}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />

                        </MuiPickersUtilsProvider>
                        </div> 
                    : null}
                    
                    {reminderType === 'Weekly' ? 
                        <div>
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                            <DatePicker
                                className={classes.reminderTextEntry}
                                clearable
                                value={startDate}
                                label="Start Date"
                                onChange={date => setStartDate(date)}
                                format={`MMMM D YYYY`}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />

                            <TimePicker 
                                className={classes.reminderTextEntry}
                                autoOk 
                                value={time}
                                label="Reminder time" 
                                onChange={setTime}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }} 
                            />

                            <FormControl className={classes.reminderTextEntry}>
                                <InputLabel >Days to be reminded</InputLabel>
                                <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    onChange={(event) => {
                                        let daysArray = event.target.value
                                        daysArray.sort((a, b) => {return weekdaySort(a, false) - weekdaySort(b, false)})
                                        setSelectedDays(daysArray)
                                    }}
                                    input={<Input />}
                                    value={selectedDays}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}>
                                {days.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={selectedDays.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <DatePicker
                                className={classes.reminderTextEntry}
                                clearable
                                value={endDate}
                                label="Finish Date"
                                onChange={date => setEndDate(date)}
                                format={`MMMM D YYYY`}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        </div> 
                    : null}

                    {reminderType === 'Custom' ? 
                        <div>
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                        <DatePicker
                                className={classes.reminderTextEntry}
                                clearable
                                value={startDate}
                                label="Start Date"
                                onChange={date => setStartDate(date)}
                                format={`MMMM D YYYY`}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />

                            <TimePicker 
                                className={classes.reminderTextEntry}
                                autoOk 
                                value={time}
                                label="Reminder time" 
                                onChange={setTime}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }} 
                            />

                            <TextField
                                className={classes.reminderIntervalEntry}
                                id="standard-select-recursion"
                                select
                                label="Number"
                                value={selectedNumberValue}
                                onChange={(event) => setSelectedNumberValue(event.target.value)}>
                            {nums.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            </TextField>

                            <TextField
                                className={classes.reminderIntervalEntry}
                                id="standard-select-recursion"
                                select
                                label="Interval"
                                value={selectedInterval}
                                onChange={(event) => setSelectedInterval(event.target.value)}>
                            {intervals.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            </TextField>

                            <DatePicker
                                className={classes.reminderTextEntry}
                                clearable
                                value={endDate}
                                label="Finish Date"
                                onChange={date => setEndDate(date)}
                                format={`MMMM D YYYY`}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position={`end`}>
                                        <IconButton>
                                            <AlarmIcon color="primary" />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        </div> 
                    : null}
                    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
              handleClose()
              onReminderChange({})
              onFormChange([], [], {}, true)
              setActiveReminder(false)
            }} 
            color="primary" disabled={!activeReminder}>
            Remove
          </Button>
          <Button onClick={() => {
              handleClose()
              dataFormatter(true)
            }} 
            color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
