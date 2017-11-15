<template>
    <div class="detail">
        <h1 class="detail-title" v-text="title"></h1>
        <div>
            <button class="detail-button" @click="decrement">-</button>
            <button class="detail-button" @click="increment">+</button>
        </div>
        <div v-text="'count计算结果：' + count"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            title: "这是帮助详情"
        };
    },
    computed: {
        ...mapState([
            'count'
        ])
    },
    methods: {
        ...mapMutations({
            updateCount: 'UPDATE_COUNT'
        }),
        mounted() {
            console.log(lib); // eslint-disable-line
        },
        increment() {
            this.updateCount(this.count + 1);
        },
        decrement() {
            this.updateCount(this.count - 1);
        }
    }
};
</script>

<style lang="less" scoped>
.detail {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 300px;
    background-color: lightyellow;

    &-title {
        font-size: 20px;
    }

    &-button {
        margin: 5px;
        display: inline-block;
        font-size: 14px;
        padding: 10px;

        &:first-child{
            margin-right: 5px;
        }
    }
}
</style>
