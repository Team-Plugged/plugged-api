import express from 'express'


const app = express()



app.get('/api', (req, res) => {
    res.send('API is running')
})

app.listen(5000, console.log('API running on PORT 5000'))