import colors from 'colors'
import server from "./server";


const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})

/*
TIPO DE TESTING
EN NODE JS Y APIS
UNIT TESTING: VERIFICAR QUE PARTES INDIVIDUALES EN NUESTRO CODIGO FUNCIONEN; TALES
COMO CREAR EL SERVIDOR, VISITAR UNA RUTA, DEBEMOS REVISAR QUE CADA PIEZA FUNCIONE COMO
ESPERABAMOS ANTES DE INTEGRARLA CON OTRAS

INTEGRATION TESTNG: UNA VEZ QUE REVISAMOS QUE ALGUNAS PIEZAS DE CODIGO FUNCIONEN POR SI SOLAS,
ES MOMENTO DE REVISAR CUANDO 2O MAS SE UNEN, TALES COMO VISITAR UNA RUTA Y OBTENER DATOS, O ENVIAR
UNA PETICÓN POST, VALUIDAR Y ENTONCES CREAR EL PRODUCTO

JEST
QUE ES
JES ES UNO DE LOS FRAMEWORKS PARA APLICAR TESTING MAS CONOCIDOS HOY EN DÍA, FUNCIONA CON
TYPESCRIPT, NODE JS, REACT 
LOS TEST CORREN APARTE Y NO SE MEZCLAN CON EL CODIGO EXISTENTE

SUPERTEST
QUE ES
JEST NOS DA UNA SERIE DE FUNCIONES PARA PROBAR CODIGO, PERO CON SUPERTES PODREMOS REALIZAR PETICIONES
HACIA NUESTA API Y REVISAR QUE EL CODIGO FUNCIONE COMO ESPERAMOS


*/