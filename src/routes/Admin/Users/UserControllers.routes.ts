import express, {Request, Response} from 'express'
import { admin_auth } from '../../middlewares/admin_auth.routes'
import { create_new_user_admin } from './create_new_user_admin'
import { compare_passwords } from './encode_decode_credencials'
import { select_all_users_admin } from './select_all_users_admin'
import { select_one_user } from './select_one_user_admin'
const router_user = express.Router()

interface IData {
  title_page: string
  data_users?: object
}

router_user.get('/',admin_auth, async (req: Request, res:Response) => {
  const data: IData = {
    title_page: 'BlogTecnor-List all users admin'
  }
  const data_user = await select_all_users_admin()
  if(!data_user.err){
    data.data_users = data_user.data_users
    return res.render('Admin/Users/index_users', data)
  } else {
    return res.redirect('/')
  }
})

router_user.get('/create', admin_auth, async(req: Request, res:Response) => {
  const data: IData = {
    title_page: 'BlogTecnor-Create new user Admin'
  }
  return res.render('Admin/Users/users_create', data)
})

router_user.post('/create', admin_auth,async(req: Request, res:Response) => {
  const email = req.body.email_admin.trim()
  const password = req.body.password_admin.trim()
  const result_search_email = await select_one_user(email)
  if(!result_search_email.data_user ){
    const result_create = await create_new_user_admin(email, password)
    if(!result_create.err){
      return res.redirect('/admin/users')
    } else {
      return res.redirect('/')
    }
  } else {
    res.redirect('/admin/users/create')
  }
})

router_user.get('/login', async (req:Request, res:Response) => {
  const data: IData = {
    title_page:'BlogTecnor-Login in'
  }
  res.render("Admin/Users/users_login", data)
})

router_user.post('/authenticate', async (req:Request, res:Response) => {
  const email = req.body.email_admin.trim()
  const password = req.body.password_admin.trim()
  const result_find_login = await select_one_user(email)
  if(!result_find_login.err) {
    const password_database = result_find_login.data_user?.getDataValue('password')
    const email_database = result_find_login.data_user?.getDataValue('email')
    const id_database = result_find_login.data_user?.getDataValue('id')
    if(compare_passwords(password_database,password)){ 
      //@ts-ignore
      req.session.user = {
        id: id_database,
        email: email_database
      }
      res.redirect('/admin/articles')
    } else {
      res.send('/admin/users/login')
    }
  } else {
    res.redirect('/admin/users/login')
  }
})

router_user.get('/logout',admin_auth, (req:Request, res:Response) => {
  //@ts-ignore
  req.session.user = undefined
  res.redirect('/')
})
export {router_user}