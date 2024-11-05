import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditRoleModel from "./EditRoleModel";

const UserTable = ({ data, onDelete, onUpdateRole }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)


      const openModal= (user) => {
        setSelectedUser(user)
        setModalOpen(true)
      }

      const closeModal = () => {
        setSelectedUser(null)
        setModalOpen(false)
      }

      const onEdit = (user) => {
        openModal(user)
      }


  return (
    <div>
      <table className="__prevTable">
        <thead>
          <tr>
            <th className="__tableHead">Name</th>
            <th className="__tableHead">Email</th>
            <th className="__tableHead">Role</th>
            <th className="__tableHead">Actions</th>
          </tr>
        </thead>
        <tbody id="__tableBody">
          {data.map((user, i) => (
            <tr>
              <td className="__tableData __tableName">{user.name}</td>
              <td className="__tableData __tableEmail">{user.email}</td>
              <td className="__tableData __tableRole">
                <p>{user.role}</p>
              </td>

              <td className="__tableData __tableAction">
                <button className="__prevEditButton"
                onClick= {() => onEdit(user)}>Edit</button>

                <button
                  className="__prevDelButtion"
                  onClick={() => onDelete(user.id)}>

                  <RiDeleteBin6Line />

                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      {modalOpen && (<EditRoleModel user= {selectedUser} onUpdateRole={onUpdateRole}
      onClose={onClose}

      />
      )}

      </div>
  )
}

export default UserTable;
