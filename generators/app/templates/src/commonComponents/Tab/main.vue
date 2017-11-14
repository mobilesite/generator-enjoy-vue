<template>
  <div class="tab" :class="className">
    <div class="tab-menu" ref="listNavMenu">
        <nav class="tab-menu-inner" :class="{ 'tab-menu-inner-fixed': listNavMenuFixed }" >
            <slot name="tab-menu-item"></slot>
        </nav>
    </div>

    <div class="tab-pane">
        <slot name="tab-pane-item"></slot>
    </div>
  </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        name: 'Tab',
        props: {
            className: {
                type: String,
                default: ''
            },
        },
        computed: {
            ...mapGetters([
                'tabSelected',
            ]),
        },
        data(){
            let me = this;
            return {
                listNavMenuFixed: false,
                scrollHandler: function() {
                    me.$emit('tabContScroll')
                }
            }
        },
        created(){
            window.addEventListener('scroll', this.scrollHandler.bind(this));
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import "../../styles/enjoy-ui/main.less";

    .tab-menu{
        position: relative;
        height: @enjoy-height-list-tab;
    }
    .tab-menu-inner{
        display: flex;
        z-index: 999;
        background-color: @enjoy-color-list-tab-bg;
        position: sticky;
        font-size: 14px;
        border-bottom: 1px solid #E5E5E8;

        .active{
            color: @enjoy-color-primary;
            &:after{
                position: absolute;
                z-index: 1;
                bottom: -1px;
                left: 50%;
                width: 44px;
                margin-left: -22px;
                content: '';
                border-bottom: 2px solid @enjoy-color-primary;
            }
        }
    }
    .theme-test{
        .tab-menu-inner{
            .active{
                color: @enjoy-color-primary-test;
                &:after{
                    border-bottom: 2px solid @enjoy-color-primary-test;
                }
            }
        }
    }
    .tab-menu-inner-fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }
    .tab-menu-item{
        position: relative;
        flex: 1;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: @enjoy-height-list-tab;
        color: @enjoy-color-text-gray;

        .mixin-set-tap-color();
    }
    
    .tab-menu-text{
        width: 100%;
        display: block;
    }
    .tab-pane{
        padding-bottom: 0;
    }
</style>
