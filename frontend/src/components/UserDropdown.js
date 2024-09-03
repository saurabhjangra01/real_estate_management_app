import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";

const UserDropdown = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <select onChange={(e) => onSelectUser(e.target.value)}>
            <option value="">Select a user</option>
            {users &&
                users.map((user) => (
                    <option key={user.username} value={user.username}>
                        {user.username}
                    </option>
                ))}
        </select>
    );
};

export default UserDropdown;
