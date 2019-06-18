new Vue({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    <card :def="testCard" @play="handlePlay" />
    </div>`,

    // 比较实例数据对象和全局state对象
    mounted() {
        console.log(this.$data === state)
    },

    computed: {
        testCard() {
            return cards.archers
        },
    },

    methods: {
        handlePlay(color, number) {
            console.log('You played a card!', 'color=', color, 'number=', number)
        },
    },
})

// 窗口大小变化的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})