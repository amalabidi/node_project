const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Creating a project Schema 
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
   description: {
        type: String,
        required: true,
       
    },
   
    leaderId: {
      type : String , 
      required: true, 
    },
    date: {
        type: Date,
       default: new Date(),
    },
    collaborators: {
        type: [String]
       
        
    },
    tasks: {
        type: [String],
        default: []
    }
    
   
  
});


// Creating a model from a Schema 

const Project = mongoose.model('Project', projectSchema);

exports.Project = Project;