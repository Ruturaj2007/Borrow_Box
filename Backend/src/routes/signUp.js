const express = require('express')
const app = express()

const createUser  = require('../services/createUsers')



app.post('/api/register', async (req, res) =>{
  try {
  const { user_enrollmentId,
    user_name,
    user_email,
    user_password,
    user_phone } = req.body



  if (!user_enrollmentId || !user_name || !user_email || !user_password || !user_phone) {
    return res.status(400).json({ error: "All fields are required." });
  }
  


  const user = await createUser(user_enrollmentId,
    user_name,
    user_email,
    user_password,
    user_phone)

  res.status(201).json({
    message: "Registration successful!",
    user: user
    
  })

  } catch (error) {

    if (error.code === "P@))@") {
      return res.status(400).json({
        error: "A user with this email already exists.",
      });
      
    } else {
      console.log(`Error:${error}`)
      res.status(500).json({ error: "Server error." });
      

      
    }
    
    
  
}

})























