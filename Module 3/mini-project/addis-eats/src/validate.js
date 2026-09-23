export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  }

  // Accepts standard Ethiopian mobile prefixes (09... or +2519...)
  const sanitizedPhone = form.phone.replace(/\s+/g, "");
  if (!/^(?:\+251|0)9\d{8}$/.test(sanitizedPhone)) {
    errors.phone = "Use 09... or +2519... (TeleBirr number)";
  }

  if (!form.area) {
    errors.area = "Please select a delivery location";
  }

  return errors;
}