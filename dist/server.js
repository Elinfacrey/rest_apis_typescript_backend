"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./config/swagger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//Conectar a base de datos
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        //console.log(colors.bgGreen.bold('Conexión exitosa a la BD'))
    }
    catch (error) {
        //console.log(error)
        console.log(colors_1.default.bgRed.white('Hubo un error al conectar a la BD'));
    }
}
exports.connectDB = connectDB;
connectDB();
//un decorador es un @ que llama a una fucnion dentro de otra
const server = (0, express_1.default)();
//Permitir conexiones
//Se define el origen(quien envía la peticion) 
const corsOptions = {
    origin(requestOrigin, callback) {
        console.log(requestOrigin);
        if (requestOrigin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    },
};
//Va a ejecutarse en todo tipo de peticion, queremos que todo el tiempo que ejecute nuestro proyecto se ejecuten esos CORS
server.use((0, cors_1.default)(corsOptions));
//leer datos de formularios
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
//server.use() //.use se ejecuta en cada uno de estos
server.use('/api/productos', router_1.default);
//Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
//# sourceMappingURL=server.js.map