import { Router } from 'express'

const serviceRouter = Router()

serviceRouter.post('/', (req, res) => {
  const data = req.body

  console.log(data)

  return res.json({
    resp: data,
    message: 'Service POST',
    anio: 2024,
    fuete: 'DTU'
  })
})

serviceRouter.get('/', (req, res) => {
  return res.json({
    message: 'Service GET'
  })
})

export default serviceRouter
