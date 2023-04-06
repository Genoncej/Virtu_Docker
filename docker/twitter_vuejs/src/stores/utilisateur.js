import { defineStore } from 'pinia';
import {ref} from 'vue';
import router from '../router';

const utilisateur = defineStore( 'utilisateur', {
    state: () => {
        return {
            utilisateur: ref(null),
        }
    },
    actions: {
        login(utilisateur) {
            localStorage.utilisateur = JSON.stringify(utilisateur)
            this.utilisateur = utilisateur;
            router.push('/');
        },

        logout() {
            localStorage.removeItem('utilisateur');
            this.utilisateur = null;
            router.push('/');
        },

        getJsonUtilisateur() {
            let response = JSON.parse(localStorage.utilisateur);
            return response;
        },
    }
})
export {utilisateur}