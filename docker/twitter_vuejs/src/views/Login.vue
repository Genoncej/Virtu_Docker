<script setup>
import axios from 'axios';
import {ref} from 'vue';
import router from '../router';
import { utilisateur } from '../stores/utilisateur.js'

// for the connection and to check if the mdp is the same as the one in the user
let mdp = ref("");
let email = ref("");

async function Login(){
    axios.get(`http://localhost:3000/t_e_utilisateur_utl?utl_mail=eq.${email.value}`)
    .then(function (response) {
        if(response.data[0]["utl_motdepasse"] == mdp.value){
            utilisateur().login(response.data);
      }
    })

}

</script>

<template>
<div>
    <header class="p-6 bg-slate-200">
      <div class="font-bold text-4xl text-center">Cerulean Warbler</div> 
    </header>

    <!-- return button -->
    <div class="absolute z-index-9999 top-6 left-4">
          <button class="btn btn-circle btn-outline btn-sm">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> 
            </a>
          </button>
    </div>

    <!-- hero for login -->
    <div class="hero h-[90vh] bg-slate-300">
        <div class="hero-content flex-col lg:flex-col">
            <div class="text-center">
                <h1 class="text-4xl font-bold">Se connecter à CWarbler</h1>
            </div>
            <div class="card max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="text-lg">Email</span>
                        </label>
                        <input type="email" placeholder="email" v-model="email" class="input input-bordered" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="text-lg">Mot de passe</span>
                        </label>
                        <input type="password" placeholder="Mot de passe" v-model="mdp" class="input input-bordered" />
                    </div>
                    <div class="form-control mt-6 divide-y divide-black">
                        <button @click="Login()" class="btn btn-accent mb-4">Login</button>
                        <div class="text-center pt-2 hover:text-blue-500 "> <a href="/create">Create an account</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>