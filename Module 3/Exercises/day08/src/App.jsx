import React, { useState } from "react";

// Exercise 3: Pure validation function
function validate(form) {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  }
  // TeleBirr numbers accept 09... or +2519... followed by 8 digits
  if (!/^(?:\+251|0)9\d{8}$/.test(form.phone.trim())) {
    errors.phone = "Use 09... or +2519... (TeleBirr number)";
  }
  return errors;
}

export default function App() {
  // Exercise 1: Single state object
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  // Exercise 4: Touched tracking
  const [touched, setTouched] = useState({});
  // Exercise 6: Submitting flag
  const [submitting, setSubmitting] = useState(false);
  // Exercise 7: Server error state
  const [serverError, setServerError] = useState(null);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;
  const orderTotal = 640; // Static ETB total for exercise

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  // Exercise 7: Form submit with simulated failure and first-error focus
  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    // Mark all fields touched
    setTouched({ name: true, phone: true });

    if (hasErrors) {
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      // Simulate network latency
      await new Promise((res) => setTimeout(res, 1200));

      // Simulate failure on a specific test scenario
      if (form.phone.includes("0000")) {
        throw new Error("TeleBirr service unavailable. Please retry.");
      }

      alert(`Order placed successfully for ${form.name}! Delivery to ${form.area}.`);
    } catch (err) {
      setServerError(err.message);
      // Keep every value and focus the first problematic input
      document.getElementById("phone")?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  const showNameError = touched.name && errors.name;
  const showPhoneError = touched.phone && errors.phone;

  return (
    <div style={{ maxWidth: "480px", margin: "30px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h2>Day 08 - Form Exercises</h2>

      {serverError && (
        <div role="alert" style={{ background: "#ffe3e3", color: "#c92a2a", padding: "10px", borderRadius: "4px", marginBottom: "16px" }}>
          ⚠️ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div style={{ marginBottom: "14px" }}>
          <label htmlFor="name" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Full Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showNameError}
            aria-describedby={showNameError ? "name-error" : undefined}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: showNameError ? "2px solid red" : "1px solid #ccc" }}
          />
          {showNameError && (
            <p id="name-error" role="alert" style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* TeleBirr Phone Field */}
        <div style={{ marginBottom: "14px" }}>
          <label htmlFor="phone" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            TeleBirr Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showPhoneError}
            aria-describedby={showPhoneError ? "phone-error" : undefined}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: showPhoneError ? "2px solid red" : "1px solid #ccc" }}
          />
          {showPhoneError && (
            <p id="phone-error" role="alert" style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Exercise 2: Select Area */}
        <div style={{ marginBottom: "14px" }}>
          <label htmlFor="area" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Delivery Area:
          </label>
          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>
        </div>

        {/* Notes Textarea */}
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="notes" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Delivery Notes (Optional):
          </label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        {/* Exercise 6: Button carries total and submitting state */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: submitting ? "#aaa" : "#2b8a3e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: submitting ? "not-allowed" : "pointer"
          }}
        >
          {submitting ? "Sending your order..." : `Order ${orderTotal} ETB`}
        </button>
      </form>
    </div>
  );
}