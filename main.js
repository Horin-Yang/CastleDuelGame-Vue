new Vue({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
        <div class="world">
            <castle v-for="(player, index) in players" :player="player" :index="index" />
            <div class="land" />
        </div>
        <!-- <card :def="testCard" @play="handlePlay" /> -->
        <transition name="hand">
        <hand v-if="!activeOverlay" :cards="testHand" @card-play="testPlayCard" />
        </transition>
        <transition name="fade">
            <div class="overlay-background" v-if="activeOverlay" />
        </transition>
        <transition name="zoom">
            <overlay v-if="activeOverlay" :key="activeOverlay">
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent" :players="players" />
            </overlay>
        </transition>
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
        handlePlay() {
            console.log('You played a card!')
        },

        createTestHand() {
            const cards = []
            // 遍历获取卡牌的id
            const ids = Object.keys(cards)

            // 抽取5张牌
            for (let i = 0; i < 5; i++) {
                cards.push(testDrawCard())
            }

            return cards
        },

        testDrawCard() {
            // 使用id随机选取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            // 返回一张新的卡牌
            return {
                // 卡牌的唯一辨识符
                uid: cardUid++,
                // 定义的id
                id: randomId,
                // 定义对象
                def: cards[randomId],
            }
        },

        // 生命周期钩子 created 初始化 hand
        // created() {
        //     this.testHand = this.createTestHand()
        // },

        testPlayCard(card) {
            // 将卡牌从玩家手中移除即可
            const index = this.testHand.indexOf(card)
            this.testHand.splice(index, 1)
        }
    },
})

// 窗口大小变化的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})

// Tween.js
requestAnimationFrame(animate);

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}