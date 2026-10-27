import PropTypes from "prop-types";

function Field({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  showError,
  placeholder,
  children,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!showError}
          aria-describedby={showError ? errorId : undefined}
          className={`input-control ${showError ? "input-invalid" : ""}`}
        >
          {children}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!showError}
          aria-describedby={showError ? errorId : undefined}
          rows={3}
          className={`input-control ${showError ? "input-invalid" : ""}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!showError}
          aria-describedby={showError ? errorId : undefined}
          className={`input-control ${showError ? "input-invalid" : ""}`}
        />
      )}

      {showError && (
        <p id={errorId} role="alert" className="form-error-msg">
          <span aria-hidden="true">⚠️ </span>
          {error}
        </p>
      )}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  showError: PropTypes.bool,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

export default Field;