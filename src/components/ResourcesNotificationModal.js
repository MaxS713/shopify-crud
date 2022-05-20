import React from "react";
import "./modal.css";

export default function ResourcesNotificationModal(props) {

  if (props.modalState === true) {
    return (
      <main id="overlay">
        <div id="modal-background">
          <div id="modal-content">
            <p>You don't have enough resources...</p>
            <button onClick={props.handleClick}>OK</button>
          </div>
        </div>
      </main>
    );
  } else {
    return null;
  }
}
