const { Router } = require("express");
const service_nhk = require("../services/NHK_service.js");
const router = Router();
const NHK_service = new service_nhk.NHK_service();

router.get(`/frases/nhk/:word`, async (req, res) => {
    /* const palabra = req.params.word;
    if (!NHK_service.getFrasesNHK(palabra)) res.sendStatus(400);
    res.status(200).json(); */
    console.log("holi");
  });
