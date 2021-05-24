import mongoose from 'mongoose'

const hospitalSchema = mongoose.Schema({
    hospital_name: {
        require: true,
        type: String
    },
    branch: {
        require: true,
        type: String
    }
})

const hospitalModel = mongoose.model('hospital',hospitalSchema)

export default hospitalModel