export const createControl = (options, validation) => {
  return {
    ...options,
    validation,
    valid: !validation,
    value: ``,
    touched: false
  };
};
