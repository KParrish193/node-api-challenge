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
        !req.body.name ? 
          res.status(400).json({message:"project name required"}) : 
          next()
        !req.body.description ? 
          res.status(400).json({message:"project description required"}) : 
          next()
      }

  // validate if project id exists already in database
      function validateProjectId(req, res, next) {
        Projects.get(req.params.id)
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

  // validate if action has required fields: project id - validateProjectId?, description, notes
      function validateAction(req, res, next) {
        !req.body.notes ? 
          res.status(400).json({message:"action notes required"}) : 
          next()
        !req.body.description ? 
          res.status(400).json({message:"action description required"}) : 
          next()
      }

  // validate if actionId already exists in database
      function validateActionId(req, res, next) {
        Actions.get(req.params.id)
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
