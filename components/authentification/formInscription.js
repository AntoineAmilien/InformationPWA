import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { signIn } from "next-auth/react"

const formInscription = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("")

    const soumissionFormulaire = (data) => {
        setErrorMessage("")
        try {
            if (data.MotDePasse != data.ConfirmationMotDePasse) {
                setErrorMessage("Le mot de passe et ca confirmation ne sont pas identique.")
                return;
            }

            const dataPourApiEnregistrement = {
                username: data.Username,
                nom: data.Nom,
                prenom: data.Prenom,
                societe: data.Societe,
                email: data.Email,
                password: data.MotDePasse,
            }

            //call de l'api register de strapi
            axios.post('http://localhost:1337/api/auth/local/register', dataPourApiEnregistrement).then(res => {
                if (res.data.user) {
                    const bodyConnexion = {
                        email: res.data.user.email,
                        password: dataPourApiEnregistrement.MotDePasse
                    }
                    signIn("username-login", bodyConnexion).catch((_error) => {
                        setErrorMessage("Une erreur c'est produite.")
                    })
                }
            })
                .catch(_error => {
                    setErrorMessage(_error.response.data.error.message)
                })

        } catch (_error) {
            setErrorMessage("Une erreur c'est produite")
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit(soumissionFormulaire)} class="space-y-4">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Nom *:</span>
                    </label>
                    <input type="text" {...register("Nom", { required: true })} placeholder="Nom" class="input input-bordered w-full" />
                    {errors.Nom && <p className="text-red-500 font-light text-sm px-1">Nom obligatoire</p>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Prenom *:</span>
                    </label>
                    <input type="text" {...register("Prenom", { required: true })} placeholder="Prenom" class="input input-bordered w-full" />
                    {errors.Prenom && <p className="text-red-500 font-light text-sm px-1">Prenom obligatoire</p>}
                </div>


                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Username *:</span>
                    </label>
                    <input type="text" {...register("Username", { required: true })} placeholder="Username" class="input input-bordered w-full" />
                    {errors.Username && <p className="text-red-500 font-light text-sm px-1">Username obligatoire</p>}
                </div>


                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Societe *:</span>
                    </label>
                    <input type="text" {...register("Societe", { required: true })} placeholder="Societe" class="input input-bordered w-full" />
                    {errors.Societe && <p className="text-red-500 font-light text-sm px-1">Societe obligatoire</p>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="email" {...register("Email", { required: true })} placeholder="Email" class="input input-bordered w-full" />
                    {errors.Email && <p className="text-red-500 font-light text-sm px-1">Email obligatoire</p>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Mot de passe</span>
                    </label>
                    <input type="password" {...register("MotDePasse", { required: true })} placeholder="Mot de passe" class="input input-bordered w-full" />
                    {errors.MotDePasse && <p className="text-red-500 font-light text-sm px-1">Mot de passe obligatoire</p>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Confirmation du mot de passe</span>
                    </label>
                    <input type="password" {...register("ConfirmationMotDePasse", { required: true })} placeholder="Confirmation du mot de passe" class="input input-bordered w-full" />
                    {errors.ConfirmationMotDePasse && <p className="text-red-500 font-light text-sm px-1">Confirmation du mot de passe obligatoire</p>}
                </div>

                <p className="text-red-500 font-light text-sm px-1">{errorMessage}</p>

                <input type="submit" value="S'inscrire" class="btn btn-primary w-full" />
            </form>
        </div>
    );
};

export default formInscription;