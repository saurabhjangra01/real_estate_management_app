const User = require("../models/User");
const Home = require("../models/Home");
const UserHome = require("../models/UserHome");

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ num_users: users.length, users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch users interested in a specific home
exports.getUsersByHome = async (req, res) => {
    const { street_address } = req.params;
    try {
        // Find the home and include users through the UserHome model
        const home = await Home.findOne({
            where: { street_address },
            include: {
                model: User,
                through: {
                    model: UserHome,
                    attributes: [],
                },
            },
        });

        if (!home) {
            return res.status(404).json({ error: "Home not found" });
        }

        const users = home.Users; // `home.Users` contains the list of users interested in the home
        res.status(200).json({
            home: street_address,
            num_users: users.length,
            users,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
