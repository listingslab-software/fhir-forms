// import moment from 'moment'
// InputTypeahead

export const medicationForm = {
	title: `Medications`,
	reduxKey: 'Medication',
	description: `Manage your prescriptions and medications`,
	route: `/personal-health/medications/`,
	icon: `medication`,

	dataShape: {
        resourceType: `Medication`,
        timestampField: `start`,
        patientId: `String`,
        id: 0,
        medication: `String`,
        start: `YYYY-MM-DDTHH:mm:ssZ`,
        dose: `String`,
        end: `YYYY-MM-DDTHH:mm:ssZ`,
        reason: `String`,
        notes: `String`,
        attachmentUrls: [`String`, `String`],  
    },
	fields: [

		{
			required: true,
			label: `Medication`,
			helperText: `What is the name of your medication?`,
			helper: `Medication is required`,
			mapKey: `medication`,
			type: `InputTypeahead`,
			autoFocus: true,
		},


		{
			label: `Dose Information`,
			required: true,
			helperText: `How much? eg. 2 tablets when needed`,
			helper: `Dose is required`,
			mapKey: `dose`,
			type: `InputString`,
		},

		{
            label: `Date Prescribed`,
            mapKey: `start`,
            type: `InputFullDateTime`,
            pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
        },


		{
			label: `Reason`,
			// helperText: `What is it for? eg. Migrane`,
			mapKey: `reason`,
			type: `InputString`,
		},

		{
			mapKey: `end`,
            type: `InputFullDateTime`,
			label: `Date Finished`,
			pickerOptions:{
                viewFormat: `MMMM DD YYYY`,
                showTime: false,
            },
		},
        {
            mapKey: `notes`,
            type: `InputString`,
            label: `Notes`,
            multiline: true,
        },
	],
}