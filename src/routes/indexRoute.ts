import { Router } from 'express';
import {
  postCreateUser,
  putUpdateUsername,
  updateEndDate,
  updateStartDate,
} from '../controllers/userController';
import { tryCatch } from '../lib/tryCatch';
import { addWaldoImage } from '../controllers/imageController';
import passport from 'passport';
const router = Router();

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

router.post('/user', tryCatch(postCreateUser));
router.post('/image', tryCatch(addWaldoImage));

router.put(
  '/user/startDate',
  passport.authenticate('jwt', { session: false }),
  tryCatch(updateStartDate),
);
router.put(
  '/user/endDate',
  passport.authenticate('jwt', { session: false }),
  tryCatch(updateEndDate),
);
router.put(
  '/user/username',
  passport.authenticate('jwt', { session: false }),
  putUpdateUsername,
);

export default router;
