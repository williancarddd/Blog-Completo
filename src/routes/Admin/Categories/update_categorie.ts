import { Categorie } from "./Categorie";
import slugify from 'slugify'
import formatTitle  from '@directus/format-title'
interface IUpdateCategorie {
  name?: string,
  error: boolean
}

export async function update_categorie(id_categorie:any, title_categorie: string): Promise<IUpdateCategorie> {
  try {
    await Categorie.update({
      title: formatTitle(title_categorie.replace(/[%&*$@\|/^~´`()]/g, '')),
      slug: slugify(title_categorie, '_')
    },
    {where: {id:id_categorie}})
    return {error: false}
  } catch (err) {
     return {error: true, name:err.name}
  }
}