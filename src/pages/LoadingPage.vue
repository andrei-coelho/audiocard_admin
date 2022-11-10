<template>
    <div class="container-fluid bg-primary" style="height: 1000px;">
        <div class="row justify-content-center">
            <Loading/>
            <div class="col-8 col-md-2">
                <h5 class="p-3 bg-black text-center text-white">carregando...</h5>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '../components/LoadingComponent.vue'

export default {
    components: { Loading }
}
</script>

