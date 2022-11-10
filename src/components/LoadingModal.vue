<template>
    <div class="modal">
        <div class="modal-content">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-6">
                        <LoadingComponent/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import LoadingComponent from './LoadingComponent.vue'

export default {
    components:{LoadingComponent}
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
        background-color: transparent;
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