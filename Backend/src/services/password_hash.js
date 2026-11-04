const bcrypt = require('bcrypt')
const saltRounds = 10;

const hashPass = async (user_password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  
  const hash_password = await bcrypt.hash(user_password, salt);

  return hash_password
  
}

const compare_pass = async () => {
  
}


module.exports = {hashPass,compare_pass}


