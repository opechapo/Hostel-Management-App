import React, { useState } from 'react'

const UpdateStudentProfile = ({student, onClose, updateFilteredData}) => {
  const [formData, setFormData] = useState({
    name: student.studentName,
    age: student.age,
    nationality: student.nationality,
    g_name: student.guardianName,
    g_email: student.guardianEmail,
    idNumber: student.idNumber
  })

const handleChange= (e) => {
  const {name, value} = e.target
  console.log({name, value})

  setFormData(prev => ({...prev, [name] :value}))
  
  // console.log(e.target);
  
}

  const handleSubmit = (e) => {
    e.preventDefault();

    updateFilteredData((prev) => {
      // const otherStudents = prev.filter(
      //   (allStudent) => allStudent.id !== student.id
      // );

      const currentStudentIndex = prev.findIndex(
        (allStudent) => allStudent.id === student.id
      )

      const UpdateStudent = {
        id: student.id,
        email: student.email,
        gender: student.gender,
        idNumber: student.idNumber,
        age: formData.age,
        nationality: formData.nationality,
        guardianName: formData.g_name,
        guardianEmail: formData.g_email,
        studentName: formData.name,
      }

      const allStudents = [...prev]
      allStudents[currentStudentIndex] = UpdateStudent

      // const UpdateStudents = [UpdateStudent, ...otherStudents]

      return allStudents;
    });
    onClose();
    
  }
  return (
    <div className='modal'>
      <div className='modal-content'>
         <h2>Update Student Profile</h2>

         <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="">Age</label>
            <input type="number" name='age' value={formData.age} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="">Nationality</label>
            <input type="text" name='nationality' value={formData.nationality} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="">Guardian&apos;s Name</label>
            <input type="text"  name='g_name' value={formData.g_name} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="">Guardian&apos;s Email</label>
            <input type="email" name='g_email' value={formData.g_email} onChange={handleChange}  />
          </div>

          <button type='submit'>Update</button>
          <button type='button' onClick={onClose}>Close</button>
         </form>
      </div>

    </div>
  )
}

export default UpdateStudentProfile