import {Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!,{
    models:[__dirname + '/../models/**/*'],
    logging: false
}) //EL SIGNO DE EXCLAMACION TE ASEGURA QUE ESE VALOR ESTARÁ AHÍ
export default db