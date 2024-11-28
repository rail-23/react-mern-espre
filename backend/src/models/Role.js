import { Schema, model } from "mongoose";

////iniciamos los roles
export const ROLES = ["estudiante","decano","viceretor"]
const  roleSchema = new Schema({
    name: String,
}, {
    version: false,
})
export default model('Role', roleSchema)