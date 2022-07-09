// import moment from 'moment'

export const pathologyForm = {

    title: `Pathology`,
    reduxKey: 'Pathology',
    description: `Manage your pathology results`,
    route: `/personal-health/pathology/`,
    icon: `pathology`,
    dataShape: {
        resourceType: `Pathology`,
        timestampField: `observed`,
        patientId: `String`,
        id: 0,
        title: `String`,
        notes: `String`,
        observed: `YYYY-MM-DDTHH:mm:ssZ`,
        attachmentUrls: [`String`, `String`],  
    },
    fields: [
        {
            id: `title`,
            mapKey: `title`,
            type: `InputString`,
            label: `Title`,
            autoFocus: true,
            required: true,
            helper: `Title is required`,
        },


        {
            label: `Date`,
            id: `observed`,
            mapKey: `observed`,
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
        },
    ]
}