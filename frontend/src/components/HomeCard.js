import React from "react";

const HomeCard = ({ home, onClick }) => {
    return (
        <div className="home-card" onClick={() => onClick(home.street_address)}>
            <h3>{home.street_address}</h3>
            <p>{home.state}</p>
            <p>{home.zip}</p>
            <p>{home.sqft} sqft</p>
            <p>
                {home.beds} Beds, {home.baths} Baths
            </p>
            <p>${home.list_price}</p>
        </div>
    );
};

export default HomeCard;
