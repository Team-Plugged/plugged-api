import path from 'path'
import express from 'express'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import patientRoutes from './routes/patientRoutes.js'
import hospitalRoutes from './routes/hospitalRoutes.js'
import healthRecordRoutes from './routes/healthRecordRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



dotenv.config()

connectDB()

const app = express()

app.use(cors())


app.use(express.json())



app.get('/api', (req, res) => {
    res.send('API is running')
})

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/patients', patientRoutes)
app.use('/api/hospitals', hospitalRoutes)
app.use('/api/healthrecords', healthRecordRoutes)
app.use('/api/upload', uploadRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))