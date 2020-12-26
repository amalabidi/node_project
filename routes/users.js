const router = require('express').Router();
const {User} = require('../modules/user');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post('/', async (req, res) => {
    const {username, email, address, image,password} = req.body;
    
    try { 
     //verifyinig if the email is already used 
            const oldUser = await User.find({"email":email});
         if(oldUser.length!=0){
              res.send({error:"address already exists"}) ; 
            }
            
        else{

        const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({username, hashedPassword, email, image, address});
        // Saving the user in the database
        const results = await user.save();
        res.send(results);
        token = user.generateToken();
        console.log("token:" ,token);
        
      }
    
    } catch (ex) {  
        res.send(ex); }
})

router.get('/', async (req, res) => {
    try {
        // Find all Users in the database
        const results = await User.find({});
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
})

router.delete('/:id',async (req,res) => {

    try {
        const results = await User.findByIdAndDelete(req.params.id).exec();
        res.send(results);
    } catch (err) {
        res.send(err);
    }
})



//  updating a user 
router.put('/',/*auth, /* admin],*/ async (req, res) => {
    try {

        const {username,email,address,image} = req.body;
       

        let olduser = await User.find({"_id": req.body.id});
        if (!olduser) {
          // checking if the user already exists or not using the old email extracted from the token
            res.send({"error":"user doesn't exist"});
            console.log("nooo");
            return null;
        }else{
          
    
    const hashedPassword=await bcrypt.hash(req.body.password, 10);
    const filter = {"_id": req.body.id};
       const update = {
            username,
            email,
            hashedPassword,
            address,
            image,
        };
        console.log(update);
      
        let user = await User.findByIdAndUpdate(filter, update,  {new: true})
      
        newtoken = user.generateToken();
        res.send(user);
    }} catch (ex) {
        res.send(ex);}
})


module.exports = router;