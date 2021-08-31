import express from 'express'
import { router_admin } from './Admin/index_admin.routes'
import { router_static_media } from './middlewares/static_media.routes'
import { router_root } from './Root/RootCrontroller.routes'
import config_sessionRoutes from './middlewares/config_session.routes'
const routers = express.Router()

routers.use(config_sessionRoutes.config)
routers.use('/', router_root)
routers.use('/public' ,router_static_media)
routers.use('/admin', router_admin)
export {routers}