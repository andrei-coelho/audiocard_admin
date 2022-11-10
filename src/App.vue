<template>
    <component :is="component" @refresh="checkSession" :key="key"></component>
</template>

<script>
/* eslint-disable */

import HomePage    from './pages/HomePage.vue'
import LoadingPage from './pages/LoadingPage.vue'
import LoginPage   from './pages/LoginPage.vue'

export default {
    
    components:{ HomePage, LoadingPage, LoginPage },

    data() {
        return {
            session:"",
            component:"LoadingPage",
            key:0
        }
    },

    async created(){
        this.checkSession()
    },

    methods: {
        checkSession(){
            if(this.$get_session()){
                this.component = "HomePage"
            } else {
                this.component = "LoginPage"
            }
        },
    },

}
</script>

