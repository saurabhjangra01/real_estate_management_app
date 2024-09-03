import React, { useState } from "react";
import UserDropdown from "./components/UserDropdown";
import HomeCard from "./components/HomeCard";
import UserModal from "./components/UserModal";
import { fetchHomesByUser } from "./services/api";
import "./App.css";

function App() {
    const [selectedUser, setSelectedUser] = useState("");
    const [homes, setHomes] = useState([]);
    const [selectedHome, setSelectedHome] = useState(null);

    const handleUserSelect = (username) => {
        setSelectedUser(username);
        fetchHomesByUser(username)
            .then((response) => {
                setHomes(response.data.homes);
            })
            .catch((error) => console.error(error));
    };

    const handleHomeClick = (streetAddress) => {
        setSelectedHome(streetAddress);
    };

    const closeModal = () => {
        setSelectedHome(null);
    };

    const saveAndCloseModal = () => {
        setSelectedHome(null);
        fetchHomesByUser(selectedUser)
            .then((response) => setHomes(response.data.homes))
            .catch((error) => console.error(error));
    };

    return (
        <div className="App">
            <h1>Home Management</h1>
            <UserDropdown onSelectUser={handleUserSelect} />
            {!homes && <p>No homes preferred...</p>}
            {homes && (
                <div className="home-cards">
                    {homes.map((home) => (
                        <HomeCard
                            key={home.street_address}
                            home={home}
                            onClick={handleHomeClick}
                        />
                    ))}
                </div>
            )}
            {selectedHome && (
                <UserModal
                    streetAddress={selectedHome}
                    onClose={closeModal}
                    onSaveClose={saveAndCloseModal}
                />
            )}
        </div>
    );
}

export default App;
