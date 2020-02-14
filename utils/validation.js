const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

  module.exports = {
      validateProject,
      validateProjectId,
      validateAction,
      validateActionId
  }


  // validate if project has required fields: name & description
      function validateProject(req, res, next) {
        if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
          res.status(400).json({errorMessage: "missing project data"})
          } else if(!req.body.name ){
            res.status(400).json({message:"project name required"})
          } else if (!req.body.description ){
            res.status(400).json({message:"project description required"})
          } else {
          next()
          }
      }

  // validate if project id exists already in database
      function validateProjectId(req, res, next) {
        Projects.get(req.params.projectid)
        .then(project => {
          !project ? res.status(404).json({message: "invalid project id"}) : 
          (
            req.project=project, 
            next()
          )
        })
        .catch(err => {
          res.status(500).json({message: "There was an error handling this request"})
        })  
      }

  // validate if action has required fields: description, notes, project id - handled with validateProjectId, 
      function validateAction(req, res, next) {
        if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
          res.status(400).json({errorMessage: "missing action data"})
          } else if(!req.body.description){
            res.status(400).json({message:"project description required"})
          } else if (!req.body.notes){
            res.status(400).json({message:"action notes required"})
          } else {
          next()
          }
      }

  // validate if actionId already exists in database
      function validateActionId(req, res, next) {
        Actions.get(req.params.actionid)
        .then(action => {
          !action ? res.status(404).json({errorMessage: "Invalid action id"}) : 
          (
            req.action=action, 
            next()
          )
        })
        .catch(err => {
          res.status(500).json({errorMessage: "There was an error handling this request"})
        })  
      }
