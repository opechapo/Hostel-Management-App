import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Dashboard.css";
import { FaBars, FaTimes } from "react-icons/fa";
import RoomTable from "./RoomTable";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


const BASE_URL= import.meta.env.VITE_BASE_URL;


const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
};

const Rooms = () => {
  const [roomData, setRoomData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSideBarToggle, setIsSideBarToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/room/`, {
          withCredentials: true,
        });
        const data = response.data;
        console.log({ data });
        setRoomData(data);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.error("cannot fetch room");
        } else {
          toast.error("Internal server error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // useEffect(() =>{}, [])
  // ? = Optional chain operator
  useEffect(() => {
    const filteredRooms = roomData.filter((res) => {
      const roomLocaton = res.roomLocation?.toLowerCase() || "";
      const roomStatus = res.roomStatus?.toLowerCase() || "";
      const roomNumber = res?.roomNumber || "";

      return (
        roomLocaton.includes(search.toLowerCase()) ||
        roomStatus.includes(search.toLowerCase()) ||
        roomNumber.includes(search)
      );
    });

    setSearchResult(filteredRooms);
  }, [roomData, search]);

  const handleAddRoom = async (newRoomData) => {
    try {
      await axios.post(
        `${BASE_URL}/admin/room/create-room`,
        {...newRoomData, roomNum: newRoomData.roomNumber},
        {withCredentials: true}
      );
      setRoomData((prevData) => [...prevData, newRoomData]);
      toast.success("Room added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      
    }
  };





  const handleUpdateRoom = async (updatedRoomData) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/room/update-room/${updatedRoomData._id}`,
        { roomStatus: updatedRoomData.roomStatus },
        { withCredentials: true }
      );

      setRoomData((prevData) =>
        prevData.map((room) =>
          room._id === updatedRoomData._id ? updatedRoomData : room
        )
      );
      toast.success("Room status updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update room status, try again");
    }
  };

  const removeRoom = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/room/${id}`,
        { withCredentials: true },
        // {roomStatus:updatedRoomData.roomStatus}
      );
      toast.success("Room deleted successfully!");
      
      setRoomData((prevData) => prevData.filter((room) => room._id !== id));

    } catch (error) {
      console.error("Failed to delete room",error);
      toast.error("Failed to delete room, try again");
    }
  };

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "delete this room",
      message: "Are you sure you want to delete this room",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeRoom(_id),
        },
        {
          label: "cancel",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  return (
    <div>
      <div>
        {isSideBarToggle && (
          <div className="mobile-side-nav">
            <SideBar />
          </div>
        )}
      </div>
      <div className="--flex-justify-between">
        <div className="desktop-side-nav">
          <SideBar />
        </div>

        <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <h1>Hostel Room Listing</h1>

                {isSideBarToggle ? (
                  <FaTimes
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggle(false)}
                  />
                ) : (
                  <FaBars
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggle(true)}
                  />
                )}
              </div>
              <input
                placeholder="Search by room number,status, or location"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
              />
              <RoomTable
                rooms={searchResult}
                onAddRoom={handleAddRoom}
                onUpdateRoom={handleUpdateRoom}
                onDeleteRoom={confirmDelete}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
