import React, { useState, useEffect } from "react";
import CanvasBackground from "./components/CanvasBackground";
import Hero from "./components/Hero";
const Projects = React.lazy(() => import("./components/Projects"));
const Skills = React.lazy(() => import("./components/Skills"));
const Contact = React.lazy(() => import("./components/Contact"));
import GlassCard from "./components/GlassCard";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [renderedModal, setRenderedModal] = useState(null);

  // Close modal handler
  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Synchronize renderedModal with activeModal, delaying unmounting by 250ms during close to let transitions finish
  useEffect(() => {
    if (activeModal) {
      setRenderedModal(activeModal);
    } else {
      const timer = setTimeout(() => {
        setRenderedModal(null);
      }, 200); // Match the 0.2s CSS closing transition
      return () => clearTimeout(timer);
    }
  }, [activeModal]);

  // Keyboard shortcut support: close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Interactive canvas background */}
      <CanvasBackground />

      {/* Main app container */}
      <div className="app-container">
        <Hero onOpenModal={setActiveModal} />
      </div>

      {/* Floating Glassmorphic Modal Overlay */}
      <div
        className={`modal-overlay ${activeModal ? "open" : ""}`}
        onClick={handleCloseModal}
      >
        <GlassCard
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Stop propagation so clicking inside the modal doesn't close it
        >
          {/* Close button */}
          <button
            className="modal-close-btn"
            onClick={handleCloseModal}
            aria-label="Close Modal"
          >
            ✕
          </button>

          {/* Render modal content based on delayed renderedModal state using Suspense for lazy-loading */}
          <React.Suspense
            fallback={
              <div className="modal-loading">
                <div className="loading-spinner"></div>
                <span>Syncing details...</span>
              </div>
            }
          >
            {renderedModal === "projects" && <Projects />}
            {renderedModal === "skills" && <Skills />}
            {renderedModal === "contact" && <Contact />}
          </React.Suspense>
        </GlassCard>
      </div>
    </>
  );
}

export default App;
