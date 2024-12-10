import axios from "axios";
import React, { useState } from "react";
// import StudentDashboard from '../Dashboard/StudentDashBoard';

const BASE_URL= import.meta.env.VITE_BASE_URL;


const UpdateCheckin = ({ student, onClose, currentRoomNumber }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(student);
  console.log(student);
  console.log(currentRoomNumber);

  const handleRoomChange = (e) => {
    setRoomNumber(e.target.value);
  };
  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/student/check-in-status`,
        {
          studentId: student._id,
          action,
          roomNumber: student?.room?.roomNumber,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>
        <p>
          Current Status : {student.checkedIn ? "Checked In" : "Checked Out"}
        </p>

        <p> Current Room : {currentRoomNumber || "Not assigned"}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Room Number</label>
            <input
              type="number"
              value={currentRoomNumber || roomNumber}
              onChange={handleRoomChange}
              placeholder="Enter room number"
            />
          </div>

          <div>
            <label htmlFor="">Action</label>
            <select value={action} onChange={handleActionChange}>
              <option value="&nbsp;"> Select an Action</option>
              <option value="checkIn" disabled={student.checkedIn}>
                Check In
              </option>
              <option value="checkOut" disabled={!student.checkedIn}>
                Check Out
              </option>
            </select>
          </div>

          <button type="submit">
            {isSubmitting ? "Updating..." : "Update Status"}
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckin;
