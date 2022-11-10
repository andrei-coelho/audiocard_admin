<template>
    <div class="modal">
        
        <div v-if="alertSuccess">
            <div class="alert alert-success text-center" role="alert" style="position:fixed; z-index:999999999; left:20%; rigth:20%; width: 60%; top: 1%;">
                {{ alertTextSuccess }}
            </div>
        </div>
        <div v-if="alertError">
            <div class="alert  bg-danger text-white text-center" role="alert" style="position:fixed; z-index:999999999; left:20%; rigth:20%; width: 60%; top: 1%;">
                {{ alertTextError }}
            </div>
        </div>

        <div v-if="actionStart">
            <LoadingModal/>
        </div>
        <div class="modal-content">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h2>{{ card.titulo }}</h2>
                    </div>
                    <div class="col-6">
                        <span @click="close" class="close text-end">&times;</span>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    
                    <div class="col-12">
                        <h5>Dados:</h5>
                    </div>
                    
                    <div class="col-12">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><img :src="person_ic" style="width: 30px;"></span>
                            <input type="text" class="form-control" v-model="nome" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><img :src="email_ic" style="width: 30px;"></span>
                            <input type="text" class="form-control" v-model="email" aria-describedby="basic-addon1">
                        </div>

                        <button @click="update" class="btn btn-success">Salvar Alterações</button>
                    </div>

                    <div class="col-12 mt-4">
                        <h5>Arquivos:</h5>
                        <div v-if="files.length > 0">
                            <div class="row">
                                <div class="col-12 col-md-6 col-lg-4 my-2" v-for="file, k in files" :key="k">
                                    <div class="card text-center p-2">
                                        <img class="mx-auto d-block" :src="file_icon" style="width: 50px;">
                                        <p>{{ file.nome }}</p>
                                        <button style="width: 50px; padding:10px; border-radius:100px;" class="btn btn-danger d-block mx-auto">
                                            <img @click="deleteFile(file.id)" :src="delete_ic" style="width: 20px;" alt="">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card text-center p-2">
                                        <h3>0 arquivos</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-2">
                        
                        <h5>Ações:</h5>
                        
                        <div class="row border-bottom py-3">
                            <div class="col-10">
                                <div class="mb-3">
                                    <label for="formFileMultiple" class="form-label">Adicionar Arquivos</label>
                                    <input :value="val" accept="audio/*" @change="setFiles" class="form-control" type="file" id="formFileMultiple" multiple>
                                </div>
                            </div>
                            <div class="col-2 pt-4">
                                <button @click="uploadFiles" class="btn btn-success mt-2">
                                +
                                </button>
                            </div>
                        </div>

                        <div class="row border-bottom py-3">
                            <div class="col-12">
                                <div class="input-group mb-3">
                                    <div v-if="showBtnLayout">
                                        <button @click="copy" class="btn btn-success">
                                            COPIAR LAYOUT E-MAIL MKT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row border-bottom py-3">
                            <div class="col-12">
                                <div class="input-group mb-3">
                                    <button @click="gerarLink" class="btn btn-success">
                                        gerar link
                                    </button>
                                    <input v-model="linkGerado" type="text" class="form-control" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row py-3 border-bottom">
                            <div class="col-12">
                                <label for="formFileMultiple" class="form-label">Alterar Versão</label>
                                <div style="width:100px;" class="input-group mb-3">
                                    <input  type="text" class="form-control text-end" v-model="version" readonly>
                                    <button @click="changeVersion" class="btn btn-success">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="row py-3">
                            <div class="col-12" v-if="statusEmail">
                                <p class="text-start py-0 my-0 text-success"><span>email enviado</span></p>
                            </div>
                            <div class="col-12" v-else>
                                <p class="text-start py-0 my-0 text-danger"><span>email não enviado</span></p>
                            </div>
                            <div class="col-12">
                                <button @click="enviarEmail" class="btn btn-success">
                                    Enviar e-mail
                                </button>
                            </div>
                        </div>

                        <div class="row py-3">
                            <div class="col">
                                <button style="width: 100px; padding:10px; border-radius:100px; float:right;" class="btn btn-danger">
                                    <img @click="deleteCard()" :src="delete_ic" style="width: 40px;" alt="">
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>

import { Buffer } from 'buffer'

import LoadingModal from './LoadingModal.vue'

export default {
    
    components:{LoadingModal},
    props:{
        open:Boolean,
        card:Object
    },

    created(){
        this.getFiles()
    },

    data() {
        return {
            
            changed:          false,
            alertSuccess:     false,
            alertError:       false,
            showBtnLayout:    false,
            alertTextError:   "",
            alertTextSuccess: "",
            htmlMail:         "",

            statusEmail: this.card.email_enviado == 1, 
            version:     this.card.version,
            nome:        this.card.pessoa,
            email:       this.card.email,
            linkGerado:  "",
            val:         "",
            filesToUp:   [],
            files:       [],
            actionStart: false,

            file_icon:   process.env.VUE_APP_PREFIX+'/imagens/file_design_icon.jpg',
            delete_ic:   process.env.VUE_APP_PREFIX+'/imagens/delete_ic_white.png',
            person_ic:   process.env.VUE_APP_PREFIX+'/imagens/person_ic.png',
            audio_ic:    process.env.VUE_APP_PREFIX+'/imagens/audio_ic.png',
            email_ic:    process.env.VUE_APP_PREFIX+'/imagens/email_ic.png',
            version_ic:  process.env.VUE_APP_PREFIX+'/imagens/version_ic.png',

        }
    },

    methods: {

        async copyToClipboard(textToCopy) {
            // navigator clipboard api needs a secure context (https)
            if (navigator.clipboard && window.isSecureContext) {
                // navigator clipboard api method'
                return navigator.clipboard.writeText(textToCopy);
            } else {
                // text area method
                let textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                // make the textarea out of viewport
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((res, rej) => {
                    // here the magic happens
                    document.execCommand('copy') ? res() : rej();
                    textArea.remove();
                });
            }
        },

        async copy (){
            
            this.actionStart = true 
            let res = await fetch(`${process.env.VUE_APP_URL}mail.php?pessoa=${this.nome}&plural=${this.files.length > 1 ? 'true' : 'false'}&link=${this.linkGerado}`)
            
            if(res.status == 200){
                console.log(res);
                let content = await res.text();
                await this.copyToClipboard(content)
                this.showSuccess("conteúdo copiado!!!")
            }

            this.actionStart = false 
            
        },

        async enviarEmail(){
            this.actionStart = true 
            let res = await fetch(process.env.VUE_APP_API+"mail/send/"+this.card.id, {
                method:"post",
                body: JSON.stringify({
                    session:this.$get_session()
                })
            })

            if(res.status == 200){
                this.showSuccess("Email enviado com sucesso!")
                if(!this.statusEmail){
                    this.changed = true
                    this.statusEmail = true
                }
            } else {
                this.showError("Ocorreu um erro ao enviar o email. Error:"+res.status)
            }
            
            this.actionStart = false 

        },

        async update(){
            this.actionStart = true 
            let res = await fetch(process.env.VUE_APP_API+"card/update/"+this.card.id, {
                method:"post",
                body: JSON.stringify({
                    session:this.$get_session(),
                    pessoa:this.nome,
                    email:this.email
                })
            })

            if(res.status == 200){
                this.showSuccess("Dados alterados com sucesso")
                this.changed = true
            } else {
                this.showError("Ocorreu um erro ao tentar alterar os dados. Error:"+res.status)
            }
            
            this.actionStart = false 
        },

        setFiles(event){
            this.filesToUp = event.target.files
        },

        showError(message){
            this.alertTextError = message 
            this.alertError = true 
            setTimeout(() => this.alertError = false, 3000)
        },

        showSuccess(message){
            this.alertTextSuccess = message 
            this.alertSuccess = true 
            setTimeout(() => this.alertSuccess = false, 3000)
        },

        async changeVersion(){
            
            this.actionStart = true 

            let res = await fetch(process.env.VUE_APP_API+'card/changeVersion/'+this.card.id, {
                method:'post',
                body:JSON.stringify({
                    session: this.$get_session()
                })
            })

            if(res.status == 200) {
                this.showSuccess("Nova versão gerada");
                this.linkGerado = ""
                this.version++
            }
            
            this.actionStart = false 
            this.changed = true
        },

        async gerarLink(){
            this.actionStart = true 
            
            let res = await fetch(process.env.VUE_APP_API+'card/gerarLink/'+this.card.id, {
                method:'post',
                body:JSON.stringify({
                    session: this.$get_session()
                })
            })

            if(res.status == 200){
                this.linkGerado = (await res.json()).data
                this.showBtnLayout = true
            }

            this.actionStart = false 
        },

        async deleteFile(fileId){
            this.actionStart = true 

            let res = await fetch(process.env.VUE_APP_API+'files/delete', {
                method:'post',
                body:JSON.stringify({
                    session: this.$get_session(),
                    file_id: fileId
                })
            })

            if(res.status == 200) {
                await this.getFiles()
            }

            this.actionStart = false 
            this.changed = true

        },

        async getFiles(){

            this.actionStart = true 

            let res = await fetch(process.env.VUE_APP_API+'files/list_files_card', {
                method:'post',
                body:JSON.stringify({
                    session: this.$get_session(),
                    card_id: this.card.id
                })
            })

            this.files = (await res.json()).data

            this.actionStart = false 

        },

        async uploadFiles(){
            
            if(this.filesToUp.length == 0) return;
            this.actionStart = true 
            const errors = []

            for (let i = 0; i < this.filesToUp.length; i++) {
                
                const file = this.filesToUp[i]
                const data = {}
                let prts   = file.name.split('.')
                data.mime  = prts[prts.length -1]
                data.name  = file.name.substring(0, file.name.length - (data.mime.length + 1))
                data.file  = ""

                const limitSize = (300000 * 16) - 1

                let start  = 0
                let end    = file.size > limitSize ? limitSize : file.size
                let init   = true 
                let status = true 
                let finish = false
                let contin = true

                await (async () => {
                    while(contin){
                        if(init) {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            data.slug = await this.request____create_ghost_file(data);
                            status = data.slug !== false
                            if(!status) {
                                errors.push(data.name)
                                return;
                            }
                            init = false;
                            continue
                        }

                        if(status && finish) {
                            status = await this.request____commit_file(data);
                            if(!status) errors.push(data.name)
                            return;
                        }

                        await new Promise((resolve) => {

                            const reader = new FileReader();

                            reader.onerror = () => {
                                status = false
                            }

                            reader.onload = async e => {

                                const fresult = e.target.result;
                                const buf = Buffer.alloc(fresult.byteLength);
                                const view = new Uint8Array(fresult);

                                await new Promise(resolve => setTimeout(resolve, 1000));
                                for (let i = 0; i < buf.length; ++i) 
                                    buf[i] = view[i];

                                let base64String = buf.toString('base64');
                                data.file = base64String;
                                let s_append = await this.request____append_file(data)
                            
                                status = s_append
                                
                                resolve();

                            }
                            
                            let slice = file.slice(start, end);
                            reader.readAsArrayBuffer(slice);

                        })

                        start = end
                        end += limitSize

                        if(end >= file.size){
                            finish = true 
                            end = file.size    
                        }

                    }

                    if(!status) {
                        errors.push(data.name)
                        return;
                    }
                })()
                
            }

            if(errors.length > 0){
                this.showError("Não foi possível adicionar um ou mais arquivos.")
            }
            
            this.setFiles({
                target:{
                    files: []
                }
            })

            await this.getFiles()

            this.actionStart = false // para mostrar o loading
            this.showSuccess("Arquivo inserido com sucesso.");
            this.changed = true

        },

        async request____create_ghost_file(data){
            
            data.session = this.$get_session()
            
            let res = await fetch(process.env.VUE_APP_API+'files/create', {
                method:'post',
                body:JSON.stringify(data)
            })

            if(res.status != 200) {
                return false
            }

            console.log("create", res.status);

            return (await res.json()).data.slug
        },

        async request____append_file(data){
            
            data.session = this.$get_session()
            
            let res = await fetch(process.env.VUE_APP_API+'files/append', {
                method:'post',
                body:JSON.stringify(data)
            })
            
            console.log("append", res.status);

            return res.status == 200
        },

        async request____commit_file(data){
            
            data.session = this.$get_session()
            data.card_id = this.card.id
            
            let res = await fetch(process.env.VUE_APP_API+'files/commit', {
                method:'post',
                body:JSON.stringify(data)
            })

            console.log("commit", res.status);

            return res.status == 200
        },

        close(){
            this.$emit('closedCard', this.changed)
        },

        async deleteCard(){
            let res = await fetch(process.env.VUE_APP_API+'card/delete/'+this.card.id, {
                method:'post',
                body:JSON.stringify({
                    session: this.$get_session()
                })
            })

            if(res.status == 200){
                this.$emit('deletedCard')
            }
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