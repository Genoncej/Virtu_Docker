<script setup>
import {ref} from 'vue';
import axios from 'axios';

import { utilisateur } from '../stores/utilisateur.js'

// to get the user who is connected
let user = localStorage.utilisateur
let parseUser;
if(localStorage.utilisateur){
  parseUser = utilisateur().getJsonUtilisateur()
}
else{
  parseUser = 'Compte';
}
let idUser = parseUser[0]["utl_id"]
console.log(idUser)

// for the post
let msg = ref("");
let url = ref("");

function PostTweet(){
   axios.post('http://localhost:3000/t_e_post_pos', {
    pos_idutilisateur: `${idUser}`,
    pos_message: `${msg.value}`,
    pos_url: `${url.value}`
    })
    .catch(error => {
    console.log(error)
    })
}

// for the gifs
const apikey = "LIVDSRZULELA";
let gifs = ref([]);
let search_term = ref("");
let selected_gif = ref();

 function getGifs(lmt) {
   axios.get(
    `https://g.tenor.com/v1/search?q=${search_term.value}&key=${apikey}&limit=${lmt}`
  )
  .then(response => {
    gifs.value = [];
    gifs.value = response.data.results;
    console.log(gifs.value)
  })
  .catch(error => {
    console.log(error)
  })
}

function click() {
  document.getElementById("gif").classList.toggle("hidden");
}

function rmgif() {
  selected_gif.value = null;
}

</script>

<template>
    <div v-if="user">
        <!-- button to open the modal -->
        <div class="fixed z-index-9999 bottom-6 right-12">
          <button class="btn btn-circle btn-accent btn-outline">
          <label for="post_tweet" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </label>
          </button>
        </div>
        <input type="checkbox" id="post_tweet" class="modal-toggle" />
        <!-- modal -->
        <div class="modal">
          <div class="modal-box w-[60%]  relative">

            <!-- the close icon -->
            <label for="post_tweet" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

            <!-- title -->
            <h3 class="font-bold text-lg">Create your warbler</h3>

            <!-- text and area for the message -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Enter a message (required)</span>
              </label>
              <textarea class="textarea textarea-bordered w-full h-56" v-model="msg" placeholder="Message"></textarea>
            </div>

            <!-- text and input for the image -->
            <div class="form-control" >
              <label class="label">
                <span class="label-text">Enter the url for an image (optionnal)</span>
              </label>
              <input type="text"  placeholder="Url" v-model="url" class="input input-bordered w-full" />
            </div>

            <!-- button to display the gifs and add one -->
            <label class="mr-2 text-sm">Or choose a gif</label>
            <button class="btn btn-xs mt-4" @click="click()">Add gif</button>

            <!-- gif display -->
            <img id="selected_gif" v-if="url" :src="url" alt="" @click="rmgif()">

            <!-- card for searching gifs -->
            <div id="gif" class="card shadow-xl hidden">
              <div class="card-body">
                <div class="flex items-center gap-2">
                  <input v-model="search_term"  type="text" placeholder="Search a gif" class="border grow justify-items-center">
                  <button class="btn btn-sm" @click="getGifs(27)">Search</button>
                </div>
                <div class="grid grid-cols-3 w-full gap-1 h-[250px] overflow-y-auto">
                  <img v-for="gif in gifs" :src="gif.media[0].gif.url" :alt="gif.content_description" class="img_gif" @input=""  @click="url=gif.media[0].gif.url">
                </div>
              </div>
            </div>

            <!-- button for posting the tweet -->
            <div class="modal-action">
              <label for="post_tweet" class="btn btn-primary"> <a href="/" @click="PostTweet()">Post</a> </label>
            </div>
          </div>
        </div>
    </div>
</template>