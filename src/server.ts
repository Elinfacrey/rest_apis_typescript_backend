import express from "express";
import router from "./router";
import db from "./config/db";
import morgan from 'morgan';
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import swaggerSpec from "./config/swagger";
import swaggerUi from "swagger-ui-express";

 
//Conectar a base de datos


export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.bold('Conexión exitosa a la BD'))
    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'))
    }
}

connectDB()
//un decorador es un @ que llama a una fucnion dentro de otra
const server = express()

//Permitir conexiones
//Se define el origen(quien envía la peticion) 
const corsOptions: CorsOptions = {
    origin(requestOrigin, callback) {
        console.log(requestOrigin)
        if(requestOrigin === process.env.FRONTEND_URL) {
            callback(null, true)
        }else {
            callback(new Error('Error de CORS'))
        }
    },

}
//Va a ejecutarse en todo tipo de peticion, queremos que todo el tiempo que ejecute nuestro proyecto se ejecuten esos CORS

server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))


//server.use() //.use se ejecuta en cada uno de estos

server.use('/api/productos', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
export default server