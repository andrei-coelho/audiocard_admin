<template>
    <div class="container-fluid bg-primary" style="height: 1000px;">
        <div v-if="alertError">
            <div class="alert  bg-danger text-white text-center" role="alert" style="position:fixed; z-index:999999999; left:20%; rigth:20%; width: 60%; top: 1%;">
                Email e/ou senha estão incorretos
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <img class="d-block mx-auto" :src="logo_jingleshopp" alt="">
            </div>
             <div class="col-12">
                <img class="d-block mx-auto" :src="logo_audiocard" alt="">
            </div>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-11 col-md-6 col-lg-4 p-4 bg-black mt-4" style="border-radius: 20px;">

                <div class="mb-3">
                    <label for="input1" class="form-label"><span class="text-white">Email:</span></label>
                    <input v-model="email" type="email" class="form-control bg-dark text-white" style="border: 0px;" id="input1" placeholder="name@example.com">
                </div>

                <div class="mb-3">
                    <label for="input2" class="form-label"><span class="text-white">senha:</span></label>
                    <input v-model="senha" type="password" class="form-control bg-dark text-white" style="border: 0px;" id="input2" placeholder="******">
                </div>

                <div class="mb-3">
                    <button @click="verify" class="btn btn-primary mx-auto d-block">ENTRAR</button>
                </div>

            </div>
        </div>

        <div class="row">
            <img style="width:300px;" class="mx-auto d-block" :src="logo_sotaque" alt="">
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

            alertError:false,

            email:"",
            senha:"",

            logo_jingleshopp: process.env.VUE_APP_PREFIX+'/imagens/logo_jingleshopp.png',
            logo_audiocard: process.env.VUE_APP_PREFIX+'/imagens/audiocard_logo.png',
            logo_sotaque:process.env.VUE_APP_PREFIX+'/imagens/logo_sotaque.png'
        
        }
    },

    methods: {
        async verify(){
            
            let res = await fetch(process.env.VUE_APP_API+'auth/admin_login', {
                method:'post',
                body:JSON.stringify({
                    email:this.email,
                    senha:this.senha
                })
            })

            if(res.status == 200){
                let session = (await res.json()).data.session
                this.$set_session(session)
                this.$emit('refresh')
            } else {
                this.alertError = true;
                setTimeout(() => {
                    this.alertError = false;
                }, 3000);
            }

        }
    },
}
</script>