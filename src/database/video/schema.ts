import { Schema as MongooseSchema } from "mongoose";

const schema = new MongooseSchema({
    name: String,
    video: String,
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