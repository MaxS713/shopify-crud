import React from "react";
import "./modal.css";

export default function CreateConfirmBox(props) {
  async function handleCreate(event) {
    event.preventDefault();
    await fetch("api/add-robot", {
      headers: {"content-type": "application/json"},
      method: "POST",
      body: JSON.stringify(props.inputToCreate),
    }).then(
      (window.location.href = `/dashboard?username=${btoa(props.inputToCreate.creatorName)}`)
    );
  }
  if (props.modalState === true) {
    return (
      <div id="confirm-background">
        <div id="confirm-content">
          <h1>You're going to create this robot:</h1>
          <p>{props.inputToCreate.robotName}</p>
          <div id="buttons">
            <button onClick={handleCreate}>Confirm</button>
            <button onClick={props.handleClick}>Go Back</button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
