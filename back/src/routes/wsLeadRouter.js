const { Router } = require("express");
const router = Router();
const wsLeadHandler = require("../handlers/wsLeadsHandler");

router.get("/wsSALESLAND_LEADS/AltaLead", wsLeadHandler.getAltaLead);
router.post("/wsSALESLAND_LEADS/AltaLead", wsLeadHandler.postAltaLead);
router.get("/wsSALESLAND_LEADS/DisociadosLead/:secretkey", wsLeadHandler.disociadoLead);

module.exports = router;