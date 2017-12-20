export function validateRequiredFields(values, fields, errors) {
  fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required field';
    }
  });
  return errors;
}
