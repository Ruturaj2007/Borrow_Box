const bcrypt = require('bcrypt')
const saltRounds = 10;

const hashPass = async (user_password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  
  const hash_password = await bcrypt.hash(user_password, salt);

  return hash_password
  
}

const comparePass = async (user_password,hashed_password) => {
  const status = await bcrypt.compare(user_password, hashed_password)
  return status
  
}


module.exports = {hashPass,comparePass}


