const bcrypt = require('bcrypt')
const saltRounds = 10;

const { prisma } = require('./src/config')
// console.log(prisma)

const signUp_data = async (user_deatails) => {

  const {user_enrollmentId  ,
    user_name,  
    user_email, 
    user_password,
    user_phone } = user_deatails


  if (!user_enrollmentId || !user_name || !user_email || !user_password || !user_phone) {
    // return res.status(400).json({ error: "All fields are required." });
    // 
    return  "error"
  }
  const salt = await bcrypt.genSalt(saltRounds);
  
  const hash_password = await bcrypt.hash(user_password, salt);
  
  const pre_exist_user = await prisma.user.findUnique({
    where: {
      email : user_email
    },
    select: {
      email: true 
      
    }
  })

  if (!pre_exist_user) {
    const user = await prisma.user.create({
      data: {
        enrollmentId: user_enrollmentId,
        name: user_name,  
        email:user_email, 
        passwordHash: hash_password,
        phone: user_phone
      }
      
    })
    return `User created successfully.`
    
  } else {
    return "Email already exist.!"
  }


  console.log("krfmvjn")

  



  
  


  


  


  
  

     
  
}

signUp_data({
  user_enrollmentId: "TUR2026001",
  user_name: "Rahul Sharma",
  user_email: "rahul@gmail.com",
  user_password: "Rahul@123",
  user_phone: "9876543210"
}).then(result => console.log(result));