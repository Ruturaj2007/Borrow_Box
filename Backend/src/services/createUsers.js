
const { prisma } = require('../configs/db')
const { hashPass } = require('./password_hash')

const createUser = async (
  user_enrollmentId,
  user_name,
  user_email,
  user_password,
  user_phone
) => {

  try {

    const hash_password = await hashPass(user_password)

    const res = await prisma.user.create({
      data: {
        enrollmentId: user_enrollmentId,
        name: user_name,
        email: user_email,
        passwordHash: hash_password,
        phone: user_phone
      }
    })

    console.log('User created successfully!')

    return res

  } catch (err) {

    console.log(`Error in DATABASE: ${err.message}`)
    throw err

  }
}

module.exports = createUser
