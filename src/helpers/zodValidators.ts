import z from 'zod'

export const userZodSchema = z.object
(
    {
        firstName: z.string({required_error:'firstName is required',invalid_type_error:'firstName must be a string'}),
        lastName:z.string({required_error:'lastName is required',invalid_type_error:'lastName must be a string'}),
        email:z.string({required_error:'email is required'}).email({message:'email must be like email@email.com'}),
        password:z.string({required_error:'password is required',invalid_type_error:'password must be a string'}),
        age:z.number({required_error:'age is required',invalid_type_error:'age must be a number'}),
    }
);

export const loginValidation = z.object
(
    {
        email:z.string({required_error:'email is required'}).email({message:'email must be like email@email.com'}),
        password:z.string({required_error:'password is required',invalid_type_error:'password must be a string'}),
    }
);