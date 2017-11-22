<template>
    <div class="not-found">
        <div class="not-found-inner">
            <h2 class="not-found-title">404 Page</h2>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '404 page'
            };
        }
    };
</script>

<style lang="less">
    @import "../../styles/enjoy-ui/main.less";
    .not-found {
        .mixin-fullscreen();
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .not-found-inner{
        margin-bottom: @enjoy-height-footer-nav;
    }
</style>
