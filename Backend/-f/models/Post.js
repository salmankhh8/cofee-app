const mongoose = require('mongoose');

const postSchema= mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    },
    data: {
        type:'string',
        dafault: Date.now
    }
})

module.exports =mongoose.model('Posts', postSchema)
