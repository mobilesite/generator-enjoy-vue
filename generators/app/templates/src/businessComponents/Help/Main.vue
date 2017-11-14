<template>
  <div class="detail">
    <h1 class="detail-title" v-text="title"></h1>
    <button class="detail-button" @click="decrement">-</button>
    <button class="detail-button" @click="increment">+</button>
    <div v-text="'count计算结果：' + count"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data () {
      return {
        title: '这是帮助详情'
      }
    },
    computed: mapState({
      count () {
        return this.$store.state.count;
      }
    }),
    methods: {
      mounted () {
         console.log(lib); // eslint-disable-line
      },
      increment () {
        this.fechData();
        this.$store.commit('increment');
      },
      decrement () {
        this.$store.commit('decrement');
      },
      fechData () {
        this.axios.get('//www.douban.com/j/app/radio/channels').then((res) => {
          console.log(res);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .detail{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    background-color: lightyellow;

    &-title{
      font-size: 20px;
    }

    &-button{
      font-size: 14px;
    }
  }
</style>
