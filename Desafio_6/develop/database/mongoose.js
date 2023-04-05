import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config/database'
export async function conectar(){
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`conectada a la base ${MONGODB_CNX_STR}`)
}