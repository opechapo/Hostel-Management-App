import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AddRoomModal from './AddRoomModal';
import EditStatusModal from './EditStatusModal';

const RoomTable = ({rooms, onAddRoom, onUpdateRoom, onDeleteRoom}) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [selectedRoom, setSelectedRoom] = useState(null);

const handleEditClick = (room) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true)
}

const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedRoom(null);
}


const handleAddRoomOpen = () => {
    setIsAddModalOpen(true);
}

const handleAddRoomClose = () => {
    setIsAddModalOpen(false)
}






  return (
    <div>
        <h2>Available Rooms</h2>
        <div className='table'>
            <table className='table_wrapper room-table'>
                <thead className='table__head'>
                    <tr className='table__row'>
                        <th className='same_class'>Room Number</th>
                        <th className='same_class'>Capacity</th>
                        <th className='same_class'>Occupancy</th>
                        <th className='same_class'>Location</th>
                        <th className='same_class'>Status</th>
                        <th className='same_class'>Actions</th>

                    </tr>
                </thead>
                <tbody className='table__body'>
                    {
                        rooms.map((room, index) => (
                            <tr key={index} className='table__row'>
                                <td className='same_class'>{room.roomNumber}</td>
                                <td className='same_class'>{room.roomCapacity}</td>
                                <td className='same_class'>{room.roomOccupancy.length}</td>
                                <td className='same_class'>{room.roomLocation}</td>
                                <td className='same_class'>{room.roomStatus}</td>
                                <td className='same_class'>

                                    <button
                                    onClick={() => handleEditClick(room)}
                                    className='_noBg'
                                    >
                                        <FaPen size={25} color='blue'/>
                                    </button>

                                    <button
                                    onClick={() => onDeleteRoom(room._id)}
                                    className='_noBg'
                                    >
                                        <RiDeleteBin6Line size={25} color='red'/>
                                    </button>

                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
        </div>
        <div className='right'>
            <button onClick={handleAddRoomOpen} className='btn-secondary'>
                Add New Room
            </button>

            {
                isAddModalOpen && (
                    <AddRoomModal onAddRoom={onAddRoom} onClose={handleAddRoomClose}/>
                )
            }

            {
                isEditModalOpen && (
                    <EditStatusModal
                    room={selectedRoom}
                    onUpdateRoom={onUpdateRoom}
                    onClose={handleEditModalClose}
                    
                    />
                )
            }

        </div>
      
    </div>
  )
}

export default RoomTable