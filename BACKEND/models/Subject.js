const mongoose = require('mongoose');
const {Schema} = mongoose ;

const SubjectSchema = new Schema ({
    category:{
        type: String,
        required: true,
        default:"General"
    },
    coursetitle:{
        type: String,
        required: true,
        default:"General"
        
    },
    coursecode:{
        type:String,
        required: true,
        default:"General"
    },

    ntr:{
        type: String,
        required: true,
        default : "General"
    },

    
    version:{
        type:String,
        required: true,
        default:"General"
    },
    
    lecture:{
        type:String,
        required: true,
        default:"General"
    },
    
    practical:{
        type:String,
        required: true,
        default:"General"
    },

    tutorial:{
        type:String,
        required: true,
        default:"General"
    },
    
    project:{
        type:String,
        required: true,
        default:"General"
    },
    
    credit:{
        type:String,
        required: true,
        default:"General"
    },
    
    coursetype:{
        type:String,
        required: true,
        default:"General"
    },
    
    courseoption:{
        type:String,
        required: true,
        default:"General"
    },
});

const Subject = mongoose.model('subject', SubjectSchema);

module.exports = Subject;