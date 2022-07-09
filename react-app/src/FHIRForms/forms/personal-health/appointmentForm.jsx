//import moment from 'moment'

export const appointmentForm = {

    title: `Appointments`,
    reduxKey: `Encounter`,
    description: `Manage your Appointments`,
    route: `/personal-health/appointments/`,
    icon: `appointment`,
    dataShape: {
        resourceType: `Encounter`,
        timestampField: `start`,
        patientId: `String`,
        id: 0,
        start: `YYYY-MM-DDTHH:mm:ssZ`,
        location: `String`,
        practitioner: `String`,
        notes: `String`,
        attachmentUrls: [`String`, `String`],        
    },
    fields: [
        {
            label: `Date & Time`,
            id: `time`,
            mapKey: `start`,
            type: `InputFullDateTime`,
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },
        {
            label: `Practitioner`,
            id: `practitioner`,
            type: `InputString`,
            mapKey: `practitioner`,
            autoFocus: true,
            required: true,
            helper: `Practitioner is required`
        },
        {
            label: `Practice`,
            id: `practice`,
            mapKey: `location`,
            type: `InputString`,
        },

        {
            id: `notes`,
            mapKey: `notes`,
            type: `InputString`,
            label: `Notes`,
            multiline: true,
        },
        {
            id: `reminders`,
            mapKey: `reminders`,
            type: `InputReminder`,
            label: `Reminders`,
        }
    ]
}