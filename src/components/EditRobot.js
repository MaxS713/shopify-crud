import React, {useState} from "react";
import "./modal.css";

export default function EditModal(props) {
  const [inputToEdit, setInputToEdit] = useState(
    {_id: props.selectedRobotID},
    {modelName: props.selectedmodelName},
    {quantity: parseInt(props.selectedRobotQuantity)}
  );

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("api/edit-robot", {
      headers: {"content-type": "application/json"},
      method: "POST",
      body: JSON.stringify(inputToEdit),
    }).then((window.location.href = "/dashboard"));
  }

  function handleChangesToEdit(event) {
    setInputToEdit({
      ...inputToEdit,
      [event.target.name]: event.target.value,
    });
  }

  console.log(inputToEdit);

  if (props.modalState === true) {
    return (
      <main id="overlay">
        <div id="modal-background">
          <div id="modal-content">
            <h1>Edit A Robot</h1>
            <form>
              <p>You will edit: {props.selectedmodelName}</p>
              <p>Quantity: {props.selectedRobotQuantity}</p>
              <label>
                Change name:&nbsp;
                <input
                  type="text"
                  name="modelName"
                  onChange={handleChangesToEdit}
                  autoComplete="off"
                  placeholder={props.selectedmodelName}
                />
              </label>
              <label>
                Change Quantity:&nbsp;
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  onChange={handleChangesToEdit}
                  autoComplete="off"
                  placeholder={props.selectedRobotQuantity}
                />
              </label>
              <div id="buttons">
                <button
                  disabled={!inputToEdit.modelName || !inputToEdit.quantity}
                  onClick={handleSubmit}
                >
                  Edit
                </button>
                <button onClick={props.handleClick}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  } else {
    return null;
  }
}
