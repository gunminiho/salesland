const { Ws_Leads } = require("../db_connection");

const fechaCaptacionRegex = /^\d{8} \d{2}:\d{2}$/; //Esta expresión regular asegura que la fecha tenga 8 dígitos (año, mes y día) seguidos de un espacio, y luego la hora y los minutos en formato "hh:mm"
const telefonoRegex = /^[6-9]\d{8}$/; // Esta expresión regular verifica que el número comience con un dígito de 6 a 9 y luego tenga exactamente 8 dígitos adicionales
const maxCharRegex = /^[A-Za-z0-9ñÑ]{1,50}$/; //Esta expresión regular asegura que el "id" contenga caracteres alfanuméricos (letras mayúsculas y minúsculas, así como dígitos) y que tenga entre 1 y 50 caracteres de longitud. 
const yonRegex = /^(SI|NO)$/; // Yes or No regex, verifica que solo pueda ser SI o NO.
const cod_proveedorRegex = /^.{1,5}$/; // 5 caracteres como maximo

const postLead = async (id, campana, cod_proveedor, fecha_captacion, nombre, ape1, ape2, nif,
    telefono, email, direccion, codigo_postal, poblacion, provincia, acepta1, acepta2,
    acepta3, num1, num2, num3, dual1, dual2, dual3, variable1, variable2, variable3, memo, fecha,
    hora, foto1, foto2, comercial, centro) => {

    const errors = [];

    // verificando que se cumplan las condiciones de los datos antes de inyectarlos a la db, si no corta para mostrar errores
    if (!id || !maxCharRegex.test(id))
        errors.push("id incorrecto");
    if (!campana || isNaN(campana))
        errors.push("campana incorrecto");
    if (cod_proveedor === null || cod_proveedorRegex.test(cod_proveedor) === false)
        errors.push("cod_proveedor incorrecto");
    if (!fecha_captacion || !fechaCaptacionRegex.test(fecha_captacion))
        errors.push("fecha_captacion incorrecto (yyyyMMdd hh:mm)");
    if (!nombre || !maxCharRegex.test(nombre))
        errors.push("nombre incorrecto");
    if (!telefono || !telefonoRegex.test(telefono))
        errors.push("telefono incorrecto");
    if (!acepta1 || !yonRegex.test(acepta1))
        errors.push("acepta1 incorrecto");
    if (!comercial || !maxCharRegex.test(comercial))
        errors.push("comercial incorrecto");
    if (typeof memo !== "object" || !Object.hasOwn(memo, 'idoportunidad'))
        errors.push("no existe la propiedad idoportunidad en el objeto memo");
    if (errors.length > 0)
        return errors;
    try {
        const duplicated = await Ws_Leads.findOne({
            where: {
                telefono
            }
        });
        const response = await Ws_Leads.create({
            id,
            campana,
            cod_proveedor,
            fecha_captacion,
            nombre,
            ape1,
            ape2,
            nif,
            telefono,
            email,
            direccion,
            codigo_postal,
            poblacion,
            provincia,
            acepta1,
            acepta2,
            acepta3,
            num1,
            num2,
            num3,
            dual1,
            dual2,
            dual3,
            variable1,
            variable2,
            variable3,
            memo,
            fecha,
            hora,
            foto1,
            foto2,
            comercial,
            centro
        });
        if (response)
            return duplicated === null ? { OK: "OK", lead_id: response.ident } : { OK: "OK: telefono duplicado", lead_id: response.ident };
        else
            return false;
    } catch (error) {
        console.error(error.message);
        return new Error(error);
    }
};

const getLeads = async () => {

    try {
        const response = await Ws_Leads.findAll();
        //console.log("getLeads response:", response.map(res => res.dataValues));
        if (response)
            return response.map(res => res.dataValues);
    } catch (error) {
        console.log(error.message);
        return new Error(error);
    }
};


module.exports = {
    postLead,
    getLeads
};