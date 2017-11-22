<template>
    <div class="enjoy-modal" :class="className" v-show="show">
        <div class="enjoy-modal-inner">
            <div class="enjoy-modal-header">
                <slot name="enjoy-modal-header"></slot>
            </div>
            <div class="enjoy-modal-body">
                <slot name="enjoy-modal-body"></slot>
            </div>
            <div class="enjoy-modal-footer">
                <slot name="enjoy-modal-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="less">
    @import "../../styles/enjoy-ui/main.less";
</style>
