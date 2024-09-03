const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");

const app = express();
const PORT = process.env.PORT || 3030;

// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/home", homeRoutes);

// connect database
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected...");
        return sequelize.sync();
    })
    .then(() => {
        console.log("Models synced...");

        // connect to express server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log("Error: " + err));
