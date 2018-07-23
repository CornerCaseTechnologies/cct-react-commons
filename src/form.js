export function validateRequiredFields(values, fields, errors) {
    fields.forEach((field) => {
        if (!values[field]) {
            errors[field] = `msg_error_${field}_required`;
        }
    });
    return errors;
}
