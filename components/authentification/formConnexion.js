import React, { useState } from 'react';
import { signIn } from "next-auth/react"




const formConnexion = (props) => {

    const { errorMessage } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (email == "")
            // "username-login" matches the id for the credential
            signIn("username-login", { email, password });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} class="space-y-4">

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" class="input input-bordered w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Mot de passe</span>
                    </label>
                    <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mot de passe" class="input input-bordered w-full" />
                </div>

                <p className="font-medium text-red-500"> {errorMessage} </p>

                <button class="btn btn-primary w-full">Connexion</button>

            </form>
        </div>
    );
};





export default formConnexion;