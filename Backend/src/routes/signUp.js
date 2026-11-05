// const express = require('express')
// const app = express()

// const createUser  = require('../services/createUsers')



// app.post('/api/register', async (req, res) =>{
//   try {
//   // const { user_enrollmentId,
//   //   user_name,
//   //   user_email,
//   //   user_password,
//   //   user_phone } = req.body



 
  


//   const user = await createUser(req.body)

//   res.status(201).json({
//     message: "Registration successful!",
//     user: user
    
//   })

//   } catch (error) {

//     if (error.code === "P@))@") {
//       return res.status(400).json({
//         error: "A user with this email already exists.",
//       });
      
//     } else {
//       console.log(`Error:${error}`)
//       res.status(500).json({ error: "Server error." });
      

      
//     }
    
    
  
// }

// })























const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/signupController');

router.post('/register', registerUser);

module.exports = router;