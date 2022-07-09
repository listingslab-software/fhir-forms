// FHIR
import { symptomFHIR } from './fhir/symptomFHIR'

// Old Skool
import { accountForm } from './account/accountForm'
import { profileForm } from './account/profileForm'
import { medicationForm } from './personal-health/medicationForm'
import { allergyForm } from './personal-health/allergyForm'
import { diagnosticImagingForm } from './personal-health/diagnosticImagingForm'
import { appointmentForm } from './personal-health/appointmentForm'
import { hospitalVisitForm } from './personal-health/hospitalVisitForm'
import { immunisationForm } from './personal-health/immunisationForm'
import { pathologyForm } from './personal-health/pathologyForm'
import { referralForm } from './personal-health/referralForm'
import { cyclingForm } from './activities/cyclingForm'
import { runningForm } from './activities/runningForm'
import { walkingForm } from './activities/walkingForm'
import { sleepingForm } from './activities/sleepingForm'
import { weighingForm } from './activities/weighingForm'
import { waterForm } from './activities/waterForm'
import { otherActivityForm } from './activities/otherActivityForm'

export {
	medicationForm,
	symptomFHIR,
	
	allergyForm,
	diagnosticImagingForm,
	appointmentForm,
	hospitalVisitForm,
	immunisationForm,
	pathologyForm,
	referralForm,
	cyclingForm,
	otherActivityForm,
	runningForm,
	sleepingForm,
	walkingForm,
	waterForm,
	weighingForm,
	accountForm,
	profileForm,
}