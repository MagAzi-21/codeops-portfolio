import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error in subtree:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="boundary-fallback">
          <h3>Section Temporarily Unavailable</h3>
          <p>{this.props.errorMessage || "An unexpected error occurred while rendering this section."}</p>
          <button className="submit-btn" onClick={this.handleReset}>
            Retry Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  errorMessage: PropTypes.string,
};

export default ErrorBoundary;