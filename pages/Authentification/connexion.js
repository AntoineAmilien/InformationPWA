import React, { useState } from 'react';
import Image from 'next/image'
import FormConnexion from '../../components/authentification/formConnexion.js'
import FormInscription from '../../components/authentification/formInscription'
import { useRouter } from "next/router";
import { getSession } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import InstallPWA from '../../components/InstallPWA.js';

const errors = {
    Signin: "Essayez de vous connecter avec un autre compte.",
    OAuthSignin: "Essayez de vous connecter avec un autre compte.",
    OAuthCallback: "Essayez de vous connecter avec un autre compte.",
    OAuthCreateAccount: "Essayez de vous connecter avec un autre compte.",
    EmailCreateAccount: "Essayez de vous connecter avec un autre compte.",
    Callback: "Essayez de vous connecter avec un autre compte.",
    OAuthAccountNotLinked:
        "Pour confirmer votre identité, connectez-vous avec le même compte que vous avez utilisé à l'origine.",
    EmailSignin: "Vérifiez votre adresse e-mail.",
    CredentialsSignin:
        "La connexion a échoué. Vérifiez que les détails que vous avez fournis sont corrects.",
    SessionRequired: "Le contenu de cette page nécessite que vous soyez connecté",
    default: "Une erreur c'est produite.",
};

const connexion = () => {

    const { error } = useRouter().query;
    const errorMessage = error && (errors[error] ?? errors.default);

    const [connexionInscription, setConnexionInscription] = useState("CONNEXION")

    return (

        <div className='flex flex-col min-h-screen justify-center items-center p-4'>

            <div class="p-5 w-96 bg-white rounded-xl drop-shadow-xl">
                <div className=' w-full flex justify-center'>
                    <Image
                        src="/nxo-fayat.png"
                        alt="Picture of the author"
                        width={230}
                        height={100}
                    />
                </div>

                <h2 class="text-3xl font-semibold text-neutral-600 text-left mt-4">Centre de notifications <br /> Bienvenue !</h2>
                <InstallPWA message="Installer la version mobile" sytleClass="btn-primary btn-link text-left pt-4" />

                <div class="">

                    {connexionInscription == "CONNEXION" ? <>
                        <FormConnexion erreurMessage={errorMessage} />
                        <p className="font-medium text-red-500"> {errorMessage} </p>
                        <div class="relative my-4">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 text-neutral-600 bg-white"> Pas encore inscrit ? </span>
                            </div>
                        </div>

                        <div>
                            <button onClick={() => setConnexionInscription("INSCRIPTION")} class="btn btn-primary btn-link w-full">Inscription</button>
                        </div>
                    </> : <>
                        <FormInscription />
                        <div class="relative my-4">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 text-neutral-600 bg-white"> Déja inscrit ? </span>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setConnexionInscription("CONNEXION")} class="btn btn-primary btn-link w-full">Je me connecte</button>
                        </div></>}
                </div>
            </div>
        </div>



    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {
                csrfToken: await getCsrfToken(context),
            },
        };
    }

    return {
        props: {},
    };
}

export default connexion;