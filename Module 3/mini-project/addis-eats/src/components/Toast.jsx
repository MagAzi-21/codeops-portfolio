import { useEffect } from "react";
import PropTypes from "prop-types";

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-card">
        <div className="toast-icon">✨</div>
        <div className="toast-body">
          <p className="toast-title">Cart Updated</p>
          <p className="toast-message">{toast.message}</p>
        </div>
        <button
          type="button"
          className="toast-close"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.number,
    message: PropTypes.string,
    type: PropTypes.string,
  }),
  onDismiss: PropTypes.func.isRequired,
};

export default Toast;
