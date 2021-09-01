import {Request, Response} from 'express'

export function admin_auth(req: Request, res:Response, next: () => void){
  //@ts-ignore
  if(req.session.user != undefined ){
    next()
  }  else {
    res.redirect('/admin/users/login')
  }
}