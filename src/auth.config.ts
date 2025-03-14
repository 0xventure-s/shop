/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        //Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        //Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        //Regresar el usuario

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password:_, ...rest} = user

        console.log({rest})

        return rest; //este seria el usuario

      },
    }),
  ],
  callbacks:{
    jwt({token,user}) {
      if(user) {
        token.data = user;
      }
      return token
    },
    session({session,token}) {
      console.log({token,session})
      session.user = token.data as any;
      return session
    }
  },
  session: {
    maxAge: 24 * 60 * 60, // 1 día en segundos
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
});
