import express, {Request, Response} from 'express'
import { admin_auth } from '../../middlewares/admin_auth.routes'
import { create_typerole } from "./create_type_role"
import { delete_typerole } from './delete_type_role'
import { get_all_typeroles } from './get_roles'
const route_type_role = express.Router()

interface IData {
  title_page: string
  data_users?: object
}

route_type_role.post('/create', async (req: Request, res: Response) => {
  const newRole = {
      name: req.body.role_name,
      roles: {
          delete_user: req.body.delete_user === 'on',
          update_user: req.body.update_user === 'on',
          delete_article: req.body.delete_article === 'on'
      }
  };

  const result_create_role = await create_typerole(newRole); 

  if (result_create_role) {
      return res.redirect('/admin/typeroles');
  } else {
      return res.redirect('/admin/typeroles');
  }
});

route_type_role.post('/delete', async (req: Request, res:Response) => {
  const result_create_role = await delete_typerole(req.body.id)
  if(result_create_role){
      return res.redirect('/admin/typeroles')
  } else {
      return res.redirect('/')
  }
})


route_type_role.get('/', async (req:Request, res:Response) => {
    const datDb = get_all_typeroles()
    const data = {
        title_page: "TypeRoles",
        roles: await datDb
    }
    res.render("Admin/Roles/index_roles", data)
})

route_type_role.get('/create', async (req:Request, res:Response) => {
  const data: IData = {
    title_page: 'BlogTecnor - Create new Role',
  }
  res.render("Admin/Roles/role_create", data)
})

export {route_type_role}