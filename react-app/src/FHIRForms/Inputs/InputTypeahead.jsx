import React from 'react'
import {useSelector} from 'react-redux'
import clsx from 'clsx'
import {
    makeStyles,
    TextField,
} from '@material-ui/core/'
import {
    Autocomplete,
} from '@material-ui/lab/'
import {
    updateSearchTermMedication,
    typeaheadMedicationsLookup,
} from '../../../redux/typeahead/actions'

const useStyles = makeStyles(theme => ({
    field: {
        margin: theme.spacing(2),
    },
}))

export default function InputTypeahead(props) {
    const classes = useStyles()
    const typeaheadSlice = useSelector(state => state.typeahead)

    const {
        typeaheadMedications,
    } = typeaheadSlice

    const {
        options,
        onFormChange,
    } = props
    const {
        mapKey,
        label,
        required,
        helperText,
        autoFocus,
        disabled,
        defaultValue,
    } = options


    const [debouncing, setDebouncing] = React.useState(false)
    const [reset, setReset] = React.useState(true)


    const doneDebounce = () => {
        onFormChange()
        setDebouncing(false)
        setReset(true)
        typeaheadMedicationsLookup()
    }

    const onUpdate = e => {
        setReset(true)
        updateSearchTermMedication(e.target.value)
        if (!debouncing) {
            setReset(false)
        }
        if (reset) {
            setTimeout(doneDebounce, 333)
        }
    }

    return <div className={clsx(classes.field)}>
        <Autocomplete
            id={mapKey}
            freeSolo
            options={typeaheadMedications.map((option) => option.title)}
            filterOptions={(options, state) => options}
            value={defaultValue}
            renderInput={(params) => (
                <TextField
                    {...params}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    required={required}
                    label={label}
                    helperText={helperText}
                    onChange={onUpdate}
                    onSelect={onUpdate}
                />
            )}
        />
    </div>
}