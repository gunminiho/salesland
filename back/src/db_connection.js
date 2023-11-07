require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Crea una instancia a la DB con Sequelize
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/salesland`, {
    logging: false,
    native: false,
});

//console.log("sequelize: ",sequelize);

//carga automatica de modelos

const basename = path.basename(__filename);
const modelDefiners = [];
// Objeto para almacenar las definiciones de modelos
const modelDefinitions = {}; 

// Lee y carga las definiciones de modelos
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const modelDefiner = require(path.join(__dirname, '/models', file));
        const modelName = modelDefiner.name; // Supongamos que cada definición tiene una propiedad "name" que es el nombre del modelo
        modelDefiners.push(modelDefiner);
        modelDefinitions[modelName] = modelDefiner;
    });

// Función para cargar los modelos resolviendo dependencias
const loadModels = (modelDefs, modelDeps) => {
    const loadedModels = new Set();

    const loadModel = (modelName) => {
        if (!loadedModels.has(modelName)) {
            const modelDef = modelDefs[modelName];

            if (modelDeps[modelName]) {
                modelDeps[modelName].forEach((depName) => {
                    loadModel(depName);
                });
            }
            modelDef.define(sequelize); // Carga el modelo
            loadedModels.add(modelName);
        }
    };

    // Inicializa el proceso de carga
    Object.keys(modelDefs).forEach((modelName) => {
        loadModel(modelName);
    });
};


// Define las dependencias entre modelos (supongamos que cada modelo tiene una propiedad "dependencies" que es un arreglo de nombres de modelos en los que depende)
const modelDependencies = {};
Object.keys(modelDefinitions).forEach((modelName) => {
    const dependencies = modelDefinitions[modelName].dependencies || [];
    modelDependencies[modelName] = dependencies;
});

// Carga los modelos en el orden correcto
loadModels(modelDefinitions, modelDependencies);
// Capitaliza los nombres de modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([modelName, modelDefinition]) => [modelName.charAt(0).toUpperCase() + modelName.slice(1), modelDefinition]);
sequelize.models = Object.fromEntries(capsEntries);

console.log("modelos: ",sequelize.models);

//Relaciones

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./DB_connection.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./DB_connection.js');
};