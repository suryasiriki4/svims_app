import express from 'express'
import hospitalModel from '../models/hospital.js'
import userModel from '../models/user.js'

const userRouter = express.Router()

userRouter.post('/add', async (req,res) => {
    try {
        const details = req.body
        const checkDoctor = await userModel.findOne({mobile_no: details.mobile_no})
        if(checkDoctor){
            res.status(400).send('User Already exist')
        }
        else {
            const newDoctor = new userModel(details)
            await newDoctor.save()
            res.status(201).send('added Successfully')
        }
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
})

userRouter.post('/signin', async (req,res) => {
    try {
        const {mobile_no,password} = req.body
        console.log(req.body);
        const user = await userModel.findOne({mobile_no,password})
        if(user) res.status(200).send(user)
        else res.status(400).send('Invalid password or username')
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
})

userRouter.post('/add/admin', async (req,res) => {
        const {hospital_name,branch,
            name,mobile_no,gender,designation,qualification,password} = req.body
        const checkUser = await userModel.findOne({mobile_no})
        const checkHospital = await userModel.findOne({hospital_name,branch})
        if(checkHospital) {
            res.status(400).send('Hospital already exist')
        }
        else
        if(checkUser ) {
            res.status(400).send('User already exist')
        }
        else {
            /*const admin = new userModel({
                name,mobile_no,password,gender,designation,
                role:'doctor',qualification,isAdmin: true
            }) 
            admin.save()*/
            const newHospital = new hospitalModel({
                hospital_name,
                branch
            })
            newHospital.save().then((data)=> {
                const admin = new userModel({
                    name,mobile_no,password,gender,designation,
                    role:'doctor',qualification,isAdmin: true,
                    hospital_id: data._id
                }) 
                admin.save()
            }).catch ((err) => {
                res.status(500).send(err)
                console.log(err);
            })
            res.status(201).send('added successfully')
        }
})

export default userRouter
