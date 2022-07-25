import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

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

                //search
                try {
                    const user = { id: 1, nom: "LeNom", prenom: "LePrenom", username: "LeUsername", email: "LeEmail@nxo.eu" }
                    return user;
                } catch (error) {
                    console.error("Une erreur c'est produite pendant le SEARCH sur le LDAP ou pendant l'analyse du role : " + JSON.stringify(error))
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
