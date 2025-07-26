import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1>about this project</h1>
        <p>
        this project is a bit personal to me. my parents are immigrants from vietnam, and my father 
        came to the united states as a refugee. my relatives have lived through the vietnam war and 
        understand what it means to lose safety, stability, and a home.
        </p>
        <p>
        growing up with their stories, i saw how difficult it can be to find help in moments of crisis.  
        that’s why i created this website. i want to make these resources a bit more accessible for people, especially refugees 
        and migrants.
        </p>
        <p>
        if this tool can help even one person feel more supported, more informed, or less alone, 
        then it’s done what it was meant to do.
        </p>
        <p className="signature">– jessica nguyen</p>
      </div>
    </div>
  );
}
