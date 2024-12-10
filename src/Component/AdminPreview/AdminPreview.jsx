import React, { useState } from "react";
import UserTable from "./UserTable";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
// const UserData = [
//   { id: 1, name: "Chapo", email: "chapoexample@gmail.com", role: "Admin" },
//   { id: 2, name: "Opera", email: "operaexample@gmail.com", role: "User" },
//   { id: 3, name: "Emmy", email: "emmyexample@gmail.com", role: "Member" },
//   { id: 4, name: "Roddy", email: "roddyexample@gmail.com", role: "User" },
//   { id: 5, name: "Mubby", email: "mubbyexample@gmail.com", role: "Admin" },
//   { id: 6, name: "Teddy", email: "chapoexample@gmail.com", role: "User" },
// ];

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
};

const AdminPreview = () => {
  const [search, setSearch] = useState("");
  const [Admins, setAdmins] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin", {
          withCredentials: true,
        });
        const data = response.data;
        setFilteredData(data);
        setAdmins(data);
        console.log({ data });
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    console.log(term);
    

    const filtered = Admins.filter(
      (admin) =>
        admin.fullname.toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term) ||
        admin.role.toLowerCase().includes(term)
    );
    console.log({filtered});
    
    setFilteredData(filtered);
  };

  const handleDelete = async (adminId) => {
    try {
        await axios.delete(`http://localhost:5000/${adminId}`, {
        withCredentials: true,
      });
      const updatedFilteredData = filteredData.filter(
        (admin) => admin._id != adminId
      );

      setFilteredData(updatedFilteredData);
      toast.success("Admin deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete admin");
    }

    setFilteredData(updatedFilteredData);
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/${userId}`,
        { role: newRole },
        { withCredentials: true }
      );

      const updatedFilteredRole = filteredData.map((admin) =>
        admin._id === userId ? { ...admin, role: newRole } : admin
      );

      setFilteredData(updatedFilteredRole);
      toast.success("Admin updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  return (
    <>
      <div className="__prevCon">
        <h2 className="__prevHeader">Admins</h2>

        <div className="__prevSearchCon">
          <CiSearch className="__prevSearchIcon" />
          <input
            type="text"
            className="__prevSearch"
            placeholder="Search by name or email or role"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="__prevList">
          <UserTable
            data={filteredData}
            onDelete={handleDelete}
            onUpdateRole={handleUpdateRole}
          />
        </div>

        <div className="__inviteBtnCon">
          <button className="__inviteBtn">Invite Admin</button>
        </div>
      </div>
    </>
  );
};

export default AdminPreview;
