<template>
    <div class="tab" v-text="title"></div>
</template>

<script>
export default {
    data() {
        return {
            title: '这是tab2'
        };
    }
};
</script>

<style lang="less" scoped>
    .tab {
        display: flex;
        width: 100%;
        height: 300px;
        align-items: center;
        justify-content: center;
        background-color: darkseagreen;
        color: #fff;
    }
</style>
