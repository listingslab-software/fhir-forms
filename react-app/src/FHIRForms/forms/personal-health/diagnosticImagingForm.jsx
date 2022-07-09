// import moment from 'moment'

export const diagnosticImagingForm = {
    title: `Diagnostic Imaging`,
    reduxKey: 'DiagnosticImaging',
    description: `Manage your diagnostic imaging results`,
    route: `/personal-health/diagnostic-imaging/`,
    icon: `diagnosticImaging`,
    dataShape: {
        resourceType: `DiagnosticImaging`,
        timestampField: `observed`,
        patientId: `String`,
        id: 0,
        type: `String`,
        observed: `YYYY-MM-DDTHH:mm:ssZ`,
        notes: `String`,
        attachmentUrls: [`String`, `String`],        
    },
    fields: [
        {
            label: `Image title`,
            id: `type`,
            mapKey: `type`,
            type: `InputString`,
            helperText: `What type of imaging?`,
            autoFocus: true,
            required: true,
            helper: `Image Type required`,
        },
        {
            label: `Date`,
            id: `time`,
            mapKey: `observed`,
            required: true,
            helper: `Date required`,
            type: `InputFullDateTime`,
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },
        {
            label: `Notes`,
            id: `notes`,
            mapKey: `notes`,
            type: `InputString`,
            multiline: true,
        }
    ]
}