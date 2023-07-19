import { Field, ObjectType, InputType } from "type-graphql"
import { Length, IsEmail } from "class-validator"

@ObjectType()
export class User {
  @Field()
  id!: number

  @Field()
  @Length(1, 255)
  name!: string

  @Field()
  @IsEmail() 
  email!: string
}

@InputType()
export class UserInput implements Pick<User, "name" | "email"> {
  @Field()
  @Length(1, 255)
  name!: string

  @Field()
  @IsEmail() 
  email!: string
}