import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'



const app = express()



app.get('/api', (req, res) => {
    res.send('API is running')
})


app.use(notFound)
app.use(errorHandler)


app.listen(5000, console.log('API running on PORT 5000'))