import swaggerAutogen from "swagger-autogen";

const outputFile = './swagger.json';
const endPointsFiles = ['./app.js'];

const doc = {
    info:{
        title: 'Api para administracion de tareas',
        description: 'Generar y administrar tareas'
    },
    host: 'localhost:3000',
    schemes: ['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);