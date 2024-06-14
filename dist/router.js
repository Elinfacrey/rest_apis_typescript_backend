"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("./handlers/product");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: false

 */
/*
QUE ES UN ORM
UN ORM SIMPLIFICA LA COMUNICACION ENTRE UNA BASE DE DATOS Y EL CODIGO
DE TU APLICACION
EN LUGAR DE ESCRIBIR CONSULTAS SQL ESCRIBES FUNCIONES QUE SON BASTANTE SIMILARES A EL CODIGO QUE YA
ESCRIBES

VENTAJAS
ABASTRACCIÓN- ESTO SIGNIFICA QUE PUEDES INTERACTUAR CON LA BASE DE DATOS USANDO OBJETOS,
CLASES Y METODOS EN LUGAR DE ESCRIBIR CONSULTA SQL COMPLICADAS

PORTABILIDAD
PUEDES CAMBIAR DE UN SISTEMA DE GESTIÓN DE BASES DE DATOS A OTRO SIN TENER QUE REESCRIBIR
TODO TU CODIGO

PRODUCTIVIDAD
EL ORM SE ENCARGA DE TAREAS REPETITIVAS COMO LA GENERACION DE COSNULTAS SQL, LO QUE PERMITA
ENFOCARTE EN LA LOGICA DE TU APLICACION

CONSIDERACIONES A LA HORA DE ELEGIR UN ORM
DEBE ESTAR EN DESARROLLO DE FORMA ACTIVA

UNA ORM ASEGURA LA ENTRADA DE LA INFORMACION PERO SIEMRPE DEBES VALIDAR

CAMBIAR DE ORMS PUEDE NO SER TAN SIMPLE, ELIGE CON CUIDADO ANTES DE INICIAR UN PROYECTO

*/
/**
 * @swagger
 * /api/productos:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *
 */
/*
PUT Y PATCH
CUANDO UTILIZAR CADA UNO

*PUT --> ACTUALIZAR
EL METODO PUT DE UTILIZA PARA ACTUALIZAR O REMPLAZAR COMPLETAMENTE UN RECURSO EXISTENTE EN UN
SERVIDOR WEB
CUANDO HACES UNA SOLICITUD PUT, ESTÁS DICIENDO AL SERVIDOR QUE TOME LA INFORMACION PROPORCIONADA
Y LA UTILICE PARA REEMPLAZAR COMPLETAMENTE EL RECURSO EN LA UBICACION ESPECIFICADA

*PATCH --> MODIFICAR
EL METODO PATCH SE UTILIZA PARA REALIZAR MODIFICACIONES PARCIALES EN UN RECURSO EXISTENTE EN
SERVIDOR WEB
EN LUGAR DE REEMPLAZAR COMPLETAMENTE EL RECURSO, COMO LO HACE PUT, PATCH PERMITE REALIZAR
CAMBIOS ESPECÍFICOS EN LOS DATOS DEL RECURSO SIN AFECTAR EL RESTO DE LA INFORMACION
SI TIENES UN OBJETO JSON QUE REPRESENTA UN PRODUCTO Y HACES SOLICITUD PATCH AL SERVIDOR CON
UNA PEQUEÑA PARTE DE LOS DATOS ACTUALIZADOS(EJM: CAMBIAR SOLO DISPONIBILIDAD), EL SERVIDOR APLICARA
ESOS CAMBIOS SIN AFECTAR OTROS DETALLES DEL PRODUCTO







*/
router.get('/', product_1.getProducts);
/**
 * @swagger
 * /api/productos/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its an unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not found
 *
 *          404:
 *              description: Bad Request - Invalid ID
 *
 *
 */
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.getProductById);
/**
 *@swagger
 * /api/productos:
 *  post:
 *      summary: Creastes a new product
 *      tags:
 *          - Product
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                             example: 'Monitor Curvo 49'
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 *
 */
router.post('/', (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre de Producto no puede ir vacío'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de un Producto no puede ir vacío')
    .custom(value => value > 0).withMessage('Precio no válido'), middleware_1.handleInputErrors, product_1.createProduct);
/**
 * @swagger
 * /api/productos/{id}:
 *  put:
 *     summary: Updates a product with user input
 *     tags:
 *          - Products
 *     description: Returns the updated product
 *     parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                             example: 'Monitor Curvo 49'
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *     responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID od Invalid input data
 *          404:
 *              description: Product Not Found
 *
 *
 *
 */
router.put('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre de Producto no puede ir vacío'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de un Producto no puede ir vacío')
    .custom(value => value > 0).withMessage('Precio no válido'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'), middleware_1.handleInputErrors, product_1.updateProduct);
/**
 * @swagger
 *  /api/products/{id}:
 *   patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products:
 *      description: Returns the updated avilability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not found
 *
 *          404:
 *              description: Bad Request - Invalid ID
 *
 */
router.patch('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.updateAvailability);
/**
 * @swagger
 *  /api/products/{id}:
 *   delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products:
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Not found
 *
 *          404:
 *              description: Bad Request - Invalid ID
 *
 */
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map