import React from 'react';

const formInscription = () => {
    return (
        <div>
            <form action="#" method="POST" class="space-y-4">

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Email" class="input input-bordered w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Mot de passe</span>
                    </label>
                    <input type="password" placeholder="Mot de passe" class="input input-bordered w-full" />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Confirmation - Mot de passe</span>
                    </label>
                    <input type="password" placeholder="Mot de passe" class="input input-bordered w-full" />
                </div>


                <button class="btn btn-primary w-full">Inscription</button>
            </form>
        </div>
    );
};

export default formInscription;