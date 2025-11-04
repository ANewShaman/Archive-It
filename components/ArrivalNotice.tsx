import React, { useEffect, useState } from "react";

export default function ArrivalNotice({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Effect to trigger the entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // Short delay for styles to apply
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle key press for continuing
  useEffect(() => {
    if (!visible || exiting) return;

    const handleKeyPress = () => {
        setExiting(true);
        setTimeout(onComplete, 500); // Match exit animation duration
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [visible, exiting, onComplete]);

  const visibilityClass = visible ? 'visible' : '';
  const exitingClass = exiting ? 'exiting' : '';

  return (
    <div id="arrival-notice" className={`${visibilityClass} ${exitingClass}`}>
      <div className="gta-location">
        &gt; LOCATION: OFFLINE ARCHIVE, SECTOR-7G
      </div>
      <div className="gta-title-container">
        <h1 className="gta-main-title">THE LAST ARCHIVE</h1>
        <p className="gta-subtitle">SECURE THE FRAGMENT</p>
      </div>
      <div className="gta-prompt">
        [PRESS ANY KEY]
      </div>
    </div>
  );
}
