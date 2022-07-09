// import moment from 'moment'




export const symptomForm = {

    title: `Symptoms`,
    reduxKey: 'Observation',
    description: `Manage your symptoms`,
    route: `/personal-health/symptoms/`,
    icon: `symptoms`,
    dataShape: {
        resourceType: `Observation`,
        timestampField: `issued`,
        patientId: `String`,
        id: 0,
        abatement: `YYYY-MM-DDTHH:mm:ssZ`,
        effective: `YYYY-MM-DDTHH:mm:ssZ`,
        value: `String`,
        severity: `number`,
        pain: `number`,
        context: `String`,
        notes: `String`,
        attachmentUrls: [`String`, `String`],
    },

    fields: [
        {
            mapKey: `value`,
            type: `InputString`,
            label: `Symptom`,
            autoFocus: true,
            required: true,
            helperText: `What are you feeling? eg. Headache`,
            helper: `Symptom is required`,
        },
        {
            mapKey: `context`,
            type: `InputString`,
            helperText: `What was happening at the time? eg. Bumped head`,
            label: `Context`,
        },

        {
            label: `abatement`,
            id: `abatement`,
            mapKey: `abatement`,
            valueType: `isoDate`, 
            type: `InputFullDateTime`,
            helperText: `wtf is abatement supposed to be?`,
            pickerOptions:{
                format: `YYYY-MM-DDTHH:mm:ssZ`,
                showTime: true,
            },
        },

        {
            label: `effective`,
            id: `effective`,
            mapKey: `effective`,
            valueType: `isoDate`,
            type: `InputFullDateTime`,
            // helperText: `When did symptoms start?`,
            pickerOptions:{
                format: `YYYY-MM-DDTHH:mm:ssZ`,
                showTime: true,
            },
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
        {
            mapKey: `notes`,
            type: `InputString`,
            label: `Notes`,
            multiline: true,
        },
    ]
}