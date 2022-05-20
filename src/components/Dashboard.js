import React, {useState, useEffect} from "react";
import CreateNewRobotModal from "./CreateRobot";
import DeleteRobotModal from "./DeleteRobot";
import StatusModal from "./Status";
import RobotsNotificationModal from "./RobotsNotificationModal";
import PhoneNotificationModal from "./RotatePhoneNotif";
import "./Dashboard.css";

function Dashboard() {
  const [robotData, setRobotData] = useState([]);
  const [selectedRobotID, setSelectedRobotID] = useState("");
  const [selectedRobotName, setSelectedRobotName] = useState("");
  const [selectedRobotStatus, setSelectedRobotStatus] = useState("");

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
    allRobotsArray.push(robot.robotName);
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

  const [statusModalState, setStatusModalState] = useState(false);
  function handleClickStatus(event) {
    if (statusModalState === true) {
      setStatusModalState(false);
    } else {
      setSelectedRobotID(event.target.id);
      setSelectedRobotName(event.target.name);
      setSelectedRobotStatus(event.target.status);
      setStatusModalState(true);
    }
  }

  return (
    <main>
      <div id="header">
        <h1>Welcome!</h1>
      </div>
      <div id="dashboard">
        <div id="left-side">
          <div id="robot-list-header">
            <h2>Robots in Inventory:</h2>
          </div>
          <div id="robot-list">
            {robotData.map((robot) => {
              return (
                <>
                  <div className="robot-data">
                    <div className="robot-description">
                      <h1>{robot.robotName}</h1>
                      <p>
                        <span>Status: </span>
                        {robot.currentStatus}
                      </p>
                      <p className="date">
                        <span>Date Of Creation: </span>
                        {robot.currentDate}
                      </p>
                      <button
                        id={robot._id}
                        name={robot.robotName}
                        status={robot.currentStatus}
                        onClick={handleClickStatus}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <aside>
          <div id="options">
            What would you like to do?
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
        <StatusModal
          handleClick={handleClickStatus}
          modalState={statusModalState}
          selectedRobotName={selectedRobotName}
          selectedRobotID={selectedRobotID}
          selectedRobotStatus={selectedRobotStatus}
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
