import React, { Component, useState, useEffect, useRef, lazy, Suspense } from "react";
import { createPortal } from "react-dom";

// Exercise 1: ErrorBoundary Class Component
class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "12px", border: "2px dashed red", borderRadius: "6px", margin: "10px 0" }}>
          <h4>Region Error</h4>
          <p>{this.props.fallbackMessage || "Something went wrong in this section."}</p>
          <button onClick={() => this.setState({ error: null })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Exercise 7: Modal via createPortal with Escape listener and focus return
function Modal({ isOpen, onClose, triggerRef, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger button when modal closes
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Stop bubbling
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "280px",
          outline: "none",
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: "12px" }}>Close (Esc)</button>
      </div>
    </div>,
    modalRoot
  );
}

// Exercise 2: Buggy Dish demonstrating caught render errors
function BuggyDish({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error("Deliberate crash: Dish rendering exploded!");
  }
  return <div style={{ border: "1px solid #ccc", padding: "8px", margin: "6px 0" }}>Normal Dish: Doro Wat (240 ETB)</div>;
}

// Exercise 4: Component for lazy simulation
const LazyPanel = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{ background: "#e8f5e9", padding: "12px", borderRadius: "6px" }}>
            ✓ Lazy Loaded Heavy Receipt Panel Loaded Successfully!
          </div>
        ),
      });
    }, 1000);
  });
});

export default function App() {
  const [crashDish, setCrashDish] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLazy, setShowLazy] = useState(false);
  const openModalBtnRef = useRef(null);

  return (
    <div style={{ maxWidth: "520px", margin: "30px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h2>Day 09 Exercises - Boundaries, Performance & Portals</h2>

      {/* Header stays intact */}
      <header style={{ borderBottom: "2px solid #333", paddingBottom: "8px", marginBottom: "16px" }}>
        <strong>Global Header: Survives local boundary crashes</strong>
      </header>

      {/* Exercise 1, 2, 3: Separate Error Boundaries */}
      <h3>Isolated Component Boundaries</h3>
      <ErrorBoundary fallbackMessage="The Menu section failed. Header and Cart remain intact!">
        <div style={{ border: "1px solid #eee", padding: "12px", marginBottom: "16px" }}>
          <h4>Menu Section</h4>
          <BuggyDish shouldCrash={crashDish} />
          <button onClick={() => setCrashDish(true)} style={{ color: "red" }}>
            Trigger Crash in Menu
          </button>
        </div>
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="The Cart section failed independently.">
        <div style={{ border: "1px solid #eee", padding: "12px", marginBottom: "16px" }}>
          <h4>Cart Section (Healthy)</h4>
          <p>Cart is operational and undisturbed.</p>
        </div>
      </ErrorBoundary>

      <hr />

      {/* Exercise 4: Lazy + Suspense */}
      <h3>Lazy Loading with Suspense Skeleton</h3>
      <button onClick={() => setShowLazy(true)} disabled={showLazy}>
        Load Heavy Receipt Component
      </button>
      {showLazy && (
        <Suspense fallback={<p style={{ color: "#777" }}>Loading chunk skeleton...</p>}>
          <LazyPanel />
        </Suspense>
      )}

      <hr />

      {/* Exercise 7: Accessible Portal Modal */}
      <h3>Portals & Accessible Dialog</h3>
      <button ref={openModalBtnRef} onClick={() => setIsModalOpen(true)}>
        Open Dish Recipe Details (Portal)
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerRef={openModalBtnRef}
      >
        <h3>Traditional Doro Wat</h3>
        <p>Slow-cooked spicy chicken simmered in berbere sauce with hard-boiled eggs.</p>
      </Modal>
    </div>
  );
}