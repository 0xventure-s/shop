"use server"

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export const registerUser = async (name: string,email: string,password: string) => {
  if (!name || !email || !password) {
    console.log("Datos inválidos");
    return {
      ok: false,
      message: "Los datos no pueden estar vacíos",
    };
  }

  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLocaleLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any)  {
    // En lugar de loguear el objeto error completo, podrías loguear solo el mensaje y stack.
    console.error("Error en registerUser:", error.message);
    console.error(error.stack);
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
