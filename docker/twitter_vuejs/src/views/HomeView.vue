<script setup>
import {ref} from 'vue';
import axios from 'axios';

import Card from '../components/Card.vue'
import PostTweet from '../components/PostTweet.vue'

import { utilisateur } from '../stores/utilisateur.js'


// for displaying tweets and users
const tweets = ref([]);

axios.get('http://localhost:3000/t_e_post_pos?select=*,t_e_utilisateur_utl!fk_pos_utl(utl_pseudo)&order=pos_id.asc')
.then(function (response) {
  tweets.value = response.data
})

let user = localStorage.utilisateur
let parseUser;
if(localStorage.utilisateur){
  parseUser = utilisateur().getJsonUtilisateur()
}
else{
  parseUser = 'Compte';
}

console.log(localStorage.utilisateur)

// for the search
let search = ref("")

function SearchTweet(){  
  return this.tweets.filter(obj => {
    return obj.pos_message.toLowerCase().includes(this.search.toLowerCase());
  })
}

</script>

<template>
<div>
    <header class="p-6 bg-slate-200">
      <div class="font-bold text-4xl text-center">Cerulean Warbler</div> 
    </header>
    <!-- Sidebar and Content -->
    <div class="drawer drawer-mobile bg-slate-600 h-[90vh]">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col ml-6 md:ml-10 mt-10 gap-4">

        <!-- Content -->
        <div class="text-2xl text-white">Public Warbles</div>

        <!-- Searchbar -->
        <div class="fixed top-24 right-4 md:top-12 md:right-8 flex flex-row gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> 
          <input class="bg-base-200 rounded" v-model="search" type="text">
        </div>

        <!-- display of the tweets -->
        <div class="ml-10 md:ml-28">
          <Card v-for="t in SearchTweet()" :id="t.pos_id" 
          :msg="t.pos_message" :datecreation="t.pos_datecreation" :url="t.pos_url" 
          :pseudo="t['t_e_utilisateur_utl']['utl_pseudo']" />
        </div>

        <!-- button of the sidebar for the mobile -->
        <label for="my-drawer-2" class="btn btn-xs drawer-button lg:hidden absolute top-2 left-4">Menu</label>

        <!-- Pop-up for posting tweets -->
        <PostTweet/>
      </div> 

      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label> 
        <ul class="menu p-4 w-80 bg-slate-300 text-base-content">
          <!-- Sidebar list here -->
          <li class="p-4 uppercase">Compte {{ parseUser[0]["utl_pseudo"] }}</li>
          <li></li>
          <li><a href="/">Public Warbles</a></li>
          <li v-if="user"><a href="/account">Profil</a></li>
          <li></li>
          <li v-if="!user"><a href="/login">Log in</a></li>
          <li v-if="user"><a @click="utilisateur().logout()" href="/">Log out</a></li>
        </ul>
      </div>
    </div>
</div>
</template>