import multer from "multer";
import { uuid } from "uuidv4";

export const multer_define:multer.Multer = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/thumbnails' )
    },
    filename: (req, file, cb) => {
      const code_for_uniq_img = uuid() +'---'+new Date().toLocaleDateString().replace(/[/]/g, '-')+'---' + req.body.title_article
      const new_name = code_for_uniq_img + '-' + file.originalname.split(' ').join('_')
      cb(null, new_name)
    }
  }),
  fileFilter: (req, file, cb)=>{
    const extension_img = ['image/png', 'image/jpg', 'image/jpeg','image/gif'].find(
      (format_accept =>  format_accept === file.mimetype)
    )
    if(extension_img) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})