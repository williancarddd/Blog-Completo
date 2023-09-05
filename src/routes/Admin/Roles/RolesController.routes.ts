import express, {Request, Response} from 'express'
import { admin_auth } from '../../middlewares/admin_auth.routes'
import {create_role} from "./create_role"
const route_roles = express.Router()

interface IData {
  title_page: string
  data_users?: object
}

route_roles.post('/create', admin_auth, async (req: Request, res:Response) => {
    const newRole = {
        delete_user: req.body.delete_user,
        delete_article: req.body.delete_article,
        delete_category: req.body.delete_category,
        update_user: req.body.update_user,
        update_article: req.body.update_article,
        update_category: req.body.update_category,
        create_user: req.body.create_user,
        create_article: req.body.create_article,
        create_category: req.body.create_category,
        read_user: req.body.read_user,
        read_article: req.body.read_article,
        read_category: req.body.read_category,
    }
    const result_create_role = await create_role(newRole)
    if(result_create_role){
        return res.redirect('/admin/roles')
    } else {
        return res.redirect('/')
    }
})


route_roles.get('/', async (req:Request, res:Response) => {
    const data: IData = {
      title_page:'Roles For Users'
    }
    res.render("Admin/Roles/role_create", data)
})


export {route_roles}