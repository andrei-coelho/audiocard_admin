<template>

    <div class="container-fluid">

        <div v-if="open">
            <OpenCardModal :key="k" :card="card" @closedCard="onClosedCard" @deletedCard="onDeletedCard"/>
        </div>


        <div v-if="loading">
            <Loading/>
        </div>
        <div v-else>
            <div v-if="cards.length == 0">
                <div class="row py-1 justify-content-center">

                    <div class="col-12 col-md-8 col-md-6 mt-3">

                        <div class="card shadow p-2 text-center">
                            Nenhum cartão adicionado
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="row py-1">

                    <div class="col-12 col-md-6 col-lg-3 text-center my-2" v-for="card,k in cards" :key="k">

                        <div class="card shadow p-2">

                            <h4>{{ card.titulo }}</h4>
                            <p class="text-start py-0 my-0"><img style="width: 30px;" :src="person_ic"><span>{{ card.pessoa }}</span></p>
                            <p class="text-start py-0 my-0"><img style="width: 30px;" :src="email_ic"><span>{{ card.email }}</span></p>
                            <p class="text-start py-0 my-0"><img style="width: 30px;" :src="audio_ic"><span>{{ card.total_files }}</span></p>
                            <p class="text-start py-0 my-0"><img style="width: 30px;" :src="version_ic"><span>{{ card.version }}</span></p>
                            <p :class="`text-start py-0 my-0 ${card.email_enviado == 1 ? 'text-success' : 'text-danger'}`"><span>{{ card.email_enviado == 1 ? "email enviado" : "email não enviado"}}</span></p>

                            <button @click="openCard(k)" class="btn btn-primary">abrir</button>
                        
                        </div>

                    </div>

                </div>
            </div>

        </div>
    
    </div>

</template>


<script>

import OpenCardModal from '../components/OpenCardModal.vue'
import Loading from '../components/LoadingComponent.vue'

export default {
    components:{OpenCardModal, Loading},

    async created(){
        this.getCards()
    },

    data() {
        return {
            k:0,
            loading:true,
            open: false,
            cards:[],
            card:{},
            person_ic: process.env.VUE_APP_PREFIX+'/imagens/person_ic.png',
            audio_ic: process.env.VUE_APP_PREFIX+'/imagens/audio_ic.png',
            email_ic: process.env.VUE_APP_PREFIX+'/imagens/email_ic.png',
            version_ic: process.env.VUE_APP_PREFIX+'/imagens/version_ic.png',
        }
    },

    methods: {

        onClosedCard(changed = false){
            this.open = false
            if(changed){
                this.getCards()
            }
        },

        onDeletedCard(){
            this.open = false
            this.getCards()
        },

        openCard(key){
            this.card = this.cards[key]
            this.k++
            this.open = true
        },

        async getCards(){
            this.loading = true
            let res = await fetch(process.env.VUE_APP_API+'card/list_cards', {
                method:'post',
                body:JSON.stringify({
                    session: this.$get_session()
                })
            })
            this.cards = (await res.json()).data
            this.loading = false
        }
    },
}
</script>
