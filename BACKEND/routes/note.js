const express = require ('express');
 const User = require('../models/Admin');
const router = express.Router();

router.post('/',async (req , res)=>{
   console.log(req.body);
   const Admin = Admin(req.body);
   admin.save()
   res.send(req.body);
})


module.exports = router;