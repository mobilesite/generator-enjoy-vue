
<template>
    <div class="enjoy-toast" >
        <div class="enjoy-toast-inner" :class="{'enjoy-toast-inner-show': show}">
            <span v-text="msg"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: '',
                show: false
            }
        },
        computed: {
            className(){
                return this.show ? 'enjoy-toast-inner-show' : 'enjoy-toast-inner-hide'
            }
        }
    }
</script>

<style lang="less">

</style>


