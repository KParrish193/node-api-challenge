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
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
})
//verified with postman

//display project by id
router.get('/:projectid', validateProjectId, (req, res) => {
    Projects.get(req.params.projectid)
        .then(projects => {
            res.status(200).json(projects)
        }) 
        .catch(err => {
            res.status(500).json({errorMessage: "There was an error handlwithg this request"})
        })  
})
//verified with postman

//add new project
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(req.body)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
});
//verified with postman

//update project
router.put('/:projectid', validateProjectId, (req, res) => {
    Projects.update(req.params.projectid, req.body)
        .then(updates => {
            res.status(200).json({
            message: `Updated project information`,
            updatedProject: {...req.body, id: parseInt(req.params.projectid)}   
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
})
//verified with postman


//delete project
router.delete('/:projectid', validateProjectId, (req, res) => {
    Projects.remove(req.params.projectid)
        .then(removedProject => {
            res.status(200).json({message: `Removed project id: ${req.params.projectid}`})
        })
        .catch(err => {
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
})
//verified with postman

//actions
//get actions for a specific project id
router.get('/:projectid/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.projectid)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "There was an error handling this request"})
    })  
})
//verified with postman

//get single action 
router.get('/:projectid/actions/:actionid', validateProjectId, validateActionId, (req, res) => {
    Actions.get(req.params.actionid)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
})
//verified with postman

//add action to project
router.post('/:projectid/actions', validateProjectId, validateAction, (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.projectid };

    Actions.insert(actionInfo)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })
})
//verfied with postman

//update action
router.put('/:projectid/actions/:actionid', validateActionId, (req, res) => { 
    Actions.update(req.params.actionid, req.body)
        .then(updates => {
            res.status(200).json({
            message: `Updated action description`,
            updatedProject: {...req.body, id: parseInt(req.params.actionid)}   
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
})
//verfied with postman

//delete action
router.delete('/:projectid/actions/:actionid', validateActionId, (req, res) => { 
    
    Actions.remove(req.params.actionid)
        .then(removedAction => {
            res.status(200).json({message: `Removed action id: ${req.params.actionid}`})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
})
//verified with postman

module.exports = router;
