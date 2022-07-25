import React, { useState } from 'react';
import Image from 'next/image'
import FormConnexion from '../../components/authentification/formConnexion.js'
import FormInscription from '../../components/authentification/formInscription'
const connexion = () => {
    const [connexionInscription, setConnexionInscription] = useState("CONNEXION")
    return (

        <div className='flex flex-col min-h-screen justify-center items-center'>
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

                <div class="mt-3">

                    {connexionInscription == "CONNEXION" ? <>
                        <FormConnexion />
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

export default connexion;