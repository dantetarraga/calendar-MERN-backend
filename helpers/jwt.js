import jwt from 'jsonwebtoken'

export const generateToken = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      if (err) {
        console.log('Could not generate token', err)
        reject(new Error('Could not generate token'))
      }
      resolve(token)
    })
  })
}
