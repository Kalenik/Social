import { emailPattern, userNamePattern } from '../Constants';

export const userNameBaseValidationRules = {
	minLength: {
		value: 4,
		message: 'Your Username must be at least 4 characters long'
	},
	maxLength: {
		value: 17,
		message: 'Your Username must be a maximum 17 characters long'
	},
	pattern: {
		value: userNamePattern,
		message: `Allowed alphanumeric characters and (-, _ , .) between`
	}
};

export const emailBaseValidationRules = {
	pattern: {
		value: emailPattern,
		message: 'Wrong Email'
	}
};

export const passwordBaseValidationRules = {
	minLength: {
		value: 4,
		message: 'Your password must be at least 4 characters long'
	},
	pattern: {
		value: /\d/,
		message: 'Your password must be have at least 1 number'
	}
};

export const postTitleBaseValidationRules = {
	maxLength: {
		value: 30,
		message: 'Max length is 30'
	}
};

export const postTextBaseValidationRules = {
	maxLength: {
		value: 300,
		message: 'Max length is 300'
	}
};
