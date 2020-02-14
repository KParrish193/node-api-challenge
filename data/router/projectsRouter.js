const express = require('express');
const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

const { validateProject, validateProjectId, validateAction, validateActionId } = require("../../utils/validation");

const router = express.Router();

//projects
//get list of all projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})
//verified in postman

//display project by id
router.get('/:projectid', validateProjectId, (req, res) => {
    Projects.get(req.params.projectid)
        .then(projects => {
            res.status(200).json(projects)
        }) 
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})
//verified in postman

//add new project
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(req.body)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
});
//verified in postman

//update project
router.put('/:projectid', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.projectid)
        .then(project => {
            res.status(201).json(req.body)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})


//delete project
router.delete('/:projectid', validateProjectId, (req, res) => {
    Projects.remove(req.params.projectid)
        .then(removedProject => {
            res.status(200).json(removedProject)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error handling this request"})
        })  
})
//verified in postman

//actions
//get actions for a specific project id
router.get('/:projectid/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.projectid)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(err => {
        res.status(500).json({message: "There was an error handling this request"})
    })  
})
//verified with postman

//get action 
router.post(':projectid/actions/:actionid', validateProjectId, validateActionId, (req, res) => {
    Actions.get(req.params.actionid)
        .then(action => {
            res.status(200).json(action)
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
router.put(':projectid/actions/:actionid', validateActionId, validateAction, (req, res) => { 
    Actions.update(req.body)
    .then(action => {

    })
    .catch(err => {
        res.status(500).json({message: "There was an error handling this request"})
    })  
})

//delete action
router.delete(':projectid/actions/:actionid', validateActionId, (req, res) => { 
    Actions.remove(req.params.actionid)
    .then(removedAction => {
        res.status(200).json(removedAction)
    })
    .catch(err => {
        res.status(500).json({message: "There was an error handling this request"})
    })  
})

module.exports = router;
