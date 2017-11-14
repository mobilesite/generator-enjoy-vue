<template>
  <div class="footer-nav" :class="className">
    <nav class="footer-nav-menu">
        <slot name="footer-nav-menu-item"></slot>
    </nav>
    <div class="footer-nav-pane">
        <slot name="footer-nav-pane-item"></slot>
    </div>
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

    .footer-nav-menu {
        display: flex;
        z-index: 999;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @enjoy-color-footer-nav-bg;
        box-shadow: @enjoy-shadow-footer-nav;
        font-size: 11px;
        color: @enjoy-color-text-gray;
    }
    .footer-nav-menu-item{
        position: relative;
        flex: 1;
        cursor: pointer;
        .mixin-set-tap-color();
        height: @enjoy-height-footer-nav;

        &.active{
            .footer-nav-menu-text{
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
        .footer-nav-menu-item{
            &.active{
                .footer-nav-menu-text{
                    color: @enjoy-color-primary-test;
                }
            }
        }
    }
    .footer-nav-menu-icon{
        margin-top: -2px;
        width: 100%;
        display: block;
    }
    .footer-nav-menu-text{
        margin-top: -2px;
        width: 100%;
        display: block;
        margin-top: 6px;
        color: @enjoy-color-text-dark;
    }

    .footer-nav-pane{
        padding-bottom: @enjoy-height-footer-nav;
    }
</style>
