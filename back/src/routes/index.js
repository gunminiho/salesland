const { Router } = require("express");
const router = Router();
const wsLeadRouter = require("./wsLeadRouter");
const wsLeadHandler = require("../handlers/wsLeadsHandler");

router.use(wsLeadRouter);
//router.get("/alta", wsLeadHandler.getAltaLead);
//router.post("/alta", wsLeadHandler.postAltaLead);

module.exports = router;