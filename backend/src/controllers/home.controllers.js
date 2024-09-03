const Home = require("../models/Home");
const User = require("../models/User");
const UserHome = require("../models/UserHome");

// Fetch homes of a specific user
exports.getHomesByUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({
            where: { username },
            include: {
                model: Home,
                through: {
                    model: UserHome,
                    attributes: [],
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const homes = user.Homes;
        res.status(200).json({
            user: username,
            num_homes: homes.length,
            homes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Update users interested in a specific home
exports.updateUsersOfHome = async (req, res) => {
    const { street_address } = req.params;
    const { users } = req.body;

    try {
        // Delete existing records
        await UserHome.destroy({ where: { street_address } });

        // Insert new records
        for (const username of users) {
            await UserHome.create({ username, street_address });
        }

        res.json({ message: "Users updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
