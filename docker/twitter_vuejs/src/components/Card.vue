<script setup>
import axios from 'axios';
// import moment from 'moment';
import {ref} from 'vue';

defineProps({
    id: {
        type: Number,
        required: true,
    },
    iduser: {
        type: String,
    },
    msg: {
        type: String,
        required: true
    },
    datecreation: {
        type: Date,
        required: true
    },
    url: {
        type: String,
    },
    pseudo: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div class="card w-4/5 md:w-2/3 bg-base-100 shadow-xl mb-6 overflow-y-hidden">
        <div class="card-body">
            <!-- img profil, pseudo et date-->
            <h2 class="card-title">
                <div class="avatar placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>{{pseudo.substring(0,1).toUpperCase()}}</span>
                    </div>
                </div>
                    {{pseudo}}
                <p class="text-right text-base font-normal">{{ datecreation }}</p>
            </h2>

            <!-- message -->
            <p>{{ msg }} </p>

            <!-- boutons like et retweet -->
            <div class="card-actions justify-end">
                <button class="btn btn-xs gap-2 btn-accent">
                    <label class="swap">
                        <input type="checkbox" />
                        <svg class="swap-off h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <svg class="swap-on h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </label>
                    Like
                </button>
                <button class="btn btn-xs gap-2 btn-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" >
                    <path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"/></svg>
                    Rewarble
                </button>
            </div>
        </div>

        <!-- image des tweets -->
        <div class="flex">
            <figure> <img :src="`${url}`" alt=""/> </figure>

        </div>
    </div>
</template>