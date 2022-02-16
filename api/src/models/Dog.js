const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },

    heightMin : { 
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      },
      allowNull: false,
    },

    heightMax : { 
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
      allowNull: false,
    },

    weightMin : {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      },
      allowNull: false,
    },

    weightMax : {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
      allowNull: false,
    },

    lifespan : {
      type: DataTypes.STRING
    },

    image : {
      type: DataTypes.STRING(1234),
      allowNull: true
    },

    createdInDb : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{timestamps: false}); 
};
