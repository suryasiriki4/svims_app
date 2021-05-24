import express from 'express'
import mongoose from 'mongoose'
import patientRouter from './routers/patient_router.js'
import cors from 'cors'
import userRouter from './routers/user_router.js'
import equipmentRouter from './routers/equipments_router.js'

const app = express()
const mongo_url = 'mongodb+srv://pbic:AsDf1234@cluster0.yrzjw.mongodb.net/patient?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then (()=> console.log('connected to db')).catch ((err)=>
    console.log(err)
)

app.get('/', async (req,res) => {
    try{
    res.send('hello')
    }
    catch (err) {
        console.log(err);
    }
})
app.use('/patient',patientRouter);
app.use('/user',userRouter);
app.use('/equipment',equipmentRouter);

app.listen(5000, ()=> {
    console.log('listining at port no 5000')
})