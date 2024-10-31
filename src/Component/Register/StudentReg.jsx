import React from 'react'

const StudentReg = () => {
  return (
    <div className='container form__ --100vh'>
    <p className='title'>Register a new student</p>
    <form className='form form-container'>
        <div className="--dir-column left">
            <label htmlFor="studentName">Student Name:</label>
            <input type="text" className='input' name='studentName' placeholder='Enter name' required />
        </div>
        
        <div className="--dir-column left">
            <label htmlFor="age">Age:</label>
            <input type="number" className='input' name='age' placeholder='Enter Your Email' required />
        </div>

        <div className="--dir-column left">
            <label htmlFor="roomNumber">Room Number:</label>
            <input type="number" className='input' name='roomNumber' placeholder='Enter number' required />
        </div>
        
        <div className="--dir-column left">
            <label htmlFor="contactEmail">Contact Email:</label>
            <input type="email" className='input' name='contactEmail' placeholder='Enter email' required />
        </div>
        <div className="--dir-column left">
            <label htmlFor="guardianName">Guardian's Name:</label>
            <input type="email" className='input' name='guardianName' placeholder='Enter name' required />
        </div>
        <div className="--dir-column left">
            <label htmlFor="contactEmail">Guardian's Contact Email:</label>
            <input type="email" className='input' name='contactConfirmPassword' placeholder='Enter email' required />
        </div>

        {/* <div className="card">
            <ul>
                <li className="indicator"><span>&nbsp; Lowercase & Uppercase</span></li>
                <li className="indicator"><span>&nbsp; Number (0 - 9)</span></li>
                <li className="indicator"><span>&nbsp; Special Characters (!"£$^&*@~#)</span></li>
                <li className="indicator"><span>&nbsp; Minimum of 6 characters</span></li>
            </ul>
        </div> */}
        <button className='--btn'>Register</button>
    </form>
    {/* <p>Already have an account?  */}
      {/* <Link to='/login'>Login</Link> */}
       {/* </p> */}
</div>
  )
}

export default StudentReg