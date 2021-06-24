import { Schema as MongooseSchema } from "mongoose";
//import { findOneOrCreate, findByAge } from "./statics";
//import { setUpdatedAt, sameLastName } from "./methods";

const schema = new MongooseSchema({
    firstName: String,
    middleNames: String,
    lastName: String,
    age: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

// static methods
//UserSchema.statics.findOneOrCreate = findOneOrCreate;
//UserSchema.statics.findByAge = findByAge;

// instance methods
//UserSchema.methods.setUpdatedAt = setUpdatedAt;
//UserSchema.methods.sameLastName = sameLastName;

export default schema;