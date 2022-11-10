<template>
    <div class="container-fluid">
        <div class="row justify-content-center" style="margin-top: 40px;">
            <div class="col-12 text-center pb-3" style="height: 100px;">
                <div class="animation d-block mx-auto">
                    <div class="load-i load-time1"></div>
                    <div class="load-i load-time2"></div>
                    <div class="load-i load-time3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .animation {
        width: 120px;
    }

    .load-i {
        width: 20px;
        height: 20px;
        margin:8px;
        background-color:black;
        float:left;
        
    }

    .load-time1 {
        animation: anime 0.3s infinite alternate;
        animation-delay: 0.1s;
    }

    .load-time2 {
        animation: anime 0.3s infinite alternate;
        animation-delay: 0.2s;
    }

    .load-time3 {
        animation: anime 0.3s infinite alternate;
        animation-delay: 0.3s;
    }


    @keyframes anime {
        0% { height: 20px; margin-top:0px;}
        to {height: 40px; margin-top:40px;}
    }

</style>