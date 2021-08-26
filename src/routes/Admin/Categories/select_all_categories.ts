import { Model } from "sequelize/types";
import { Categorie } from "./Categorie";

interface ISelectCategorie {
  name?: string,
  error: boolean,
  result_data?: Model<any, any>[]
}

export async function select_all_categorie():Promise<ISelectCategorie> {
  try{
    const result_search = await Categorie.findAll()
    return {error: false, result_data: result_search}
  } catch(Err) {
    return {error: true, name: Err.name}
  }
}