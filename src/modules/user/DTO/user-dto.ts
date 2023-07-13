interface UserDTO {
  id?:string
  name: string
  email: string
  password?: string
  avatar?:string
}

interface UserAuthGoogle{
  name:string
  email:string
  picture:string
}

export { UserDTO, UserAuthGoogle }
