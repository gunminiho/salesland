const { Ws_Leads, Ws_Leads_Disociados } = require("../db_connection");
const { encrypt, decrypt } = require("../helpers/crypto");


const postDisociarLead = async (lead_id) => {
    try {
        const leadToDisociate = await Ws_Leads.findByPk(lead_id);
        const { dataValues } = leadToDisociate;
        //console.log("postDisociarLeads: ", dataValues);
        for (const prop in dataValues) {
            if (dataValues.hasOwnProperty(prop) && typeof dataValues[prop] !== 'function') {
                dataValues[prop] = encrypt(dataValues[prop]);
            }
        }
        const disociatedLead = {
            id_enc: dataValues.id,
            campana_enc: dataValues.campana,
            cod_proveedor_enc: dataValues.cod_proveedor,
            fecha_captacion_enc: dataValues.fecha_captacion,
            nombre_enc: dataValues.nombre,
            ape1_enc: dataValues.ape1,
            ape2_enc: dataValues.ape2,
            nif_enc: dataValues.nif,
            telefono_enc: dataValues.telefono,
            email_enc: dataValues.email,
            direccion_enc: dataValues.direccion,
            codigo_postal_enc: dataValues.codigo_postal,
            poblacion_enc: dataValues.poblacion,
            provincia_enc: dataValues.provincia,
            acepta1_enc: dataValues.acepta1,
            acepta2_enc: dataValues.acepta2,
            acepta3_enc: dataValues.acepta3,
            num1_enc: dataValues.num1,
            num2_enc: dataValues.num2,
            num3_enc: dataValues.num3,
            dual1_enc: dataValues.dual1,
            dual2_enc: dataValues.dual2,
            dual3_enc: dataValues.dual3,
            variable1_enc: dataValues.variable1,
            variable2_enc: dataValues.variable2,
            variable3_enc: dataValues.variable3,
            memo_enc: dataValues.memo,
            fecha_enc: dataValues.fecha,
            hora_enc: dataValues.hora,
            foto1_enc: dataValues.foto1,
            foto2_enc: dataValues.foto2,
            comercial_enc: dataValues.comercial,
            centro_enc: dataValues.centro,
            //createdAt: dataValues.createdAt,
            //updatedAt: dataValues.updatedAt,
            ident_ori: dataValues.ident
        };
        const response = await Ws_Leads_Disociados.create(disociatedLead);
        if (response.dataValues.createdAt !== null) {
            //console.log("PREV ID: ",leadToDisociate._previousDataValues.ident);
            const deleted = await Ws_Leads.destroy({
                where: {
                    ident: leadToDisociate._previousDataValues.ident
                }
            });
            if (deleted > 0)
                console.log("Se elimino correctamente el lead!!");
        }
        /// SI ES NULL NO SE BORRA EL REGISTRO DEL LEAD Y PUEDES LOGEAR LOS ERRORES Y DISOCIAR DE AQUI EN ADELANTE

    } catch (error) {
        console.error(error.message);
    }

};

const getEncryptedLeads = async (secretkey) => {
    //console.log(secretkey);
    try {
        const data = await Ws_Leads_Disociados.findAll();
        const values = data.map(dat => dat.dataValues);
        const decrypted = values.map(val => {
            for (const prop in val) {
                //console.log("el prop es: ",prop);
                if (val.hasOwnProperty(prop) && typeof val[prop] !== 'function' && prop !== "ident" && prop !== "createdAt" && prop !== "updatedAt") {
                    if (decrypt(val[prop], secretkey) !== false)
                        val[prop] = decrypt(val[prop], secretkey);

                }
            }
        });
        //return decrypted;
        return data;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    postDisociarLead,
    getEncryptedLeads
};