import React from 'react';
import './Footer.css'; // External CSS for styling

const Footer: React.FC = () => {
  return (
    <footer className="primer-footer">
      <div className="primer-footer-content">
        <div className="primer-footer-section">
          <h4>PRIMER</h4>
          <p>Smart Group Project Collaborator</p>
          <p>Version 1.0 • April 2025</p>
          <p>Crafted to redefine how teams plan, discuss, and deliver group projects—smarter, faster, and together.</p>
        </div>

        <div className="primer-footer-section">
          <h4>What We Do</h4>
          <p>PRIMER brings your team together on a single platform for streamlined communication, intelligent planning, and smooth project execution.</p>
          <p>Whether you're a student group, remote team, or agile unit—PRIMER adapts to your workflow, keeping everyone in sync and on track.</p>
        </div>

        <div className="primer-footer-section">
          <h4>AI, Reimagined for Collaboration</h4>
          <p>Our AI doesn't assign tasks—it empowers you with insights. Ask anything project-related and get intelligent, contextual answers on the spot.</p>
          <p>From progress tracking to meeting recaps, PRIMER is your co-pilot for clearer decisions and less friction.</p>
        </div>
      </div>

      <div className="primer-footer-bottom">
        <p>&copy; 2025 PRIMER. All rights reserved.</p>
        <p>Made with care, built for collaboration. Empowering teams to thrive—one project at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
