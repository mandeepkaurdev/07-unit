const mongoose = require('mongoose');


// Save a reference to the Schema constructor
const Schema = mongoose.Schema;


// Using the Schema constructor, create a new UserSchema object
const applistSchema = new Schema({


    item: {
        type: String,
        unique: true,
        required: [true, 'Enter item']
    },

    completed: {
        type: Boolean,
        default: false
    }
});


// This creates model from the above schema, using Mongoose's model method
let applist = mongoose.model('applist', applistSchema);


// Export the applist model
module.exports = applist;