import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const initial = {
    email: "",
    name: "",
    age: "",
    nationality: "",
    g_name: "",
    g_email: "",
    gender: "",
    roomNum: "",
};

const StudentReg = () => {
  const [formData, setFormData] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        name,
        email,
        age,
        nationality,
        g_email,
        g_name,
        gender,
        roomNum,
      } = formData;

      if (
        !email ||
        !name ||
        !age ||
        !nationality ||
        !g_name ||
        !g_email ||
        !gender ||
        !roomNum
      ) {
        toast.error("Oops! All fields are required...");
        return;
      }
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:5000/student/register-student",
        formData,
        { withCredentials: true }
      );

      console.log(response);
      console.log(response.data);
      toast.success("Student added successfully!");
      setIsLoading(true);
      navigate("/student-dash");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
        setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
       {IsLoading ? (
        <ClipLoader 
        color="#3a86ff"
        cssOverride={override}
        loading={IsLoading}
        />
       ) : (
        <div className="container form__ --100vh">
        <div className="form-container">
          <p className="title">Register a new student</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="--dir-column">
              <label htmlFor="studentName">Student Name:</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Enter name"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="input"
                name="age"
                onChange={handleInputChange}
                value={formData.age}
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                className="input"
                onChange={handleInputChange}
                value={formData.gender}
                required
              >
                <option value={"Select"}>Select</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Others"}>Others</option>
              </select>
            </div>

            <div className="--dir-column">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="name"
                className="input"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                placeholder="Nationality"
                required
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="roomNum">Room Number:</label>
              <input
                type="number"
                className="input"
                name="roomNum"
                value={formData.roomNum}
                onChange={handleInputChange}
                placeholder="Enter number"
                required
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="contactEmail">Contact Email:</label>
              <input
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="--dir-column">
              <label htmlFor="guardianName">Guardian's Name:</label>
              <input
                type="name"
                className="input"
                name="g_name"
                value={formData.g_name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="--dir-column">
              <label htmlFor="g_email">Guardian's Contact Email:</label>
              <input
                type="email"
                className="input"
                value={formData.g_email}
                onChange={handleInputChange}
                name="g_email"
                placeholder="Enter email"
                required
              />
            </div>

            <button className="--btn" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add student"}
            </button>
          </form>
        </div>
      </div>

       )}

        
    
     
    </>
  );
};

export default StudentReg