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
    {creatorName: props.creatorName},
    {robotName: ""},
    {imageNumber: ""}
  );

  function handleChangesToCreate(event) {
    setInputToCreate({
      ...inputToCreate,
      [event.target.name]: event.target.value,
    });
  }

  if (props.modalState === true) {
    return (
      <main id="overlay">
        <div id="modal-background">
          <div id="modal-content">
            <h1>Create A Robot</h1>
            <form>
              <p>Here you can add a robot to the inventory.</p>
              <label>
                Robot name:&nbsp;
                <input
                  type="text"
                  name="robotName"
                  onChange={handleChangesToCreate}
                  autoComplete="off"
                />
              </label>
              <div id="buttons">
                <button
                  disabled={!inputToCreate.robotName || confirmBoxModalState}
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
