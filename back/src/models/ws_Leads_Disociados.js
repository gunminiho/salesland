const { DataTypes } = require("sequelize");

module.exports = {
    name: "ws_Leads_Disociados_enc",
    define: (sequelize) => {
        sequelize.define("ws_Leads_Disociados", {
            ident_ori: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ident: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_enc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            campana_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cod_proveedor_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fecha_captacion_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nombre_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ape1_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ape2_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nif_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            telefono_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            direccion_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            codigo_postal_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            poblacion_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            provincia_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            acepta1_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            acepta2_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            acepta3_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            num1_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            num2_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            num3_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dual1_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dual2_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dual3_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            variable1_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            variable2_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            variable3_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            memo_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fecha_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            hora_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            foto1_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            foto2_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            comercial_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            centro_enc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        });
    }
};
