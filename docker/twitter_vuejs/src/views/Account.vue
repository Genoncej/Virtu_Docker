<script setup>
import {ref} from 'vue';
import axios from 'axios';

import Card from '../components/Card.vue'

import { utilisateur } from '../stores/utilisateur.js'

// for the connection of the user
let user = localStorage.utilisateur
let parseUser;
if(localStorage.utilisateur){
  parseUser = utilisateur().getJsonUtilisateur()
}
else{
  parseUser = 'Compte';
}

let idUser = parseUser[0]["utl_id"]

// for displaying the tweets of the user
const tweetsUser = ref([]);

axios.get(`http://localhost:3000/t_e_post_pos?select=*,t_e_utilisateur_utl!inner!fk_pos_utl(utl_pseudo)&t_e_utilisateur_utl.utl_id=eq.${idUser}`)
.then(function (response) {
  tweetsUser.value = response.data
})
</script>

<template>
  <div>
      <header class="p-6 bg-slate-200">
          <div class="font-bold text-4xl text-center">Cerulean Warbler</div> 
      </header>
      <div class="drawer drawer-mobile bg-slate-600 h-[90.5vh]">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <!-- Content -->
        <div class="drawer-content flex flex-col ml-6 md:ml-10 mt-10 gap-4">

          <!-- User infos -->
          <div class="text-2xl text-white">Your Infos</div>
          <div class="ml-10 md:ml-22">
            <div class="flex flex-wrap">
              <div class="flex mb-6 pr-8">
                <div class="bg-base-200 rounded-l p-4 bg-gray-800 text-white">Pseudo</div>
                <div class="bg-base-200 text-center rounded-r p-4">{{ parseUser[0]["utl_pseudo"] }}</div>
              </div>
              <div class="flex mb-6 pr-8">
                <div class="bg-base-200 rounded-l p-4 bg-gray-800 text-white">Nom</div>
                <div class="bg-base-200 text-center rounded-r p-4">{{ parseUser[0]["utl_nom"] }}</div>
              </div>
              <div class="flex mb-6 pr-8">
                <div class="bg-base-200 rounded-l p-4 bg-gray-800 text-white">Prénom</div>
                <div class="bg-base-200 text-center rounded-r p-4">{{ parseUser[0]["utl_prenom"] }}</div>
              </div>
              <div class="flex mb-6 pr-8">
                <div class="bg-base-200 rounded-l p-4 bg-gray-800 text-white">Email</div>
                <div class="bg-base-200 text-center rounded-r p-4">{{ parseUser[0]["utl_mail"] }}</div>
              </div>
            </div>
            <div class="flex mb-20 mr-4">
              <div class="bg-base-200 rounded-l p-4 bg-gray-800 text-white">Description</div>
              <div class="bg-base-200 text-center rounded-r p-4">{{ parseUser[0]["utl_description"] }}</div>
            </div>
          </div>

          <!-- User tweets -->
          <div class="text-2xl text-white">Your Warbles</div>
          <div class="ml-10 md:ml-22">
              <Card v-for="t in tweetsUser" :id="t.pos_id" :msg="t.pos_message" :datecreation="t.pos_datecreation" :url="t.pos_url" :pseudo="t['t_e_utilisateur_utl']['utl_pseudo']"/>
          </div>

          <!-- button of the sidebar for the mobile -->
          <label for="my-drawer-2" class="btn btn-xs drawer-button lg:hidden absolute top-2 left-4">Menu</label>
        </div> 

        <!-- Sidebar -->
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label> 
          <ul class="menu p-4 w-80 bg-slate-300 text-base-content">
          <!-- Sidebar list here -->
            <li class="p-4 uppercase">Compte {{ parseUser[0]["utl_pseudo"] }}</li>
            <li></li>
            <li><a href="/">Public Warbles</a></li>
            <li><a>Favoris</a></li>
            <li></li>
            <li><a @click="utilisateur().logout()" href="/">Log out</a></li>
          </ul>
        </div>
      </div>
  </div>
    
</template>