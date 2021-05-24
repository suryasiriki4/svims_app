import mongoose from 'mongoose'

const equipmentSchema = mongoose.Schema({
    s_no: {
        require: true,
        type: String
    },
    ward_name: {
        require: true,
        type: String,
        unique: true
    },
    o2_occ_beds: {
        require: true,
        type: String
    },
    o2_vac_beds: {
        require: true,
        type: String
    },
    no2_occ_beds: {
        require: true,
        type: String
    },
    no2_vac_beds: {
        require: true,
        type: String
    },
    icu_occ_beds: {
        require: true,
        type: String
    },
    icu_vac_beds: {
        require: true,
        type: String
    },
    vac_ventilator: {
        require: true,
        type: String
    },
    occ_ventilator: {
        require: true,
        type: String
    },
    hospital_id: {
        require: true,
        type: String
    }
    
})

const equipmentModel = mongoose.model('equipment',equipmentSchema)

export default equipmentModel