import express from 'express'
import equipmentModel from '../models/equipment.js'
import hospitalModel from '../models/hospital.js'
import userModel from '../models/user.js'

const equipmentRouter = express.Router();

// equipmentRouter.post('/add', async (req,res) => {
//     try {
//         const details = req.body
//         const checkWard = await equipmentModel.findOne({hospital_id:details.hospital_id
//             ,ward_name: details.ward_name})
//         if(checkWard){
//             res.send('Ward already exist')
//         }
//         else {
//             const newWard = new equipmentModel(details)
//             await newWard.save()
//             res.status(201).send('added Successfully')
//         }
//     }
//     catch (err) {
//         res.status(500).send(err);
//         console.log(err);
//     }
// })

// equipmentRouter.post('/update', async (req,res) => {
//     try {
//         const {ward_name,o2_avl_beds,o2_vac_beds,
//             no2_avl_beds,no2_vac_beds,hospital_id} = req.body
//         const checkWard = await equipmentModel.findOne({ward_name: ward_name,
//             hospital_id: hospital_id});
//         if(checkWard){
//             res.send('Ward not added');
//         }
//         else {
//             await equipmentModel.findOneAndUpdate({ward_name},
//                 {$set: {o2_avl_beds,o2_vac_beds,no2_avl_beds,no2_vac_beds}});
//             res.status(201).send('updated Successfully');
//         }
//     }
//     catch (err) {
//         res.status(500).send(err);
//         console.log(err);
//     }
// })

equipmentRouter.get('/get/:ward_name/:hospital_id', async (req,res) => {
       try{
           const ward_name = req.params.ward_name
           const hospital_id = req.params.hospital_id
            const data = await equipmentModel.findOne({ward_name,hospital_id})
            res.status(200).send(data);
       }
       catch (err) {
           res.status(500).send(err)
       }
})


equipmentRouter.post('/add', async (req,res) => {
    try {
        const details = req.body
        const checkWard = await equipmentModel.findOne({hospital_id:details.hospital_id
            ,ward_name: { $regex: details.ward_name, $options: 'i' }})
        if(checkWard){
            const {hospital_id,ward_name,s_no,...updated_data} = details
            await equipmentModel.findOneAndUpdate({hospital_id:details.hospital_id
                ,ward_name: { $regex: details.ward_name, $options: 'i' }},{
                    $set: {...updated_data}
                });
        }
        else {
            const newWard = new equipmentModel(details);
            await newWard.save();
            res.status(201).send('added Successfully')
        }
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

export default equipmentRouter
