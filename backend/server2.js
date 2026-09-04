const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const Event = require('./models/eventmodel')
const User2 = require('./models/user2Model')

const cors = require('cors')

const eventRoute = require('./routes/eventroutes')
const userRoute = require('./routes/user2')


const app = express();
app.use(cors())
app.use(express.json())

//routes 
app.use(userRoute);
app.use(eventRoute);


const mongoose = require('mongoose')


mongoose.connect(process.env.URI)
    .then(()=>{
        console.log('Connected to mongodb successfully');

        app.listen(process.env.PORT || 8000, (err)=>{
            if (err) console.log(err);
            console.log(`Server running successfully at ${process.env.PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Error connecting to mongodb', err)
    });

    