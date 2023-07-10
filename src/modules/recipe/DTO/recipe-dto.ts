
interface RecipeDTO{
    id?:string
    title:string
    description:string
    avatar:string | undefined
    time:string
    difficulty:number
    category_id:string
    user_id:string
}

export {RecipeDTO}