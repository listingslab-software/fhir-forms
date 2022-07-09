// import moment from 'moment'

export const immunisationForm = {
    title: `Vaccine`,
    reduxKey: 'Immunization',
    description: `Manage your immunisations and vaccines`,
    route: `/personal-health/immunisations/`,
    icon: `immunisation`,
    dataShape: {
        resourceType: `Immunization`,
        timestampField: `occurred`,
        patientId: `String`,
        id: 0,
        vaccine: `String`,
        occurred: `YYYY-MM-DDTHH:mm:ssZ`,
        protectsAgainst: `String`,
        notes: `String`,
        attachmentUrls: [`String`, `String`],  
    },
    fields: [
        {
            id: `vaccine`,
            mapKey: `vaccine`,
            type: `InputString`,
            label: `Vaccine`,
            autoFocus: true,
            required: true,
            helper: `Vaccine is required`
        },
        {
            id: `protectsAgainst`,
            mapKey: `protectsAgainst`,
            type: `InputString`,
            label: `Protection Against`,
        },

        {
            label: `Date`,
            id: `occurred`,
            mapKey: `occurred`,
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