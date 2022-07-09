// import moment from 'moment'

export const hospitalVisitForm = {
    title: `Hospital`,
    reduxKey: 'Hospitalization',
    description: `Manage your hospital visits`,
    route: `/personal-health/hospital/`,
    icon: `hospitalVisit`,
    dataShape: {
        resourceType: `Hospitalization`,
        timestampField: `start`,
        patientId: `String`,
        id: 0,
        location: `String`,
        reason: `String`,
        notes: `String`,
        start: `YYYY-MM-DDTHH:mm:ssZ`,
        end: `YYYY-MM-DDTHH:mm:ssZ`,
        attachmentUrls: [`String`, `String`],  
    },

    fields: [
        {
            id: `hospital`,
            mapKey: `location`,
            type: `InputString`,
            label: `Hospital`,
            autoFocus: true,
            required: true,
            // helperText: `Which hospital did you go to?`,
            helper: `Hospital is required`
        },
        {
            id: `reason`,
            mapKey: `reason`,
            label: `Reason`,
            type: `InputString`,
        },

        {
            label: `Admission time`,
            id: `start`,
            mapKey: `start`,
            type: `InputFullDateTime`,
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },

        {
            label: `Discharge time`,
            id: `end`,
            mapKey: `end`,
            required: true,
            type: `InputFullDateTime`,
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },
        {
            id: `notes`,
            mapKey: `notes`,
            type: `InputString`,
            label: `Notes`,
            multiline: true,
        }
    ]
}