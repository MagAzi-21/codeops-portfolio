// Validates order bodies across Route Handlers and Server Actions
export function validateOrder(data) {
  const errors = {};

  if (!data?.name || data.name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters long"];
  }

  // TeleBirr phone validation format: 09... or +2519...
  const phoneRegex = /^(?:\+2519\d{8}|09\d{8})$/;
  if (!data?.phone || !phoneRegex.test(data?.phone?.trim() || "")) {
    errors.phone = ["Use 09... or +2519... format for TeleBirr"];
  }

  if (!data?.dishId) {
    errors.dishId = ["A valid dishId is required"];
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    success: isValid,
    errors: isValid ? null : errors,
    data: isValid
      ? {
          name: data.name.trim(),
          phone: data.phone.trim(),
          dishId: data.dishId,
        }
      : null,
  };
}