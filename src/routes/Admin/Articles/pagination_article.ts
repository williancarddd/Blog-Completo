import { Model } from "sequelize/types";
import { Article } from "./Article";

interface IPaginationArticle {
  error: boolean
  name?: string
  data_article?: { rows: Model<any, any>[]; count: number; }
}
export async function pagination_article(limit: number, offsetF?: number): Promise<IPaginationArticle> {
  try {
    const data_art  = await Article.findAndCountAll({
      limit: limit,
      offset: offsetF,
      order: [
        ['id', 'desc']
      ]
    })

    return {error: false, data_article: data_art}
  } catch (err) {
    return {error: true, name: err.name}
  }
}