"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    const products = await Product_model_1.default.findAll({
        order: [
            ['id', 'ASC']
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json({ data: products });
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No encontrado'
        });
    }
    res.json({ data: product });
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    console.log(req.body, "req body");
    /*
    QUE ES MIDDLEWARE
    EN NODE.JS, EL MIDDLEWARE SE REFIERE A UN TIPO DE SOFTWARE INTERMEDIO QUE SE UTILIZA
    PARA PROCESAR LAS SOLICITUDES HTTP QUE LLEGAN A UNA APLICACION WEB ANTES DE SER MANEJADAS POR
    LA FUNCION DE ENRUTAMIENTO PRINCIPAL

    LOS MIDDLEWARE SON FUNCIONES QUE SE EJECUTAN EN EL MEDIO DEL FLUJO DE SOLICITUD Y RESPUESTA
    DE UNA APLICACIÓN WEB Y PUEDEN REALIZAR DIVERSAS TAREAS, COMO AUTENTICACION, VALIDACION DE DATOS,
    REGISTRO DE SOLICITUDES, COMPRENSION DE RESPUESTAS, ENTRE OTRAS

    EL CODIGO QUE SE PONGA EN EL MIDDLEWARE SE EJECUTARA ENTRE UNA ACCION U OTRA

    ES ESCENCIAL PARA LA CREACION DE APLICACIONES WEB ROBUSTAS Y FLEXIBLES. CADA SOLICITUD HTTP PASA A
    TRAVÉS DE UNA SERIE DE MIDDLEWARE ANTES DE LLEGAR A LA FUNCION DE CONTROLADOR QUE MANEJA LA SOLICITUD FINAL

    ESTO PERMITE MODULARIZAR Y ORGANIZAR EL CODIGO DE MANERA EFECTIVA, YA QUE PUEDES AGREGAR O QUITAR MIDDLEWARE
    SEGUN LAS NECESIDADES DE TU APLICACION


    */
    const product = await Product_model_1.default.create(req.body);
    console.log(product, "51");
    res.status(201).json({ data: product });
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No encontrado'
        });
    }
    //Actualizar
    //EN PUT REEMPLAZA EL ELEMETNO CON LO QUE LE ENVIES
    //SI SOLO MANDAS UN ATRIBUTO, SOLO TOMARÁ ESE ATRIBUTO
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No encontrado'
        });
    }
    //Actualizar
    product.availability = !product.dataValues.availability;
    await product.save();
    console.log(product.dataValues);
    res.json({ data: product });
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No encontrado'
        });
    }
    await product.destroy();
    res.json({ data: 'Producto Eliminado' });
    console.log(product.dataValues);
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map