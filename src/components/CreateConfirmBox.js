import React from "react";
import "./modal.css";

export default function CreateConfirmBox(props) {
  async function handleCreate(event) {
    event.preventDefault();
    await fetch("api/add-robot", {
      headers: {"content-type": "application/json"},
      method: "POST",
      body: JSON.stringify(props.inputToCreate),
    }).then((window.location.href = "/dashboard"));
  }
  if (props.modalState === true) {
    return (
      <div id="confirm-background">
        <div id="confirm-content">
          <h1>You're going to input this data:</h1>
          <p>Model Name: {props.inputToCreate.modelName}</p>
          <p>Quantity: {props.inputToCreate.quantity}</p>
          <p>Color: {props.inputToCreate.color}</p>
          <p>Type: {props.inputToCreate.type}</p>
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
