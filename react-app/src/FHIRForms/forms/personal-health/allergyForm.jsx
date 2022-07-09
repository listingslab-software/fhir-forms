// import moment from 'moment'

export const allergyForm = {
    title: `Allergy Form`,
    reduxKey: `Allergy`,
    description: `Manage your allergies`,
    route: `/personal-health/allergy/`,
    icon: `allergy`,
    dataShape: {
        resourceType: `Allergy`,
        timestampField: `dateIdentified`,
        patientId: `String`,
        id: 0,
        allergen: `String`,
        location: `String`,
        reactions: `String`,
        severity: 3,
        dateIdentified: `IsoDate`,
        attachmentUrls: [`String`, `String`],        
    },
    fields: [
        {
            label: `Allergen`,
            mapKey: `allergen`,
            type: `InputString`,
            autoFocus: true,
            required: true,
            helperText: `What are you allergic to?`,
            helper:  `Allergen is required`,
        },
        {
            label: `Date Identified`,
            mapKey: `dateIdentified`,
            type: `InputFullDateTime`,
            valueType: `isoDate`, 
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },
        {
            label: `Reaction`,
            mapKey: `reactions`,
            type: `InputString`,
            valueType: `array`,
            multiline: true,
            required: true,
            helper:  `Reaction is required`,
        },
        
        {
            label: `Severity`,
            mapKey: `severity`,
            type: `InputRadio`,   
            defaultValue: 3,
            valueType: `number`,  
            options: [
                {
                    label: `Mild`,
                    value: `3`,
                },
                {
                    label: `Moderate`,
                    value: `5`,
                    defaultSelected: true,
                },
                {
                    label: `Severe`,
                    value: `7`,
                },
            ],
        },

   
    ],
}