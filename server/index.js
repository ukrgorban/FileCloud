const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const cors = require('./middleware/cors.middleware')

const authRoute = require('./routes/auth.routes')
const fileRoute = require('./routes/file.routes')

const app = express()

app.use(fileUpload({}))
app.use(cors)
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/file', fileRoute)

const PORT = process.env.PORT || config.get('PORT')

const start = async () => {
    try{

        await mongoose.connect(config.get('dbUrl'), { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

    }catch(e){
        console.log(e.message);
    }
}

start()
