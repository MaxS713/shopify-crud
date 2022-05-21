import React, {useState} from "react";
import CreateConfirmBox from "./CreateConfirmBox";
import "./modal.css";

export default function CreateNewRobotModal(props) {
  const [confirmBoxModalState, setConfirmBoxModalState] = useState(false);
  function handleClickConfirmBox(event) {
    if (confirmBoxModalState === true) {
      setConfirmBoxModalState(false);
    } else {
      setConfirmBoxModalState(true);
    }
  }

  const [inputToCreate, setInputToCreate] = useState(
    {modelName: ""},
    {quantity: ""},
    {color: ""},
    {type: ""}
  );

  function handleChangesToCreate(event) {
    setInputToCreate({
      ...inputToCreate,
      [event.target.name]: event.target.value,
    });
  }

  console.log(inputToCreate);

  if (props.modalState === true) {
    return (
      <main id="overlay">
        <div id="modal-background">
          <div id="modal-content">
            <h1>Create A Robot</h1>
            <form id="create-robot-form">
              <p>Here you can add a robot to the inventory.</p>
              <label>
                Model name:&nbsp;
                <input
                  type="text"
                  name="modelName"
                  onChange={handleChangesToCreate}
                  autoComplete="off"
                />
              </label>
              <label>
                Quantity:&nbsp;
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  onChange={handleChangesToCreate}
                  autoComplete="off"
                />
              </label>
              <label>
                Color:&nbsp;
                <select name="color" onChange={handleChangesToCreate}>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="Blue Enamel">Blue Enamel</option>
                  <option value="Shinny White">Shinny White</option>
                  <option value="Silver">Silver</option>
                  <option value="Mat Black">Mat Black</option>
                </select>
              </label>
              <label>
                Type:&nbsp;
                <select name="type" onChange={handleChangesToCreate}>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="American">American</option>
                  <option value="Russian">Russian</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </label>
              <div id="buttons">
                <button
                  disabled={
                    !inputToCreate.modelName ||
                    !inputToCreate.quantity ||
                    !inputToCreate.color ||
                    !inputToCreate.type ||
                    confirmBoxModalState
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    handleClickConfirmBox();
                  }}
                >
                  Create
                </button>
                <button
                  disabled={confirmBoxModalState}
                  onClick={props.handleClick}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <CreateConfirmBox
          handleClick={handleClickConfirmBox}
          modalState={confirmBoxModalState}
          inputToCreate={inputToCreate}
        />
      </main>
    );
  } else {
    return null;
  }
}
