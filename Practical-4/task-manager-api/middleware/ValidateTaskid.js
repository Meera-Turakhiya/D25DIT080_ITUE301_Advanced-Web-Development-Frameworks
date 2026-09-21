const validateTaskId = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    next();
};

module.exports = validateTaskId;