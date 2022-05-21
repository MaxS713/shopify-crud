import React, {useState, useEffect} from "react";
import CreateNewRobotModal from "./CreateRobot";
import DeleteRobotModal from "./DeleteRobot";
import EditModal from "./EditRobot";
import RobotsNotificationModal from "./RobotsNotificationModal";
import PhoneNotificationModal from "./RotatePhoneNotif";
import "./Dashboard.css";

function Dashboard() {
  const [robotData, setRobotData] = useState([]);
  const [selectedRobotID, setSelectedRobotID] = useState("");
  const [selectedModelName, setSelectedModelName] = useState("");
  const [selectedRobotQuantity, setSelectedRobotQuantity] = useState("");
  const [currentStorageRoom, setCurrentStorageRoom] = useState("All Robots");

  let allRobotsArray = [];

  async function getRobots() {
    let allRobots = await fetch("api/get-all-robots");
    allRobots = await allRobots.json();
    setRobotData(allRobots);
  }
  useEffect(() => {
    getRobots();
  }, []);

  robotData.forEach((robot) => {
    allRobotsArray.push(robot.modelName);
  });

  const [createRobotModalState, setCreateRobotModalState] = useState(false);
  function handleClickCreateRobot() {
    if (createRobotModalState === true) {
      setCreateRobotModalState(false);
    } else {
      setCreateRobotModalState(true);
    }
  }

  const [robotsNotificationModalState, setRobotsNotificationModalState] =
    useState(false);
  const [deleteRobotModalState, setDeleteRobotModalState] = useState(false);
  function handleClickDeleteRobot() {
    if (allRobotsArray.length === 0 && robotsNotificationModalState === true) {
      setRobotsNotificationModalState(false);
    } else if (allRobotsArray.length === 0) {
      setRobotsNotificationModalState(true);
    } else if (deleteRobotModalState === true) {
      setDeleteRobotModalState(false);
    } else {
      setDeleteRobotModalState(true);
    }
  }

  const [editModalState, setEditModalState] = useState(false);
  function handleClickEdit(event) {
    if (editModalState === true) {
      setEditModalState(false);
    } else {
      setSelectedRobotID(event.target.id);
      setSelectedModelName(event.target.name);
      setSelectedRobotQuantity(event.target.value);
      setEditModalState(true);
    }
  }

  return (
    <main>
      <div id="header">
        <h1>Welcome!</h1>
      </div>
      <div id="dashboard">
        <div id="left-side">
          <div id="rooms">
            <h3>Storage Rooms</h3>
            <ul id="room-selection">
              <li
                className={`wrapper searchDiv ${
                  currentStorageRoom === "All" ? "selected" : ""
                }`}
                onClick={() => setCurrentStorageRoom("All")}
              >
                All Robots
              </li>
              <li
                className={`wrapper searchDiv ${
                  currentStorageRoom === "Chinese" ? "selected" : ""
                }`}
                onClick={() => setCurrentStorageRoom("Chinese")}
              >
                Chinese Robots
              </li>
              <li
                className={`wrapper searchDiv ${
                  currentStorageRoom === "American" ? "selected" : ""
                }`}
                onClick={() => setCurrentStorageRoom("American")}
              >
                American Robots
              </li>
              <li
                className={`wrapper searchDiv ${
                  currentStorageRoom === "Russian" ? "selected" : ""
                }`}
                onClick={() => setCurrentStorageRoom("Russian")}
              >
                Russian Robots
              </li>
            </ul>
          </div>
        </div>
        <div id="center">
          <div id="robot-list-header">
            <h2>Robots in Inventory:</h2>
          </div>
          <div id="robot-list">
            {robotData.map((robot) => {
              if (currentStorageRoom === "All") {
                return (
                  <>
                    <div className="robot-data">
                      <div className="robot-description">
                        <h1>{robot.modelName}</h1>
                        <p>
                          <span>Quantity: </span>
                          {robot.quantity}
                        </p>
                        <p>
                          <span>Color: </span>
                          {robot.color}
                        </p>
                        <p>
                          <span>Type: </span>
                          {robot.type}
                        </p>
                        <p className="date">
                          <span>Date Of Creation: </span>
                          {robot.currentDate}
                        </p>
                        <button
                          id={robot._id}
                          name={robot.modelName}
                          value={robot.quantity}
                          onClick={handleClickEdit}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </>
                );
              } else if (robot.type === currentStorageRoom) {
                return (
                  <>
                    <div className="robot-data">
                      <div className="robot-description">
                        <h1>{robot.modelName}</h1>
                        <p>
                          <span>Quantity: </span>
                          {robot.quantity}
                        </p>
                        <p>
                          <span>Color: </span>
                          {robot.color}
                        </p>
                        <p>
                          <span>Type: </span>
                          {robot.type}
                        </p>
                        <p className="date">
                          <span>Date Of Creation: </span>
                          {robot.currentDate}
                        </p>
                        <button
                          id={robot._id}
                          name={robot.modelName}
                          value={robot.quantity}
                          onClick={handleClickEdit}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <aside>
          <div id="options">
            <button onClick={handleClickCreateRobot}>
              <div className="resources-in-button">Create A New Robot</div>
            </button>
            <button onClick={handleClickDeleteRobot}>
              <div className="resources-in-button">Delete A Robot</div>
            </button>
          </div>
        </aside>
        <CreateNewRobotModal
          handleClick={handleClickCreateRobot}
          modalState={createRobotModalState}
        />
        <DeleteRobotModal
          handleClick={handleClickDeleteRobot}
          modalState={deleteRobotModalState}
          allRobots={allRobotsArray}
        />
        <EditModal
          handleClick={handleClickEdit}
          modalState={editModalState}
          selectedModelName={selectedModelName}
          selectedRobotID={selectedRobotID}
          selectedRobotQuantity={selectedRobotQuantity}
        />
        <RobotsNotificationModal
          handleClick={handleClickDeleteRobot}
          modalState={robotsNotificationModalState}
        />
        <PhoneNotificationModal />
      </div>
    </main>
  );
}

export default Dashboard;
