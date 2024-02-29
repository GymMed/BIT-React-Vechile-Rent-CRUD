import { STATUSES_ENUM } from "./enums/statusesManager";

function validateMinSymbols(value, min) {
    const emptyValidationResults = validateEmptyValue(value);

    if (emptyValidationResults.status !== STATUSES_ENUM.Success)
        return emptyValidationResults;

    if (value.length < min) {
        return {
            statusText: `Minimum ${min} symbols required`,
            status: STATUSES_ENUM.Error,
        };
    }
    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateMaxSymbols(value, max) {
    if (value.length > max) {
        return {
            statusText: `Maximum ${max} symbols allowed`,
            status: STATUSES_ENUM.Error,
        };
    }
    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateSymbols(value, min, max) {
    const minValidationResults = validateMinSymbols(value, min);

    if (minValidationResults.status !== STATUSES_ENUM.Success) {
        return minValidationResults;
    }

    const maxValidationResults = validateMaxSymbols(value, max);

    if (maxValidationResults.status !== STATUSES_ENUM.Success) {
        return maxValidationResults;
    }

    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateMinValue(value, min) {
    const emptyValidationResults = validateEmptyValue(value);

    if (emptyValidationResults.status !== STATUSES_ENUM.Success)
        return emptyValidationResults;

    if (value < min) {
        return {
            statusText: `Value cannot be smaller when ${min}`,
            status: STATUSES_ENUM.Error,
        };
    }
    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateMaxValue(value, max) {
    if (value > max) {
        return {
            statusText: `Value cannot be bigger when ${max}`,
            status: STATUSES_ENUM.Error,
        };
    }
    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateValue(value, min, max) {
    const minValidationResults = validateMinValue(value, min);

    if (minValidationResults.status !== STATUSES_ENUM.Success) {
        return minValidationResults;
    }

    const maxValidationResults = validateMaxValue(value, max);

    if (maxValidationResults.status !== STATUSES_ENUM.Success) {
        return maxValidationResults;
    }

    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateRegex(regex, value) {
    const emptyValidationResults = validateEmptyValue(value);

    if (emptyValidationResults.status !== STATUSES_ENUM.Success) {
        return emptyValidationResults;
    }

    if (!regex.test(value)) {
        return {
            statusText: `Provided invalid value!`,
            status: STATUSES_ENUM.Error,
        };
    }
    return { statusText: ``, status: STATUSES_ENUM.Success };
}

function validateEmptyValue(value) {
    if (!value) {
        return {
            statusText: `This field is required!`,
            status: STATUSES_ENUM.Error,
        };
    }
    return { statusText: ``, status: STATUSES_ENUM.Success };
}

export {
    validateMinSymbols,
    validateMaxSymbols,
    validateSymbols,
    validateMinValue,
    validateMaxValue,
    validateValue,
    validateRegex,
    validateEmptyValue,
};
