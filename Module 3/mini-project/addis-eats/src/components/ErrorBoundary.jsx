import { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper" role="alert">
          <div className="error-boundary-card">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Temporary Kitchen Glitch</h3>
            <p className="error-message">
              {this.props.errorMessage ||
                "Something went wrong while rendering this section. Your cart items and session are completely safe."}
            </p>
            <div className="error-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <Link to="/menu" className="btn-secondary" onClick={this.handleReset}>
                Return to Menu
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

export default ErrorBoundary;
