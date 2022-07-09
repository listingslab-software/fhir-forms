export const symptomFHIR = {
    "resourceType": `WanngiForm`,
    "description": "Symptoms",     
    "meta": {
        "formType": "stepper",
        "title": `Symptoms are awesome`,
        "legacyKey": 'Observation',
        "route": `/symptoms/`,
        "icon": `symptoms`
    },
    "steps": [
        {
            "title": "Symptom",
            "description": "Track your symptoms to better understand your condition", 
            "fields": [
                {    
                    "autoFocus": true,
                    "required": true,
                    "id": "symptom",
                    "title": "Symptom",
                    "description": "Describe your symptom. What are you feeling? eg. Headache"
                },
                {
                    "id": "severity",
                    "title": "Severity",
                    "description": "Rate severity from mild to severe on a scale of 1 to 10",
                    "resultComponent": "severity"
                },
                {
                    "id": "context",
                    "title": "Context",
                    "description": "What was happening at the time? eg. Bumped head"
                }
            ]
        },
        {
            "title": "Time & Date",
            "description": "Add your Symptom to the Timeline", 
            "fields": [
                {    
                    "id": "time",
                    "description": "Specify when this happened to include it in the timeline",
                    "title": "Date and Time"
                },    
            ]
        },
        {
            "title": "Notes",
            "description": "What do you want to remember to ask your doctor?", 
            "fields": [
                {
                    "id": "notes",
                    "title": "Notes",
                    "description": "Anything to add?",
                    "multiline": true,
                    "rows": 5
                }  
            ]
        }
    ],    
    "dataShape": {
        "symptom": {
            "primitive": "String",
            "component": "FHIRString",
            "required": true,
            "minChars": 5
        },
        "severity": {
            "primitive": "Number",
            "min": 1,
            "max": 10,
            "defaultValue": 5,
            "component": "FHIRScale"
        },
        "context": {
            "primitive": "String",
            "component": "FHIRString"
        },
        "notes": {
            "primitive": "String",
            "component": "FHIRString"
        },
        "time": {
            "primitive": "Number",
            "component": "FHIRTime",
            "options": {
                "type": "unixEpoch",
                "openTo": "day",
                "showTime": true
            },
        }
    }
}
