import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next"

const instanceAxios = axios.create({
    baseURL: 'https://authmodule.localfix.mx',
    //baseURL: 'https://localhost:3000',
    withCredentials: true
})
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    return await NextAuth(req, res,{
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

                        console.log("email: " + email + " password: " + password)

                        var response = await instanceAxios.get('/api/user')
                        
                        console.log(response)
                        //var userInfo = await instanceAxios.get('/api/user')

                        //console.log("informacion usuario: " + userInfo)

                        const user = { id: '1', name: 'test', email: 'response@gmail.com' }

                        return user
                    } catch (error) {
                        console.log("Error trycatch " + error)
                        return null
                    }
                }
            })
        ],
        pages: {
            signIn: '/login'
        }
    })
}

export { handler as GET, handler as POST }