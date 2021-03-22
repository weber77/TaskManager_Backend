const db = require("../models");
const Group = db.group;
const Request = db.request;
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };


exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
};


//Incomplete 
exports.invitationRequest = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.userId;
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No found User with id " + id });
            else {

                request = new Request({

                    status: '',
                    admin: req.body.adminId,
                    group: req.body.groupId,
                    user: id,
                    type: "invitation"
                });

                request
                    .save(request)
                    .then(requestData => {

                        data.request.push(requestData._id);
                        console.log(data);

                        User.findByIdAndUpdate(id, data, { useFindAndModify: false })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({
                                        message: `Cannot update User with id=${id}. Maybe User was not found!`
                                    });
                                } else res.send({ message: "User was updated successfully." });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating User with id=" + id
                                });
                            });

                        res.send(data);

                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Task."
                        });
                    });




            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });



}



exports.invitationResponse = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.requestId;
    Request.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No found Request with id " + id });
            else {


                data.status = req.body.status;
                if (data.status) {
                    Group.findById(data.group)
                        .then(groupData => {
                            if (!groupData) {
                                res.status(404).send({ message: "Group might have been deleted" });
                            }
                            else {
                                groupData.members.push(data.user);
                                
                                Group.findByIdAndUpdate(groupData.id, groupData, { useFindAndModify: false })
                                    .then(data1 => {
                                        if (!data1) {
                                            res.status(404).send({
                                                message: `Cannot update Group with id=${groupData.id}. Maybe Group was not found!`
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: "Error updating Group with id=" + groupData.id
                                        });
                                    });

                                Request.findByIdAndUpdate(id, data, { useFindAndModify: false })
                                    .then(data1 => {
                                        if (!data1) {
                                            res.status(404).send({
                                                message: `Cannot update Request with id=${id}. Maybe Request was not found!`
                                            });
                                        } else res.send({ message: "Request was updated successfully." });
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: "Error updating Request with id=" + id
                                        });
                                    });
                            }
                        });
                } else {
                    Request.findByIdAndRemove(id)
                        .then(data => {
                            if (!data) {
                                res.status(404).send({
                                    message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
                                });
                            } else {
                                res.send({
                                    message: "Request was declined successfully!"
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete Request with id=" + id
                            });
                        });
                }

                Request.findByIdAndUpdate(id, data, { useFindAndModify: false })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update Request with id=${id}. Maybe Request was not found!`
                            });
                        } else res.send({ message: "Request was updated successfully." });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Request with id=" + id
                        });
                    });




            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });



}

exports.joinRequest = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.groupId;
    Group.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No found group with id " + id });
            else {

                request = new Request({

                    status: false,
                    admin: req.body.adminId,
                    group: req.body.groupId,
                    user: id,
                    type: "join"
                });

                request
                    .save(request)
                    .then(requestData => {

                        data.request.push(requestData._id);
                        console.log(data);

                        User.findByIdAndUpdate(id, data, { useFindAndModify: false })
                            .then(data => {
                                if (!data) {
                                    res.status(404).send({
                                        message: `Cannot update User with id=${id}. Maybe User was not found!`
                                    });
                                } else res.send({ message: "User was updated successfully." });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating User with id=" + id
                                });
                            });

                        res.send(data);

                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Task."
                        });
                    });




            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });



}


exports.getAllInvitation = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.userId;
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No found User with id " + id });
            else {


                var condition = id ? { id: { $regex: new RegExp(title), $options: "i" } } : {};

                Request.find(condition)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving your requests."
                        });
                    });




            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });



}

exports.getAdmins = (req, res) => {

}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
