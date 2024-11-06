import React, { useState } from "react";
import "./Dashboard.css";

const studentData = [
  {
    id: 1,
    studentName: "Phenobarbital",
    email: "mtolworthie0@ebay.com",
    gender: "Male",
    age: "10",
    nationality: "China",
  },
  {
    id: 2,
    studentName: "Oxygen joe",
    email: "mredolfi1@apache.org",
    gender: "Male",
    age: "25",
    nationality: "China",
  },
  {
    id: 3,
    studentName: "Alternaria alternata",
    email: "edodimead2@infoseek.co.jp",
    gender: "Male",
    age: "33",
    nationality: "China",
  },
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentData);
  const [filteredData, setFilteredData] = useState(studentData);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = students.filter(
      (students) =>
        students.name.toLowerCase().includes(term) ||
        students.email.toLowerCase().includes(term) ||
        students.nationality.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);

    const updatedFilteredData = filteredData.filter(
      (student) => student.id != studentId
    );

    setFilteredData(updatedFilteredData);
  };

  return <div></div>;
};

export default StudentDashboard;
