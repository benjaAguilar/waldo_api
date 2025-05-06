"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const tryCatch_1 = require("../lib/tryCatch");
const imageController_1 = require("../controllers/imageController");
const passport_1 = __importDefault(require("passport"));
const leaderboardController_1 = require("../controllers/leaderboardController");
const router = (0, express_1.Router)();
/*
  >> Al hacer play crear el usuario y enviar la cookie al navegador con la data de la imagen.
          > crear usuario y enviar la cookie al navegador
          > asociar usuario con imagen y leaderboard elegidos
          > enviar datos de la imagen

  >> Desde el front enviar la fecha de inicio cuando la imagen se cargo.
          > guardar fecha en la base de datos

  >> Desde el front se envia la fecha de finalizacion cuando se encontro a waldo.
          > guardar fecha de finalizacion
          > realizar calculo para obtener el tiempo en milisegundos
          > enviar respuesta al front y esperar el nombre de retorno
          > los datos se asociaran a la leaderboard
*/
router.post('/user', (0, tryCatch_1.tryCatch)(userController_1.postCreateUser));
router.post('/image', (0, tryCatch_1.tryCatch)(imageController_1.addWaldoImage));
router.get('/image', (0, tryCatch_1.tryCatch)(imageController_1.getAllImages));
router.put('/user/startDate', passport_1.default.authenticate('jwt', { session: false }), (0, tryCatch_1.tryCatch)(userController_1.updateStartDate));
router.put('/user/endDate', passport_1.default.authenticate('jwt', { session: false }), (0, tryCatch_1.tryCatch)(userController_1.updateEndDate));
router.put('/user/username', passport_1.default.authenticate('jwt', { session: false }), userController_1.putUpdateUsername);
router.get('/leaderboard/:id', (0, tryCatch_1.tryCatch)(leaderboardController_1.getLeaderboard));
// >> AGREGAR UN LIMPIADOR DE DATOS PERDIDOS QUE FUNCIONE POR DIA
exports.default = router;
