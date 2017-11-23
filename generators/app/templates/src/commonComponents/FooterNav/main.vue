<template>
  <div class="enjoy-footer-nav" :class="className">
    <div class="enjoy-footer-nav-pane">
        <slot name="enjoy-footer-nav-pane-item"></slot>
    </div>
    <nav class="enjoy-footer-nav-menu">
        <slot name="enjoy-footer-nav-menu-item"></slot>
    </nav>
  </div>
</template>

<script>
    export default {
        name: 'FooterNav',
        props: {
            className: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
 
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import "../../styles/enjoy-ui/main.less";

    .enjoy-footer-nav{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .enjoy-footer-nav-menu {
        display: flex;
        z-index: 999;
        height: @enjoy-height-footer-nav;
        width: 100%;
        background-color: @enjoy-color-footer-nav-bg;
        box-shadow: @enjoy-shadow-footer-nav;
        font-size: 11px;
        color: @enjoy-color-text-gray;
    }
    .enjoy-footer-nav-menu-item{
        position: relative;
        flex: 1;
        cursor: pointer;
        .mixin-set-tap-color();
        height: @enjoy-height-footer-nav;

        &.active{
            .enjoy-footer-nav-menu-text{
                color: @enjoy-color-primary;
            }
        }

        &:before{
            margin-top: 8px;
            font-size: 16px;
            display: inline-block;
        }

        &:first-child{
            padding-left: 4.4%;
        }
        &:last-child{
            padding-right: 4.4%;
        }
    }
    .theme-test{
        .enjoy-footer-nav-menu-item{
            &.active{
                .enjoy-footer-nav-menu-text{
                    color: @enjoy-color-primary-test;
                }
            }
        }
    }
    .enjoy-footer-nav-menu-icon{
        margin-top: -2px;
        width: 100%;
        display: block;
    }
    .enjoy-footer-nav-menu-text{
        margin-top: -2px;
        width: 100%;
        display: block;
        margin-top: 6px;
        color: @enjoy-color-text-dark;
    }

    .enjoy-footer-nav-pane{
        flex: 1;
        width: 100%;
        overflow-y: auto;
    }
</style>
