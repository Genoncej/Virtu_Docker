<script setup>
import {ref} from 'vue';
import axios from 'axios';
import { utilisateur } from '../stores/utilisateur.js'



let surname = ref("");
let name = ref("");
let alias = ref("");
let mail = ref("")
let password = ref("")
let desc = ref("")

function PostAccount(){
    let inputs = document.querySelectorAll("input")
    if(password.value == "" || mail.value == "" || alias.value == ""){
        console.log("erreur")
    }
    else{
        let user = [{
            utl_pseudo: `${alias.value}`,
            utl_nom: `${surname.value}`,
            utl_prenom: `${name.value}`,
            utl_mail: `${mail.value}`,
            utl_motdepasse: `${password.value}`,
            utl_description: `${desc.value}`
        }]
        // console.log(test)
        // console.log(test[0]["utl_pseudo"])
        // utilisateur().login(test)    



        axios.post(`http://localhost:3000/t_e_utilisateur_utl`, user).then(response => {
            axios.get(`http://localhost:3000/t_e_utilisateur_utl?utl_mail=eq.${user[0]["utl_mail"]}`).then(rep => {
                utilisateur().login(rep.data)
                console.log(rep.data)
            })
        })
        .catch(error => {
            console.log(error)
        })

        
    }


    
}
</script>

<template>
    <div>
        <header class="p-6 bg-slate-200">
            <div class="font-bold text-4xl text-center">Cerulean Warbler</div> 
        </header>

        <div class="absolute z-index-9999 top-6 left-4">
          <button class="btn btn-circle btn-outline btn-sm">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> 
            </a>
          </button>
    </div>

        <div class="hero h-[90vh] bg-slate-300">
        <div class="flex-col p-4 w-[90%] absolute top-24">
            <div class="text-center mb-4">
                <h1 class="text-3xl font-bold">Créer un compte CWarbler</h1>
            </div>
            <div class="card shadow-2xl p-12 bg-base-100">
                <div class="flex mb-2 gap-4 flex-wrap">
                    <div class="form-control flex-grow">
                        <label class="label">
                            <span class="text-lg">Nom</span>
                        </label>
                        <input type="text" placeholder="nom" v-model="surname" class="input input-bordered " />
                        <!-- {{surname}} -->
                    </div>
                    <div class="form-control flex-grow">
                        <label class="label">
                            <span class="text-lg">Prénom</span>
                        </label>
                        <input type="text" placeholder="prenom" v-model="name" class="input input-bordered" />
                        <!-- {{name}} -->
                    </div>
                    <div class="form-control flex-grow">
                        <label class="label">
                            <span class="text-lg">Pseudo</span>
                        </label>
                        <input type="text" placeholder="pseudo" v-model="alias" class="input input-bordered" />
                        <!-- {{alias}} -->
                    </div>
                </div>
                    <div class="flex mb-2 gap-4 flex-wrap">
                        <div class="form-control flex-grow">
                            <label class="label">
                                <span class="text-lg">Email</span>
                            </label>
                            <input type="email" placeholder="email" v-model="mail" class="input input-bordered" />
                            <!-- {{mail}} -->
                        </div>
                        <div class="form-control flex-grow">
                            <label class="label">
                                <span class="text-lg">Mot de passe</span>
                            </label>
                            <input type="password" placeholder="mot de passe" v-model="password" class="input input-bordered"/>
                            <!-- {{password}} -->
                        </div>
                    </div>
                    <div class="form-control flex-grow flex-wrap mb-4">
                        <label class="label">
                            <span class="text-lg">Description (optionnelle)</span>
                        </label>
                        <textarea class="textarea textarea-bordered h-36" v-model="desc" placeholder="description"></textarea>
                        <!-- {{desc}} -->
                    </div>
                    <div class="mb-4 text-center">
                        <button @click="PostAccount()" class="btn btn-accent w-[20%]">Créer compte</button>
                    </div>
            </div>
             
        </div>
    </div>
    </div>
</template>