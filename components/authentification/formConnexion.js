import React, { useState } from 'react';
import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form';

const formConnexion = (props) => {
    const [errorMessage, setErrorMessage] = useState(props.errorMessage);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const soumissionFormulaire = (data) => {
        const dataPourApiConnexion = {
            email: data.Email,
            password: data.Password,
        }
        signIn("username-login", dataPourApiConnexion).catch((_error) => {
            setErrorMessage("Une erreur c'est produite.")
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(soumissionFormulaire)} class="space-y-4">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" {...register("Email", { required: true })} placeholder="Email" class="input input-bordered w-full" />
                    {errors.Email && <p className="text-red-500 font-light text-sm px-1">Email obligatoire.</p>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Mot de passe</span>
                    </label>
                    <input type="password" {...register("Password", { required: true })} placeholder="Mot de passe" class="input input-bordered w-full" />
                    {errors.Password && <p className="text-red-500 font-light text-sm px-1">Mot de passe obligatoire.</p>}
                </div>

                <p className="font-medium text-red-500"> {errorMessage} </p>

                <button class="btn btn-primary w-full">Connexion</button>

            </form>
        </div>
    );
};





export default formConnexion;