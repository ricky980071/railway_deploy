import mongoose from 'mongoose'
const Schema = mongoose.Schema;
//define your schema
/*example
const yourSchema = new Schema({
 name: String,
 score: Number
});
const SC = mongoose.model('yourSchema', yourSchema);
*/
const UserSchema = new Schema({
    name:String,
    subject:String,
    score:Number
});
const SC = mongoose.model("User",UserSchema)
export default SC;