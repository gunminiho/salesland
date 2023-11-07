const { DataTypes, UUID } = require("sequelize");

module.exports = {
    name: "ws_Leads",
    define: (sequelize) => {
        sequelize.define("ws_Leads", {
            ident: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            id: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            campana: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cod_proveedor: {
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            fecha_captacion: {
                type: DataTypes.STRING(16), // Formato "aaaammdd hh:mm"
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            ape1: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            ape2: {
                type: DataTypes.STRING(50),
            },
            nif: {
                type: DataTypes.STRING(50),
            },
            telefono: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    isInt: true,
                    min: 600000000,
                    max: 999999999,
                },
            },
            email: {
                type: DataTypes.STRING(150),
            },
            direccion: {
                type: DataTypes.STRING(50),
            },
            codigo_postal: {
                type: DataTypes.STRING(5),
            },
            poblacion: {
                type: DataTypes.STRING(50),
            },
            provincia: {
                type: DataTypes.STRING(50),
            },
            acepta1: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    isIn: [["SI", "NO"]],
                },
            },
            acepta2: {
                type: DataTypes.STRING(2),
                validate: {
                    isIn: [["SI", "NO"]],
                },
            },
            acepta3: {
                type: DataTypes.STRING(2),
                validate: {
                    isIn: [["SI", "NO"]],
                },
            },
            num1: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true,
                },
            },
            num2: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true,
                },
            },
            num3: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: true,
                },
            },
            dual1: {
                type: DataTypes.STRING(2),
                validate: {
                    isIn: [["SI", "NO"]],
                },
            },
            dual2: {
                type: DataTypes.STRING(2),
                validate: {
                    isIn: [["SI", "NO"]],
                },
            },
            dual3: {
                type: DataTypes.STRING(2),
                validate: {
                    isIn: [["SI", "NO"]],
                },
            },
            variable1: {
                type: DataTypes.STRING(50),
            },
            variable2: {
                type: DataTypes.STRING(50),
            },
            variable3: {
                type: DataTypes.STRING(50),
            },
            memo: {
                type: DataTypes.JSON, // Utiliza el tipo JSON para almacenar un objeto JSON
                allowNull: true, // Puede ser nulo si se proporciona un objeto JSON
                validate: {
                    hasIdOportunidad(value) {
                        if (!value || !value.idoportunidad) {
                            throw new Error('El campo "memo" debe contener al menos el campo "idoportunidad".');
                        }
                    },
                },
            },
            fecha: {
                type: DataTypes.DATEONLY, // Formato "yyyyMMdd"
            },
            hora: {
                type: DataTypes.TIME, // Formato "hh:mm"
            },
            foto1: {
                type: DataTypes.STRING(500),
            },
            foto2: {
                type: DataTypes.STRING(500),
            },
            comercial: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            centro: {
                type: DataTypes.STRING(50),
            },
            idUnico: {
                type: DataTypes.VIRTUAL(DataTypes.STRING, ["cod_proveedor", "ident"]),
                get() {
                  const cod_proveedor = this.getDataValue("cod_proveedor") || '';
                  const ident = this.getDataValue("ident") || 0;
                  const prefix = cod_proveedor + 'CAP';
                  const identString = ident.toString().padStart(9, '0');
                  return prefix + identString;
                },
              },
        });
    }
};
