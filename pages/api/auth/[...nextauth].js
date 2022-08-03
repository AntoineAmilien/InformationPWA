import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export default NextAuth({
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "username-login",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {

                    if (credentials == null) return null;

                    const dataPourApiConnexionStrapi = {
                        "identifier": credentials.email,
                        "password": credentials.password
                    }

                    const { jwt } = await axios.post('http://localhost:1337/api/auth/local', dataPourApiConnexionStrapi).then(async res => {
                        return res.data
                    })


                    const userPopulate = await axios.get('http://localhost:1337/api/users/me?populate=*', {
                        headers: {
                            'Authorization': 'Bearer ' + jwt
                        }
                    }).then(async res => {
                        return res.data
                    })

                    return { ...userPopulate, jwt };
                } catch (error) {
                    console.error("Une erreur c'est produite pendant la connexion : " + JSON.stringify(error))
                    return null
                }

            }
        })

    ],
    pages: {
        signIn: '/Authentification/connexion',
        newUser: '/Authentification/inscription',//je sai spa ssi je dois faire ca ou pas ,
        signout: '/Authentification/connexion',
        verifyRequest: '/Authentification/verify-request', // (used for check email message)
        error: '/Authentification/connexion', // Error code passed in query string as ?error=
    }

})
