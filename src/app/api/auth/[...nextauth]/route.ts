import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next"
import {cookies} from 'next/headers'
const instanceAxios = axios.create({
    baseURL: 'https://authmodule.localfix.mx',
    //baseURL: 'http://localhost:3000',
    withCredentials: true
})

const auth =  NextAuth( {
        providers: [

            CredentialsProvider({
                type: 'credentials',
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    try {
                        const { email, password } = credentials as { email: "", password: "" }
                        console.log("Email: "+email +" Password: "+password)

                        const response = await instanceAxios.post('/api/authenticate', {
                            email,
                            passkey: password
                        })
                        const responseUserInfo = response.data.data
                        const user = { 
                            id: "1", 
                            name: String(responseUserInfo.nombre), 
                            email: String(responseUserInfo.email),
                            token: String(responseUserInfo.token)
                        }
                        cookies().set({
                            name: "token",
                            value: responseUserInfo.token,
                            httpOnly: true,
                            sameSite: "lax"
                        })

                        return user
                    } catch (error) {
                        return null
                    }
                }
            })
        ],
        pages: {
            signIn: '/login'
        },
        callbacks:{
            async jwt({token, user, account, profile}){
                //console.log("Token: "+JSON.stringify(token))
                //console.log("User: "+JSON.stringify(user))
                //console.log("Account "+JSON.stringify(account)+ " profile "+profile)
                return token
            },
            async session({session, user, token}){
                //console.log("Session: "+JSON.stringify(session))
                //console.log("Session User: "+JSON.stringify(user))
                //console.log("Session Token "+JSON.stringify(token))
                
                return session
            }
        }
    })


export { auth as GET, auth as POST }