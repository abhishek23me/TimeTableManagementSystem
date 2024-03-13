// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     designation: {
//         type: String,
//         required: true
//     },
//     departmentName: {
//         type: String,
//         required: true
//     },
//     schoolCenterName: {
//         type: String,
//         required: true
//     },
//     cabinNo: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// });

// const User = mongoose.model('user', UserSchema);

// module.exports = User;


// // const mongoose = require('mongoose');
// // const {Schema} = mongoose;

// // const UserSchema = new Schema ({

// //     name:{
// //         type: String,
// //         required :true
// //     },
// //     email:{
// //         type: String,
// //         required :true,
// //         unique:true
// //     },
// //     password:{
// //         type:String,
// //         default:"General"
// //     },

// //     date:{
// //         type: Date,
// //         default : Date.now()
// //     },
// // });


// // module.exports = mongoose.model('user',UserSchema);



const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    },
    schoolCenterName: {
        type: String,
        required: true
    },
    cabinNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subject1: {
        type: String,
        default: null // You can set default values if needed
    },
    subject2: {
        type: String,
        default: null
    },
    subject3: {
        type: String,
        default: null
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;