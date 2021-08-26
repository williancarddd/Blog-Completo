import { Categorie } from "./Categorie";

interface ISelectOneCategorie {
  error: boolean,
  name ?:  string,
  result_one_categorie?: any
}

export async function select_one_categorie(id_categorie: number): Promise<ISelectOneCategorie> {
  try {
    const result_one  =  await Categorie.findOne({
      where:{id: id_categorie}
    })
    return { error: false, result_one_categorie: result_one}
  } catch (Err) {
    return {error: true, name: Err.name}
  }
}