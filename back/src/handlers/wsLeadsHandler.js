const { postLead, getLeads } = require("../controllers/wsLeadController");
const { postDisociarLead, getEncryptedLeads } = require("../controllers/wsLeadDisociarController");



const postAltaLead = async (req, res) => {
    const { id, campana, cod_proveedor, fecha_captacion, nombre, ape1, ape2, nif,
        telefono, email, direccion, codigo_postal, poblacion, provincia, acepta1, acepta2,
        acepta3, num1, num2, num3, dual1, dual2, dual3, variable1, variable2, variable3, memo, fecha,
        hora, foto1, foto2, comercial, centro } = req.body;  // destructurando todo el body

    if (id && campana && cod_proveedor && fecha_captacion && nombre && telefono && acepta1 && comercial && memo) // verificando que los campos obligatorios esten presentes en el body
        try {
            /// llamada al controlador para postear el Lead
            const response = await postLead(id, campana, cod_proveedor, fecha_captacion, nombre, ape1, ape2, nif,
                telefono, email, direccion, codigo_postal, poblacion, provincia, acepta1, acepta2,
                acepta3, num1, num2, num3, dual1, dual2, dual3, variable1, variable2, variable3, memo, fecha,
                hora, foto1, foto2, comercial, centro);
            if (typeof response.OK === "string") { // si es string 
                const result = response.OK.slice(0, 2);
                if (result === "OK") {
                    postDisociarLead(response.lead_id); // Llamada a copiar el registro en disociar
                    res.status(200).json({
                        CAMPANA: campana,
                        RESULTADO: response.OK,
                        TELEFONO: telefono
                    });
                }
            }
            else if (Array.isArray(response)) { // si es array y tiene elementos dentro
                res.status(500).json({
                    CAMPANA: campana,
                    RESULTADO: "KO: " + response.join(', '),
                    TELEFONO: telefono
                });
            }
            else if (typeof response === "boolean") { // si retorna false, significa que paso algo en el create del modelo
                res.status(400).json({
                    CAMPANA: campana,
                    RESULTADO: "KO: error en la creacion del Lead.Create",
                    TELEFONO: telefono
                });
            }
            else {
                console.error(response);
                res.status(500).json({  // Si llega aqui es porque hubo un error en el try catch del Create
                    CAMPANA: campana,
                    RESULTADO: response,
                    TELEFONO: telefono
                });
            }
        } catch (error) {
            res.status(500).json({  // hay un error en el try catch del Handler
                CAMPANA: campana,
                RESULTADO: `hay un error en el try catch del handler ${error.message}`,
                TELEFONO: telefono
            });
        }
    else
        res.status(400).json({
            CAMPANA: campana,
            RESULTADO: "algun campo obligatorio esta vacio, verifica y vuelve a intentar",
            TELEFONO: telefono
        });
};

const getAltaLead = async (req, res) => {
    try {
        const response = await getLeads();
        console.log("getAltaLead: ", response);
        if (response)
            res.status(200).json(response.dataValues);
        else
            res.status(404).send("error");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const disociadoLead = async (req, res) => {
    const { secretkey } = req.params;
    try {
        const response = await getEncryptedLeads(secretkey);
        if (!response)
            res.status(500).send("Error desencriptando los datos o no hay datos cargados...");
        else
            res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAltaLead,
    postAltaLead,
    disociadoLead
};