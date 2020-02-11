import { messageBaseValidationRules } from './BaseValidationRules';

export default {
	message: {
		...messageBaseValidationRules,
		required: "Can't send empty message"
	}
};
