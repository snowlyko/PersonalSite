import React, { useState, useEffect } from "react";
import CanvasBackground from "./components/CanvasBackground";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import GlassCard from "./components/GlassCard";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  // Close modal handler
  const handleCloseModal = () => {
    setActiveModal(null);
  };

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

          {/* Render modal content based on state */}
          {activeModal === "projects" && <Projects />}
          {activeModal === "skills" && <Skills />}
          {activeModal === "contact" && <Contact />}
        </GlassCard>
      </div>
    </>
  );
}

export default App;
