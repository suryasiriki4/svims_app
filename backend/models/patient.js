import mongoose from 'mongoose'

const patientSchema = mongoose.Schema({
    s_no: {
        type: String,
        require: true
    },
    ward_name: {
        type: String,
        require: true
    },
    UHID: {
        type: String,
        require: true,
        unique: true
    },
    hospital_no: {
        type: String,
        require: true,
        unique: true
    },
    doa: {
        type: String,
        require: true
    },
    patient_name: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    pr: {
        type: String,
        require: true
    },
    bpsys: {
        type: String,
        require: true
    },
    bpdis: {
        type: String
    },
    rr: {
        type: String,
        require: true
    },
    spo2: {
        type: String,
        require: true
    },
    o2_niv_mv: {
        type: String,
        require: true
    },
    complaints: {
        type: String,
    },
    o2_niv_mv_level: {
        type: String,
    },
    bed: String,
    duty_doctor: String,
    duty_nurse: String,
    hospital_id: String,
    status: String
})

const patientModel = mongoose.model('patient',patientSchema);
export default patientModel;