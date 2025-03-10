"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";


// ...



export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {

  

  try {
   
     // Espera a la función signIn
     await signIn("credentials", {
      // Convierte el formData a un objeto
      ...Object.fromEntries(formData),
      // Redirige después de iniciar sesión
      redirect: true,
      // URL de redirección
      redirectTo: "/?auth=true",
      
    });
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}


export const login = async (email:string,password:string) => {

  try {

    await signIn("credentials",{email,password , redirect:false})
    
    return {ok:true}
   
  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message:"No se pudo"
    }
    
  }

}
