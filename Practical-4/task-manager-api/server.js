const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const jsonValidator = require("./middleware/jsonValidator");
// const validateTaskId = require("./middleware/ValidateTaskid");

const app = express();

app.use(express.json());
app.use(jsonValidator);
app.use(logger);

app.use("/tasks", taskRoutes);
app.get("/error", (req, res, next) => {
    const error = new Error("Test error");
    next(error);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});