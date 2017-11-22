<template>
    <input v-model="isChecked" :name="name" class="enjoy-switchbox" type="checkbox">
</template>

<script>
    //使用：
    //<switchbox checked="false" name="xxx" @switchbox-change="onSwitchBoxChange"></switchbox>
    export default {
        name: 'Switchbox',
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default: ''
            }
        },
        computed: {
            isChecked: {
                get(){
                    return this.checked;
                },
                //回传值name值和改变后的value，以便于外部进行处理
                set(value){
                    this.$emit('switchbox-change', {
                        name: this.name,
                        value
                    });
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/vui/main.less";

    .enjoy-switchbox{
        @distance: 20px;
        @height: 30px;
        @color: #dfdfdf;
        @bezier: cubic-bezier(0.4, 0.4, 0.25, 1.35);
        @time: .3s;

        position: relative;
        width: @height + @distance;
        height: @height;
        outline: 0;
        border-radius: @height/2;
        box-sizing: border-box;
        appearance: none;

        border: 1px solid @color;
        background-color: @color;
        transition: background-color 0.1s, border 0.1s;

        &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: @height + @distance - 2;
            height: @height - 2;
            border-radius: @height/2;
            background-color: #fdfdfd;
            transform: scale(1);
            transition: transform @time @bezier;
        }

        &:after{
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            width: @height;
            height: @height - 2;
            border-radius: @height/2;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
            transition: transform @time @bezier;
        }

        &:checked{
            border: 1px solid @enjoy-color-primary;
            background-color: @enjoy-color-primary;

            &:before{
                transform: scale(0);
                background-color: @enjoy-color-primary;
            }
            &:after{
                transform: translate3d(@distance, 0, 0);
            }
        }
    }

    .theme-qsc{
        .enjoy-switchbox{
            &:checked{
                border: 1px solid @enjoy-color-primary-test;
                background-color: @enjoy-color-primary-test;

                &:before{
                    background-color: @enjoy-color-primary-test;
                }
            }
        }
    }
</style>
