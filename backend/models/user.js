import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    mobile_no: {
        unique: true,
        require: true,
        type: String
    },
    name: {
        require: true,
        type: String
    },
    gender: String,
    password: {
        type: String,
        require: true
    },
    designation: String,
    qualification: String,
    role: String,
    isAdmin: Boolean,
    hospital_id: String
})

const userModel = mongoose.model('users',userSchema)

export default userModel