const {Router} = require('express');
const {createConversation, createGroupConversation, getAllConversations}= require('./conversations.controllers');

const router = Router();

// CREAR CONVERSACIONES
router.post('/', createConversation);
//CREAR CONVERSACIONES GRUPALES
router.post('/group', createGroupConversation)
//OBTENER TODAS LAS CONVERSACIONES
router.get("/:id", getAllConversations);
//OBTENER UNA CONVERSACION CON TODOS LOS MENSAJES



module.exports = router;
