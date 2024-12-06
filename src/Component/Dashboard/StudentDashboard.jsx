import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";
import ChangeStudentRoom from "../Modal/ChangeStudentRoom";
import UpdateCheckin from "../Modal/UpdateCheckin";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
};

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/student", {
          withCredentials: true,
        });
        const data = response.data;
        console.log({ data });
        setFilteredData(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filtered = filteredData.filter(
    (student) =>
      student.name.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student.nationality.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async (studentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/student/delete/${studentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success("Student deleted successfully!");
      const updatedFilterData = filteredData.filter(
        (student) => student._id !== studentId
      );
      setFilteredData(updatedFilterData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student, try again");
    }
  };

  const handleModalOpen = (students) => {
    setSelectedStudent(students);
    setIsModalOpen(true);
    console.log(students);
    console.log(students?.room?.roomNumber);
    setCurrentRoomNumber(students?.room?.roomNumber);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedModal("");
    setSelectedStudent(null);
  };

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType);
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Student",
      message: "You really wanna delete this student? 🤔",
      buttons: [
        { label: "Delete", onClick: () => handleDelete(id) },
        { label: "Cancel", onClick: () => alert("Deletion Cancelled") },
      ],
    });
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  console.log(selectedModal);

  return (
    <div>
      {isSideBarToggled && (
        <div className="mobile-side-nav">
          <SideBar />
        </div>
      )}
      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <SideBar />
        </div>
        <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <p>Students</p>
                {isSideBarToggled ? (
                  <IoCloseOutline
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggled(false)}
                  />
                ) : (
                  <IoMenu
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggled(true)}
                  />
                )}
              </div>
              <p>Search Students</p>
              <input
                type="text"
                placeholder="Search by name, email or ID Number"
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="table">
                <table className="table_wrapper room-table">
                  <thead className="table__head">
                    <tr className="table__row">
                      <th className="same_class">Student's Name</th>
                      <th className="same_class">Email</th>
                      <th className="same_class">ID Number</th>
                      <th className="same_class">Gender</th>
                      <th className="same_class">Age</th>
                      <th className="same_class">Nationality</th>
                      <th className="same_class">Room No</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table__body">
                    {filtered.map((student, index) => (
                      <tr key={index} className="table__row">
                        <td className="same_class">{student.name}</td>
                        <td className="same_class">{student.email}</td>
                        <td className="same_class">{student._id}</td>
                        <td className="same_class">{student.gender}</td>
                        <td className="same_class">{student.age}</td>
                        <td className="same_class">{student.nationality}</td>
                        <td className="same_class">
                          {student?.room?.roomNumber}
                        </td>
                        <td className="same_class">
                          {" "}
                          <RiDeleteBin6Line
                            size={20}
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPenFancy
                            size={20}
                            color="blue"
                            onClick={() => handleModalOpen(student)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn-secondary">
                <Link to="/studentreg">Add a student</Link>
              </button>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select An Option</h2>
            <button
              className="one"
              onClick={() => handleModalSelect("UpdateStudentProfile")}
            >
              Update Student's Profile
            </button>
            <button
              className="two"
              onClick={() => handleModalSelect("ChangeStudentRoom")}
            >
              Change Student's Room
            </button>
            <button
              className="three"
              onClick={() => handleModalSelect("UpdateCheckin")}
            >
              Update Check In
            </button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
      {selectedModal === "UpdateStudentProfile" && (
        <UpdateStudentProfile
          student={selectedStudent}
          updateFilteredData={setFilteredData}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "ChangeStudentRoom" && (
        <ChangeStudentRoom
          student={selectedStudent}
          onClose={handleModalClose}
          currentRoomNumber={currentRoomNumber}
        />
      )}
      {selectedModal === "UpdateCheckin" && (
        <UpdateCheckin
          student={selectedStudent}
          onClose={handleModalClose}
          currentRoomNumber={currentRoomNumber}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
