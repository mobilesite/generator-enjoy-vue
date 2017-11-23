<template>
    <div class="enjoy-loading" v-show="show">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            show: {
                type: Boolean
            }
        }
    };
</script>

<style lang="less">
    .enjoy-loading{
        padding: 10px 0;
        
        div {
            position: relative;
            opacity: 0.25;
        }
        div:before {
            content: " ";
            position: absolute;
            width: 5px;
            height: 2px;
            background: #d1d1d5;
            box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;
            border-radius: 1px;
            transform-origin: left 50% 0px;
        }
        div:nth-child(1) {
            -webkit-animation: opacity-60-25-0-12 1.25s linear infinite;
            animation: opacity-60-25-0-12 1.25s linear infinite;
        }
        div:nth-child(1):before {
            -webkit-transform: rotate(0deg) translate(5px, 0px);
            transform: rotate(0deg) translate(5px, 0px);
        }
        div:nth-child(2) {
            -webkit-animation: opacity-60-25-1-12 1.25s linear infinite;
            animation: opacity-60-25-1-12 1.25s linear infinite;
        }
        div:nth-child(2):before {
            -webkit-transform: rotate(30deg) translate(5px, 0px);
            transform: rotate(30deg) translate(5px, 0px);
        }
        div:nth-child(3) {
            -webkit-animation: opacity-60-25-2-12 1.25s linear infinite;
            animation: opacity-60-25-2-12 1.25s linear infinite;
        }
        div:nth-child(3):before {
            -webkit-transform: rotate(60deg) translate(5px, 0px);
            transform: rotate(60deg) translate(5px, 0px);
        }
        div:nth-child(4) {
            -webkit-animation: opacity-60-25-3-12 1.25s linear infinite;
            animation: opacity-60-25-3-12 1.25s linear infinite;
        }
        div:nth-child(4):before {
            -webkit-transform: rotate(90deg) translate(5px, 0px);
            transform: rotate(90deg) translate(5px, 0px);
        }
        div:nth-child(5) {
            -webkit-animation: opacity-60-25-4-12 1.25s linear infinite;
            animation: opacity-60-25-4-12 1.25s linear infinite;
        }
        div:nth-child(5):before {
            -webkit-transform: rotate(120deg) translate(5px, 0px);
            transform: rotate(120deg) translate(5px, 0px);
        }
        div:nth-child(6) {
            -webkit-animation: opacity-60-25-5-12 1.25s linear infinite;
            animation: opacity-60-25-5-12 1.25s linear infinite;
        }
        div:nth-child(6):before {
            -webkit-transform: rotate(150deg) translate(5px, 0px);
            transform: rotate(150deg) translate(5px, 0px);
        }
        div:nth-child(7) {
            -webkit-animation: opacity-60-25-6-12 1.25s linear infinite;
            animation: opacity-60-25-6-12 1.25s linear infinite;
        }
        div:nth-child(7):before {
            -webkit-transform: rotate(180deg) translate(5px, 0px);
            transform: rotate(180deg) translate(5px, 0px);
        }
        div:nth-child(8) {
            -webkit-animation: opacity-60-25-7-12 1.25s linear infinite;
            animation: opacity-60-25-7-12 1.25s linear infinite;
        }
        div:nth-child(8):before {
            -webkit-transform: rotate(210deg) translate(5px, 0px);
            transform: rotate(210deg) translate(5px, 0px);
        }
        div:nth-child(9) {
            -webkit-animation: opacity-60-25-8-12 1.25s linear infinite;
            animation: opacity-60-25-8-12 1.25s linear infinite;
        }
        div:nth-child(9):before {
            -webkit-transform: rotate(240deg) translate(5px, 0px);
            transform: rotate(240deg) translate(5px, 0px);
        }
        div:nth-child(10) {
            -webkit-animation: opacity-60-25-9-12 1.25s linear infinite;
            animation: opacity-60-25-9-12 1.25s linear infinite;
        }
        div:nth-child(10):before {
            -webkit-transform: rotate(270deg) translate(5px, 0px);
            transform: rotate(270deg) translate(5px, 0px);
        }
        div:nth-child(11) {
            -webkit-animation: opacity-60-25-10-12 1.25s linear infinite;
            animation: opacity-60-25-10-12 1.25s linear infinite;
        }
        div:nth-child(11):before {
            -webkit-transform: rotate(300deg) translate(5px, 0px);
            transform: rotate(300deg) translate(5px, 0px);
        }
        div:nth-child(12) {
            -webkit-animation: opacity-60-25-11-12 1.25s linear infinite;
            animation: opacity-60-25-11-12 1.25s linear infinite;
        }
        div:nth-child(12):before {
            -webkit-transform: rotate(330deg) translate(5px, 0px);
            transform: rotate(330deg) translate(5px, 0px);
        }
        @-webkit-keyframes opacity-60-25-0-12 {
            0% {
                opacity: 0.25;
            }
            0.01% {
                opacity: 0.25;
            }
            0.02% {
                opacity: 1;
            }
            60.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @-webkit-keyframes opacity-60-25-1-12 {
            0% {
                opacity: 0.25;
            }
            8.34333% {
                opacity: 0.25;
            }
            8.35333% {
                opacity: 1;
            }
            68.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @-webkit-keyframes opacity-60-25-2-12 {
            0% {
                opacity: 0.25;
            }
            16.6767% {
                opacity: 0.25;
            }
            16.6867% {
                opacity: 1;
            }
            76.6767% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @-webkit-keyframes opacity-60-25-3-12 {
            0% {
                opacity: 0.25;
            }
            25.01% {
                opacity: 0.25;
            }
            25.02% {
                opacity: 1;
            }
            85.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @-webkit-keyframes opacity-60-25-4-12 {
            0% {
                opacity: 0.25;
            }
            33.3433% {
                opacity: 0.25;
            }
            33.3533% {
                opacity: 1;
            }
            93.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @-webkit-keyframes opacity-60-25-5-12 {
            0% {
                opacity: 0.270958333333333;
            }
            41.6767% {
                opacity: 0.25;
            }
            41.6867% {
                opacity: 1;
            }
            1.67667% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.270958333333333;
            }
        }
        @-webkit-keyframes opacity-60-25-6-12 {
            0% {
                opacity: 0.375125;
            }
            50.01% {
                opacity: 0.25;
            }
            50.02% {
                opacity: 1;
            }
            10.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.375125;
            }
        }
        @-webkit-keyframes opacity-60-25-7-12 {
            0% {
                opacity: 0.479291666666667;
            }
            58.3433% {
                opacity: 0.25;
            }
            58.3533% {
                opacity: 1;
            }
            18.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.479291666666667;
            }
        }
        @-webkit-keyframes opacity-60-25-8-12 {
            0% {
                opacity: 0.583458333333333;
            }
            66.6767% {
                opacity: 0.25;
            }
            66.6867% {
                opacity: 1;
            }
            26.6767% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.583458333333333;
            }
        }
        @-webkit-keyframes opacity-60-25-9-12 {
            0% {
                opacity: 0.687625;
            }
            75.01% {
                opacity: 0.25;
            }
            75.02% {
                opacity: 1;
            }
            35.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.687625;
            }
        }
        @-webkit-keyframes opacity-60-25-10-12 {
            0% {
                opacity: 0.791791666666667;
            }
            83.3433% {
                opacity: 0.25;
            }
            83.3533% {
                opacity: 1;
            }
            43.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.791791666666667;
            }
        }
        @-webkit-keyframes opacity-60-25-11-12 {
            0% {
                opacity: 0.895958333333333;
            }
            91.6767% {
                opacity: 0.25;
            }
            91.6867% {
                opacity: 1;
            }
            51.6767% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.895958333333333;
            }
        }

        


        @keyframes opacity-60-25-0-12 {
            0% {
                opacity: 0.25;
            }
            0.01% {
                opacity: 0.25;
            }
            0.02% {
                opacity: 1;
            }
            60.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @keyframes opacity-60-25-1-12 {
            0% {
                opacity: 0.25;
            }
            8.34333% {
                opacity: 0.25;
            }
            8.35333% {
                opacity: 1;
            }
            68.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @keyframes opacity-60-25-2-12 {
            0% {
                opacity: 0.25;
            }
            16.6767% {
                opacity: 0.25;
            }
            16.6867% {
                opacity: 1;
            }
            76.6767% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @keyframes opacity-60-25-3-12 {
            0% {
                opacity: 0.25;
            }
            25.01% {
                opacity: 0.25;
            }
            25.02% {
                opacity: 1;
            }
            85.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @keyframes opacity-60-25-4-12 {
            0% {
                opacity: 0.25;
            }
            33.3433% {
                opacity: 0.25;
            }
            33.3533% {
                opacity: 1;
            }
            93.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.25;
            }
        }
        @keyframes opacity-60-25-5-12 {
            0% {
                opacity: 0.270958333333333;
            }
            41.6767% {
                opacity: 0.25;
            }
            41.6867% {
                opacity: 1;
            }
            1.67667% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.270958333333333;
            }
        }
        @keyframes opacity-60-25-6-12 {
            0% {
                opacity: 0.375125;
            }
            50.01% {
                opacity: 0.25;
            }
            50.02% {
                opacity: 1;
            }
            10.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.375125;
            }
        }
        @keyframes opacity-60-25-7-12 {
            0% {
                opacity: 0.479291666666667;
            }
            58.3433% {
                opacity: 0.25;
            }
            58.3533% {
                opacity: 1;
            }
            18.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.479291666666667;
            }
        }
        @keyframes opacity-60-25-8-12 {
            0% {
                opacity: 0.583458333333333;
            }
            66.6767% {
                opacity: 0.25;
            }
            66.6867% {
                opacity: 1;
            }
            26.6767% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.583458333333333;
            }
        }
        @keyframes opacity-60-25-9-12 {
            0% {
                opacity: 0.687625;
            }
            75.01% {
                opacity: 0.25;
            }
            75.02% {
                opacity: 1;
            }
            35.01% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.687625;
            }
        }
        @keyframes opacity-60-25-10-12 {
            0% {
                opacity: 0.791791666666667;
            }
            83.3433% {
                opacity: 0.25;
            }
            83.3533% {
                opacity: 1;
            }
            43.3433% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.791791666666667;
            }
        }
        @keyframes opacity-60-25-11-12 {
            0% {
                opacity: 0.895958333333333;
            }
            91.6767% {
                opacity: 0.25;
            }
            91.6867% {
                opacity: 1;
            }
            51.6767% {
                opacity: 0.25;
            }
            100% {
                opacity: 0.895958333333333;
            }
        }
    }
</style>
