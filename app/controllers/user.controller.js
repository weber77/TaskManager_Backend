exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};


//Incomplete 
exports.addRequest = (req, res) =>{
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



}
