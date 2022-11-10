<template>
    <div class="modal">
        <div v-if="actionStart">
            <LoadingModal/>
        </div>
        <div v-if="alertError">
            <div class="alert alert-error text-center bg-danger text-white" role="alert" style="position:fixed; z-index:999999999; left:20%; rigth:20%; width: 60%; top: 1%;">
                {{ alertTextError }}
            </div>
        </div>
        <div class="modal-content">
             
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h2>Novo Card</h2>
                    </div>
                    <div class="col-6">
                        <span @click="close" class="close text-end">&times;</span>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">+</span>
                        <input v-model="titulo" type="text" class="form-control" placeholder="titulo" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><img :src="person_ic" style="width: 30px;"></span>
                        <input v-model="pessoa" type="text" class="form-control" placeholder="nome da pessoa" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><img :src="email_ic" style="width: 30px;"></span>
                        <input v-model="email" type="text" class="form-control" placeholder="email da pessoa" aria-describedby="basic-addon1">
                    </div>
                    <button @click="salvar" class="btn btn-success">Salvar</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

import LoadingModal from './LoadingModal.vue'

export default {

    components: {LoadingModal},
    
    data() {
        return {
            actionStart:false,
            alertError:false,
            alertTextError:"",
            titulo:"",
            pessoa:"",
            email:"",
            person_ic: process.env.VUE_APP_PREFIX+'/imagens/person_ic.png',
            email_ic: process.env.VUE_APP_PREFIX+'/imagens/email_ic.png',
        }
    },

    methods: {

        showError(message){
            this.alertError = true 
            this.alertTextError = message
            setTimeout(() => {
                this.alertError = false
            }, 3000)
        },

        close(){
            this.$emit('closeModal')
        },

        async salvar(){
            this.actionStart = true
            if(this.titulo.trim() == "" || this.pessoa.trim() == "" || this.email.trim() == ""){
                this.showError("Há campos vazios!")
            }

            let res = await fetch(process.env.VUE_APP_API+'card/create', {
                method:'post',
                body: JSON.stringify({
                    session:this.$get_session(),
                    titulo:this.titulo,
                    pessoa:this.pessoa,
                    email:this.email
                })
            })

            this.actionStart = false
            
            if(res.status == 200) {
                this.$emit('cartaoCriado')
            }

            this.showError("Não foi possível salvar o cartão. Erro: "+res.status)

        }
    },

}
</script>

<style scoped>

    .modal {
        display: block; 
        position: fixed; 
        z-index: 1; 
        padding-top: 100px; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4); 
    }

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

</style>