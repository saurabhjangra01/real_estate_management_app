import React, { useEffect, useState } from "react";
import { fetchUsers, fetchUsersByHome, updateUserHome } from "../services/api";

const UserModal = ({ streetAddress, onClose, onSaveClose }) => {
    const [users, setUsers] = useState([]);
    const [interestedUsers, setInterestedUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((response) => setUsers(response.data.users))
            .catch((error) => console.error(error));
        fetchUsersByHome(streetAddress)
            .then((response) =>
                setInterestedUsers(
                    response.data.users.map((user) => user.username)
                )
            )
            .catch((error) => console.error(error));
    }, [streetAddress]);

    const handleCheckboxChange = (username) => {
        if (interestedUsers.includes(username)) {
            setInterestedUsers(
                interestedUsers.filter((user) => user !== username)
            );
        } else {
            setInterestedUsers([...interestedUsers, username]);
        }
    };

    const handleSave = () => {
        updateUserHome(streetAddress, interestedUsers)
            .then(() => {
                console.log("Users updated successfully!");
                onSaveClose();
            })
            .catch((error) => console.error("Error updating users:", error));
    };

    return (
        <div className="modal-outer">
            <div className="modal">
                <h2>Interested Users for {streetAddress}</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.username}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={interestedUsers.includes(
                                        user.username
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange(user.username)
                                    }
                                />
                                {user.username}
                            </label>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
                <button style={{ marginLeft: "20px" }} onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default UserModal;
