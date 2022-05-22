import React, {useState, useEffect} from "react";
import "./modal.css";

export default function EditModal(props) {
  const [inputToEdit, setInputToEdit] = useState(
    {_id: props.selectedRobotID},
    {modelName: props.selectedModelName},
    {quantity: props.selectedRobotQuantity},
    {color: props.selectedRobotColor},
    {type: props.selectedRobotType}
  );

  useEffect(() => {
    setInputToEdit(
      {_id: props.selectedRobotID},
      {modelName: props.selectedModelName},
      {quantity: props.selectedRobotQuantity},
      {color: props.selectedRobotColor},
      {type: props.selectedRobotType}
    );
  }, [
    props.selectedRobotID,
    props.selectedModelName,
    props.selectedRobotQuantity,
    props.selectedRobotColor,
    props.selectedRobotType,
  ]);

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

  if (props.modalState === true) {
    return (
      <main id="overlay">
        <div id="modal-background">
          <div id="modal-content">
            <h1>Edit A Robot</h1>
            <form>
              <div>
                <label>
                  Change name:&nbsp;
                  <input
                    type="text"
                    name="modelName"
                    onChange={handleChangesToEdit}
                    autoComplete="off"
                    placeholder={props.selectedModelName}
                  />
                </label>
              </div>
              <div>
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
              </div>
              <label>
                Color:&nbsp;
                <select name="color" onChange={handleChangesToEdit}>
                  <option
                    defaultValue={props.selectedRobotColor}
                    selected
                    disabled
                  >
                    {props.selectedRobotColor}
                  </option>
                  <option value="Blue Enamel">Blue Enamel</option>
                  <option value="Shinny White">Shinny White</option>
                  <option value="Silver">Silver</option>
                  <option value="Mat Black">Mat Black</option>
                </select>
              </label>
              <label>
                Type:&nbsp;
                <select name="type" onChange={handleChangesToEdit}>
                  <option
                    defaultValue={props.selectedRobotType}
                    selected
                    disabled
                  >
                    {props.selectedRobotType}
                  </option>
                  <option value="American">American</option>
                  <option value="Russian">Russian</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </label>
              <div id="buttons">
                <button
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
