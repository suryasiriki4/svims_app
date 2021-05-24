import express from 'express'
import patientModel from '../models/patient.js'
import patientRecordModel from '../models/patient_record.js' 

const patientRouter = express.Router()

patientRouter.post('/add', async (req,res) => {
    try {
        const patient_details = req.body 
        const {hospital_id,UHID,...record} = patient_details
        const patient = await patientModel.findOne({UHID: patient_details.UHID})
        const date = new Date()
        const timestamp = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
        console.log(patient_details);
        if(patient) res.send('patient already exist.')
        else {
        const newData = new patientModel({...patient_details})
        await newData.save()
        const newRecordData = new patientRecordModel({
            UHID,
            hospital_id,
            record: {
                ...record,
                timestamp
            }
        })
        await newRecordData.save()
        res.status(201).send('added successfully')
    }
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

patientRouter.post('/add/record', async (req,res)=> {
    try{
        const {UHID,hospital_id,...record} = req.body
        const date = new Date()
        const timestamp = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
        console.log(record);
        await patientRecordModel.findOneAndUpdate(
            {$and:[{ UHID,hospital_id }]},{$push: {record: {...record,timestamp}}});
        const {ward_name,bed,pr,bp,rr,spo2,o2_niv_mv,doa,age
            ,complaints,o2_niv_mv_level,duty_doctor,duty_nurse} = record
        const updatedData = await patientModel.findOneAndUpdate({$and:[{ UHID,hospital_id }]},{$set: {...record}})
        res.send(updatedData)
    }
    catch(err) {
        res.status(500).send(err)
        console.log(err);
    }
})

patientRouter.get('/UHID/:UHID/:hospital_id', async (req,res) => {
    try {
        const UHID = req.params.UHID
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.findOne({ UHID,hospital_id })
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})


//correct
/*patientRouter.get('/Name/:Name/:hospital_id', async (req,res) => {
    try {
        const name = req.params.Name
        const hospital_id = req.params.hospital_id
        const patient = await patientModel.find({patient_name:`/${name} /`,hospital_id})
        res.status(200).send(patient)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})



patientRouter.get('/DM/:hospital_id', async (req,res) => {
    try {
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and: [{hospital_id,complaints: 'DM'}]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})


//correct
patientRouter.get('/doa/:doa/:hospital_id', async (req,res) => {
    try {
        const doa = req.params.date
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and:[{ doa,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

patientRouter.get('/bp/:bp/:hospital_id', async (req,res) => {
    try {
        const hospital_id = req.params.hospital_id
        const bp = req.params.bp.replace('-','/')
        const patients = await patientModel.find({$and:[{ bp,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

patientRouter.get('/pr/:pr/:hospital_id', async (req,res) => {
    try {
        const pr = req.params.pr
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and:[{ pr,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

patientRouter.get('/rr/:rr/:hospital_id', async (req,res) => {
    try {
        const rr = req.params.rr
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and:[{ rr,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

patientRouter.get('/spo2/:spo2/:hospital_id', async (req,res) => {
    try {
        const spo2 = parseInt(req.params.spo2)
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and:[{ spo2,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})


patientRouter.get('/duty_doctor/:doctor/:hospital_id', async (req,res) => {
    try {
        const duty_doctor = req.params.doctor
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and:[{ duty_doctor: `/${duty_doctor}* /`,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})


patientRouter.get('/ward/:ward/:hospital_id', async (req,res) => {
    try {
        const ward = req.params.ward
        const hospital_id = req.params.hospital_id
        const patients = await patientModel.find({$and:[{ ward,hospital_id }]})
        res.status(200).send(patients)
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})


 */

patientRouter.get('/get/record', async (req,res) => {
    try{
        const UHID =  req.query.UHID
        const timestamp = req.query.date
        const hospital_id = req.params.hospital_id
        const data = await patientRecordModel.findOne({$and:[{ UHID,hospital_id }]},
            {_id:0,record: {$elemMatch: {timestamp}}})
        res.send(data)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

patientRouter.post('/filter', async (req,res) => {
    try{
    const {duty_doctor,ward,patient_name,bpsys,bpdis,doa,UHID
        ,spo2,pr,o2_niv_mv,o2_niv_mv_level,rr,complaints} = req.body
        let data = null
        let check = false
    if(UHID) {
        if(UHID.length !== 0) {
        data = await patientModel.find({UHID})
        check = true}
            console.log(data); 
    }
    if(o2_niv_mv_level) {
        if(o2_niv_mv_level.length !== 0)
        if(check)  
        data = data.filter((ele) => ele.o2_niv_mv_level === o2_niv_mv_level) 
        else
       { data = await patientModel.find({o2_niv_mv_level})
            check = true
        }
        console.log(data);
    }
    if(bpsys) {
        if(bpsys.length !== 0)
        if(check)  
        data = data.filter((ele) => ele.bpsys > bpsys) 
        else
       { data = await patientModel.find({bpsys})
            check = true
        }
        console.log(data);
    }
    if(bpdis) {
        if(bpdis.length !== 0)
        if(check)  
        data = data.filter((ele) => ele.bpdis === bpdis) 
        else
       { data = await patientModel.find({bpdis})
            check = true
        }
        console.log(data);
    }
    if(patient_name) {
        if(patient_name.length !== 0)
        if(check)  {
        const regex = new RegExp(patient_name,'gi')
        data = data.filter((ele) => ele.patient_name.match(regex)) 
        }
        else
       { data = await patientModel.find({patient_name: { $regex: '.*' + patient_name + '.*', $options: 'i' }})
            check = true
        }
        console.log(data);
    }
    if(ward) {
        if(ward.length !== 0)
        if(check)  {
        const regex = new RegExp(ward,'gi')
        data = data.filter((ele) => ele.ward_name.match(regex)) 
        }
        else
       { data = await patientModel.find({ward_name: { $regex: '.*' + ward + '.*', $options: 'i'}})
            check = true
        }
        console.log(data);
    }
    if(o2_niv_mv) {
        if(o2_niv_mv.length !== 0)
        if(check)  {
        const regex = new RegExp(o2_niv_mv,'gi')
        data = data.filter((ele) => ele.o2_niv_mv.match(regex)) 
        }
        else
       { data = await patientModel.find({o2_niv_mv: { $regex: '.*' + o2_niv_mv + '.*', $options: 'i'}})
            check = true
        }
        console.log(data);
    }
    if(doa) {
        if(doa.length !== 0)
        if(check)  
        data = data.filter((ele) => ele.doa === doa) 
        else
       { data = await patientModel.find({doa})
            check = true
        }
        console.log(data);
    }
    if(spo2) {
        if(spo2.length !== 0)
        if(check)  
        data = data.filter((ele) => spo2[0] <= ele.spo2 && ele.spo2 >= spo2[1]) 
        else
       { data = await patientModel.find({doa})
            check = true
        }
        console.log(data);
    }
    if(pr) {
        if(pr.length !== 0)
        if(check)  
        data = data.filter((ele) => pr[0] <= ele.pr && ele.pr >= pr[1]) 
        else
       { data = await patientModel.find({doa})
            check = true
        }
        console.log(data);
    }
    if(rr) {
        if(rr.length !== 0)
        if(check)  
        data = data.filter((ele) => rr[0] <= ele.rr && ele.rr >= rr[1]) 
        else
       { data = await patientModel.find({doa})
            check = true
        }
        console.log(data);
    }
    if(complaints) {
        if(complaints.length !== 0)
        if(check)  {
        const regex = new RegExp(complaints,'gi')
        data = data.filter((ele) => ele.complaints.match(regex) )
        } 
        else
       { data = await patientModel.find({complaints: { $regex: '.*' + complaints + '.*', $options: 'i' }})
            check = true
        }
        console.log(data);
    }
    if(duty_doctor) {
        if(duty_doctor.length !== 0)
        if(check)  {
            const regex = new RegExp(duty_doctor,'gi')
        data = data.filter((ele) => ele.duty_doctor.match(regex)) 
        }
        else
       { data = await patientModel.find({duty_doctor: { $regex: '.*' + duty_doctor + '.*', $options: 'i' }})
            check = true
        }
        console.log(data);
    }
    res.status(200).send(data)
    console.log(data);
    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})


export default patientRouter