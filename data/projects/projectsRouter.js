const express = require('express');
const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

const { validateProject, validateProjectId, validateActions, validateActionsId } = require("../../utils/validation");

const router = express.Router();

//get list of all projects


//get project by id


//add new project
router.post('/', validateProject, (req, res) => {
    User.insert(req.body)
        .then(user => {
            res.status(200).json(req.body)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error adding a user." })
        })
});

//delete project


//update project


//add action to project
router.post('path', validateProjectId, (req, res) => {

})

//get actions by project id



module.exports = router;
