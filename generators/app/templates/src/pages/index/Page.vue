<template>
    <div class="page">
        <help></help>
    </div>
</template>

<script>
    import Help from "@/businessComponents/Help/main.vue";
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        name: "Page",
        components: {
            Help,
        },
        computed: {
            
        },
        data() {
            return {
                
            };
        },
        created(){

        },
        mounted() {
            
        },
        methods: {

        }
    };
</script>

<style lang="less">
    @import "../../styles/enjoy-ui/main.less";

    .page {
        font-family: @enjoy-font-default;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin-top: 0;
        color: @enjoy-color-text-dark;
    }


    .slide-left-enter-active {
        -webkit-animation: slide-left-in .5s cubic-bezier(0.23, 1, 0.32, 1);
        animation: slide-left-in .5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    @-webkit-keyframes slide-left-in {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);;
        }
    }
    @keyframes slide-left-in {
        0% {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);;
        }
    }
</style>
