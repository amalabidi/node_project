const router = require('express').Router();
const {Project} = require('../modules/project');
const {User} = require('../modules/user');
router.get("/:id", async (req, res) => {
  try {
      
        const project = await Project.findById(req.params.id);
      
        console.log(project);
         console.log(project.collaborators);
        
         var resultArray = await User.find({_id: {$in: project.collaborators}});
      
        
        console.log(resultArray);
        res.send(resultArray);
    } catch (ex) {
        res.send(ex);
    }
});
router.post("/", async (req, res) => {
    const {projectId,idLeader,userid} = req.body;
   console.log("hello");

    try {
      
        const proj=await Project.findById(projectId);
       
        const found = proj.collaborators.indexOf(userid);
        console.log("hello2");
       if (proj.leaderId===idLeader){
               if(found==-1){
            console.log("im in");
        var result = await Project.updateOne(
           {"_id":projectId},
            {$push:{collaborators: userid}}
        );
        console.log("cbon");
        res.send(proj);
        }else{ 
            res.send('user already exists');}
    }
        else{
            res.send('you don\'t have the permission to add this user');
        }
    } catch (ex) {
        res.send(ex);
    }
});

router.delete("/", async (req, res) => {
    const {projectId,idLeader,id} = req.body;
   

    try {
        const proj=await Project.findById(projectId);
        if (proj.leaderId===idLeader){
       const results = await Project.findByIdAndUpdate(
            {"_id":projectId},
            {$pull: {collaborators:id}}
        );
       res.send(results);
        console.log(proj);
         } else{
            res.send('you don\'t have the permission to delete this user');
        }
    } catch (ex) {
        res.send(ex);
    }
});

module.exports = router;