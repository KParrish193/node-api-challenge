const express = require('express');
const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

const { validateProject, validateProjectId, validateAction, validateActionId } = require("../../utils/validation");

const router = express.Router();

//projects
//get list of all projects
router.get('/', (req, res) => {
    Projects.get()
        .then({

        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})

//display project by id
router.get('/:projectid', validateProjectId, (req, res) => {
    Projects.get(req.params.projectid)
        .then({
            
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})

//add new project
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(200).json(req.body)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
});

//update project
router.put('/:projectid', validateProjectId, validateProject, (req, res) => {
    Projects.update()
        .then({
            
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})

//delete project
router.delete('/:projectid', validateProjectId, (req, res) => {
    Projects.remove()
        .then({
            
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})


//actions
//get actions for a specific project id
router.get('/:projectid/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions()
    .catch(err => {
        res.status(500).json({message: "There was an error handling this request"})
    })  
})

router.get("/actions", (req, res)=> {
    Actions.get(req.body)
        .then(action => {

        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})

//add action to project
router.post(':projectid/actions', validateProjectId, validateAction,(req, res) => {
    Actions.insert(req.body)
        .then(action => {

        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})


//update action
router.put(':projectid/actions/:actionid', validateProjectId, validateActionId, validateAction, (req, res) => { 
    Actions.update(req.body)
    .then(action => {

    })
    .catch(err => {
        res.status(500).json({message: "There was an error handling this request"})
    })  
})


//delete action
router.delete(':projectid/actions/:actionid', validateProjectId, validateActionId, (req, res) => { 
    Actions.remove()
    .then(action => {

    })
    .catch(err => {
        res.status(500).json({message: "There was an error handling this request"})
    })  
})

module.exports = router;
