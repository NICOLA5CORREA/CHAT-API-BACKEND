const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const userRoutes = require('../modules/user/user.routes');
const conversationRoutes = require('../modules/conversations/conversations.routes');
const messageRoutes= require('../modules/messages/messages.routes');

const apiv1Routes = (app) => {
    app.use('/api/v1/users', userRoutes)
    app.use('/api/v1/conversations', conversationRoutes)
    app.use('/api/v1/messages', messageRoutes)
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)) // => vizualizar documentacion (http://localhost:3500/api/v1/docs/)
}

module.exports = apiv1Routes