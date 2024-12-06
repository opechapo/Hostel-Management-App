import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangeStudentRoom = ({ student, onClose }) => {
  const [newRoomNum, setNewRoomNum] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
console.log("........................")
  const handleChange = (e) => {
    setNewRoomNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const studentId = student?._id;
      const res = await axios.put(
        "http://localhost:5000/student/change-room",
        {
          studentId: studentId,
          newRoomNum,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res?.data?.message);

      onClose();
      
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  }

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Change Student&apos;s Room</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>New Room Number</label>
              <input type="text" value={newRoomNum} onChange={handleChange} />
            </div>

            <button type="submit">
              {isSubmitting ? "Changing..." : "Change Room"}
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    );
  
};
export default ChangeStudentRoom;
