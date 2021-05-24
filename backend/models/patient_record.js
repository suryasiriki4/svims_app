import mongoose from 'mongoose'

const patientRecordSchema = mongoose.Schema({
    UHID: {
        type: String,
        require: true
    },
    record: Array,
    hospital_id: String
})

const patientRecordModel = mongoose.model('patient_record',patientRecordSchema)
export default patientRecordModel