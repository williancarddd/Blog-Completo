import { Categorie } from "./Categorie";
import slugify from 'slugify'
import formatTitle from '@directus/format-title'
interface ICreateCategorie {
  error: Boolean
  name?:String  
}

export async function create_new_categorie(title_categorie:string): Promise<ICreateCategorie> {
  try {
    if(title_categorie === '') {
     throw new Error('title empty.') 
    } else {
      await Categorie.create({
       title: formatTitle(title_categorie.replace(/[%&*$@\|/^~´`()]/g, '')),
       slug: slugify(title_categorie, '_')
     })
     return {error: false}
    }
  } catch (Err) {
    return {error: true, name: Err.name}
  }
}