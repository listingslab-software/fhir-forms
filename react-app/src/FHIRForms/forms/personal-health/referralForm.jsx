// import moment from 'moment'

export const referralForm = {

    title: `Referral`,
    reduxKey: 'Referral',
    description: `Manage your referrals`,
    route: `/personal-health/referrals/`,
    icon: `referral`,
    dataShape: {
        resourceType: `Referral`,
        timestampField: `referredDate`,
        patientId: `String`,
        id: 0,
        referredDate: `YYYY-MM-DDTHH:mm:ssZ`,
        expiryDate: `YYYY-MM-DDTHH:mm:ssZ`,
        practitioner: `String`,
        practice: `String`,
        notes: `String`,
        attachmentUrls: [`String`, `String`],  
    },
    fields: [
        {
            id: `practitioner`,
            mapKey: `practitioner`,
            type: `InputString`,
            label: `Practitioner`,
            autoFocus: true,
            required: true,
            helperText: `Who is this referral for?`
        },
        {
            id: `practice`,
            mapKey: `practice`,
            type: `InputString`,
            // helperText: `Where is this referral for?`,
            label: `Practice`,
        },

        {
            label: `Date Referred`,
            id: `referredDate`,
            mapKey: `referredDate`,
            type: `InputFullDateTime`,
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },

        {
            label: `Expires`,
            id: `expiryDate`,
            mapKey: `expiryDate`,
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