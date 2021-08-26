import { Categorie } from "./Categorie";

interface IDeleteCategorie {
  name?: String
  error: Boolean
}

export async function delete_categorie(id_categorie:number):Promise<IDeleteCategorie> {
  try {
    await  Categorie.destroy({
      where:{id: id_categorie}
    })
    return {error: false}
  } catch(Err) {
    return {error: true, name: Err.name}
  }
}