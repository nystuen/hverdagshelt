/**
 * Checks fields in the form and validates the input
 *
 * @method validate
 * @returns void
 */
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Nødvendig";
  }
  if (!values.lastName) {
    errors.lastName = "Nødvendig";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.phone) {
    errors.phone = "Nødvendig";
  }
  if (!values.text) {
    errors.text = "Nødvendig";
  }
  if (!values.date) {
    errors.date = "Nødvendig";
  }
  return errors;
};

export default validate;
