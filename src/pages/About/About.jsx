import React from "react";
import "./About.css"

const About = () => {
  return (
    <div id="maindivv">
    <div className="page">
      <h1>About Check-In Management System</h1>

      <p>
        This system helps professors and students track academic check-ins
        planned during a semester. It provides visibility into whether meetings
        are happening as expected.
      </p>

      <p>
        Professors can define check-in frequency, monitor actual interactions,
        and quickly identify students who may need additional attention.
      </p>

      <p>
        The dashboard offers filtering, sorting, and export features to simplify
        reporting and analysis.
      </p>
    </div>
    </div>
  );
};

export default About;
