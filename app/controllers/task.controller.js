const db = require("../models");
const Group = require("../models/group.model");
const User = require("../models/user.model");
const Task = db.task;


// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Task
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        assignmentStatus: "initialized",
        progressStatus: "0%",
        // group: req.body.groupId,
        user: req.body.user
    });


    const id = req.body.groupId
    Group.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No found Group with id " + id });
            else {
                task
                    .save(task)
                    .then(taskData => {
                        data.tasks.push(taskData._id);
                        console.log(data);

                        Group.findByIdAndUpdate(id, data, { useFindAndModify: false })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({
                                        message: `Cannot update Group with id=${id}. Maybe Task was not found!`
                                    });
                                } else res.send({ message: "Group was updated successfully." });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating Group with id=" + id
                                });
                            });
                    })
            }
        })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Task.find(condition)
        .then(data => {
            data.forEach(element => {
                User.findById(element.user)
                    .then(user => {
                        data.user= "adfa";
                        console.log(user);
                    })
            });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Task with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Task with id=" + id });
        });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found!`
                });
            } else res.send({ message: "Task was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};

// Reassign a Task by the id in the request
exports.reassign = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    Task.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No found Task with id " + id });
            else {

                // Create a Task
                const task = new Task({
                    title: data.title,
                    description: data.description,
                    assignmentStatus: data.assignmentStatus,
                    progressStatus: data.progressStatus,
                    group: data.groupId,
                    user: req.body.userId
                });

                Task.findByIdAndUpdate(id, task, { useFindAndModify: false })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update Task with id=${id}. Maybe Task was not found!`
                            });
                        } else res.send({ message: "Task was updated successfully." });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Task with id=" + id
                        });
                    });

                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Task with id=" + id });
        });




};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            } else {
                res.send({
                    message: "Task was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};


