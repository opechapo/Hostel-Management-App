import React, { useState, useEffect, useContext } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
};

const AdminReg = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidMessage, setFormValidMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const timesIcon = <FaTimes color="red" size={20} />;
  const checkIcon = <BsCheck2All color="green" size={20} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const password = formData.password;
    setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
    setNum(/[0-9]/.test(password));
    setSChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password));
    setPassLength(password.length >= 6);
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, password2 } = formData;

    try {
      if (!fullname || !email || !password || !password2) {
        setFormValidMessage("Oops! All fields are required");
        return;
      }

      if (password != password2) {
        setFormValidMessage("Passwords do not match");
        return;
      }

      setIsSubmitting(true);
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/admin/register",
        formData,
        { withCredentials: true }
      );

      if (response.data) {
        const adminInfo = response.data;
        setLoading(false);
        setUser(response.data);
        setFormCompleted(true);
        toast.success("Registration Successful!");
        navigate("/home-dash", { state: { user: response.data } });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error( error?.response?.data.msg)
      const message = error?.response?.data?.msg?
     `${error.response.data.msg}` : "Internal Server Error"

          setFormValidMessage(message);
          setLoading(false);


    }

};

const handlePastePassword = (e) => {
    e.preventDefault();
    toast.error("Cannot paste password");
    return false;
  }

  

  return (

    <>
    {loading ? (<ClipLoader color="#3a86ff" cssOverride={override} loading={loading}/>) : (
        <div className="container form__ --100vh">
        <div className="form-container">
          <p className="title">Create an account</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="--dir-column">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                className="input"
                name="fullname"
                value={formData.fullname}
                placeholder="Enter Your Full Name"
                onChange={handleInputChange}
                required
              />
            </div>
  
            <div className="--dir-column">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className= "input"
                value= { formData.email }
                name="email"
                placeholder="Enter Your Email"
                onChange={handleInputChange}
                required
              />
            </div>
  
            <div className="--dir-column">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="input"
                value={formData.password}
                name="password"
                placeholder="Enter Your Password"
                onPaste={handlePastePassword}
                onChange={handleInputChange}
                required
              />
            </div>
            
           
  
            <div className="--dir-column">
              <label htmlFor="password">Confirm Password:</label>
              <input
                type="password"
                className="input"
                name="password2"
                value={FormData.password2}
                placeholder="Confirm Password"
                onChange={handleInputChange}
                onPaste={handlePastePassword}
                required
              />
            </div>
  
            <div className="card">
              <ul>
                <li className="indicator">
                  <span>{switchIcon(uCase)} &nbsp; Lowercase & Uppercase</span>
                </li>
                <li className="indicator">
                  <span>{switchIcon(num)}&nbsp; Number (0 - 9)</span>
                </li>
                <li className="indicator">
                  <span>
                    {switchIcon(sChar)}&nbsp; Special Characters (!"£$^&*@~#)
                  </span>
                </li>
                <li className="indicator">
                  <span>
                    {switchIcon(passLength)} &nbsp; Minimum of 6 characters
                  </span>
                </li>
              </ul>
            </div>
            <button disabled={isSubmitting} className="--btn">
              {isSubmitting ? "Signing you up..." : "Create account"}
            </button>
          </form>

          {formValidMessage && 
            <p>{formValidMessage}</p>
          }
  
          <p className="account">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    )} 
    </>

  )
    
};

export default AdminReg;
