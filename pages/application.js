import React from 'react';
import Layout from '../components/layout';
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";

const Application = (props) => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    return (
        <div>
            {JSON.stringify(session)}
            page choix des app
        </div>
    );
};

Application.getLayout = function getLayout(page) {
    return (
        <Layout titlePage="Applications demandées">
            {page}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session?.user) {
        return {
            props: {
                session: session,
            },
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/Authentification/connexion",
            },
            props: {}
        };
    }
}

export default Application;