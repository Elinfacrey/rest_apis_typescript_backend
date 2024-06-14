import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true}) // eliminar todos los datos de la base de datos
        console.log('Datos eliminados correctamente')
        exit() //finaliza el programa, hasta ahí llega y lo hizo bien
    } catch (error) {
        console.log(error)
        exit(1) //este finaliza con errores
    }
}

if(process.argv[2] === '--clear') {
    clearDB()
}

console.log(process.argv)