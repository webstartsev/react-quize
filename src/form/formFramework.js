import is from 'is_js';

export const createControl = (options, validation) => {
  return {
    ...options,
    validation,
    valid: !validation,
    value: ``,
    touched: false
  };
};

export const validateControl = (value, validation) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== `` && isValid;
  }

  if (validation.email) {
    isValid = is.email(value) && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= 6 && isValid;
  }

  return isValid;
};

export const validateForm = formControls => {
  let isFormValid = true;

  for (const control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
};
