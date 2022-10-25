import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import process from 'process'
import userRouter from './user/router'
import noteRouter from './notes/router'
import quoteRouter from './quotes/router'
import { accessHeader } from './middleware/auth'

const app: express.Application = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json())
app.use('/user', [accessHeader], userRouter)
app.use('/note', [accessHeader], noteRouter)
app.use('/quote', [accessHeader], quoteRouter)

export const server = app.listen(port, () => {
    console.log(`Listen to port ${port}`)
})
export const closeServer = async () => await server.close()
export default app;
