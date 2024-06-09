import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google";
import UserModel from "@/models/user-model";
import { compare } from "bcryptjs";
import dbConnect from "./db/dbConfig";
import { signInSchema } from "./zod/userSchema";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProviders({

    }),
    
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      authorize: async (credentials) => {

        const { email, password } = await signInSchema.parseAsync(credentials);

        if (!email || !password) {
          throw new Error("error");
        };

        await dbConnect();

        const user = await UserModel.findOne({email}).select("+password");

        if(!user) {
          throw new Error('Eroor');
        };

        if(!user.password) {
          throw new Error('Error');
        }

        const isMatch = await compare(password, user.password);

        if(!isMatch) {
          throw new Error("Bad credentials");
        };
        
        return user;
      }
    })
  ],
  pages: {
    signIn: '/',
  }
})