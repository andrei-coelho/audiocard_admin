<template>
    <div class="container-fluid bg-primary border-bottom">
        <div v-if="open">
            <NewCardModal @closeModal="onCloseModal" @cartaoCriado="onCartaoCriado"/>
        </div>
        <div class="row p-1">
            <div class="col-10">
                <img class="d-none d-md-inline" :src="logo_jingleshopp" style="width: 90px;">
                <img :src="logo_audiocard" style="width: 120px;">
                <button @click="open = true" class="btn btn-dark mt-lg-1 ms-2">+ novo card</button>
            </div>
            <div class="col-2">
                <button @click="sair" class="btn btn-dark mt-lg-3" style="float:right;">sair</button>
            </div>
        </div>
    </div>
    <component :is="component" :key="k"/>
</template>

<script>

import Loading from '../components/LoadingComponent.vue'
import ListCardsComponents from '../components/ListCardsComponent.vue'
import NewCardModal from '../components/NewCardModal.vue'

export default {

    components:{ Loading, ListCardsComponents, NewCardModal },

    data() {
        return {
            k:0,
            open:false,
            component:'ListCardsComponents',
            logo_jingleshopp: process.env.VUE_APP_PREFIX+'/imagens/logo_jingleshopp.png',
            logo_audiocard: process.env.VUE_APP_PREFIX+'/imagens/audiocard_logo.png',
            logo_sotaque:process.env.VUE_APP_PREFIX+'/imagens/logo_sotaque.png'
        }
    },

    methods: {
        onCloseModal(){
            this.open = false
        },
        onCartaoCriado(){
            this.k++
            this.open = false
        },
        sair(){
            this.$close_session()
            location.reload(true)
        }
    },

}
</script>