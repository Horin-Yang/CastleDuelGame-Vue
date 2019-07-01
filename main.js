new Vue({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app" :class="cssClass">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
        <div class="world">
            <castle v-for="(player, index) in players" :player="player" :index="index" />
            <div class="land" />
            <div class="clouds">
                <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
            </div>
        </div>
        <!-- <card :def="testCard" @play="handlePlay" /> -->
        <transition name="hand">
        <hand v-if="!activeOverlay" :cards="currentHand" @card-play="handlePlayCard" @card-leave-end="handleCardLeaveEnd" />
        </transition>
        <transition name="fade">
            <div class="overlay-background" v-if="activeOverlay" />
        </transition>
        <transition name="zoom">
            <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent" :players="players" />
            </overlay>
        </transition>
    </div>`,

    computed: {
        testCard() {
            return cards.archers
        },

        cssClass() {
            return {
                'can-play': this.canplay,
            }
        },
    },

    methods: {
        handlePlay() {
            console.log('You played a card!')
        },

        // createTestHand() {
        //     const cards = []
        //     // 遍历获取卡牌的id
        //     const ids = Object.keys(cards)

        //     // 抽取5张牌
        //     for (let i = 0; i < 5; i++) {
        //         cards.push(testDrawCard())
        //     }

        //     return cards
        // },

        // // 生命周期钩子 created 初始化 hand
        // created() {
        //     this.testHand = this.createTestHand()
        // },

        // testDrawCard() {
        //     // 使用id随机选取一张卡牌
        //     const ids = Object.keys(cards)
        //     const randomId = ids[Math.floor(Math.random() * ids.length)]
        //     // 返回一张新的卡牌
        //     return {
        //         // 卡牌的唯一辨识符
        //         uid: cardUid++,
        //         // 定义的id
        //         id: randomId,
        //         // 定义对象
        //         def: cards[randomId],
        //     }
        // },

        // testPlayCard(card) {
        //     // 将卡牌从玩家手中移除即可
        //     const index = this.testHand.indexOf(card)
        //     this.testHand.splice(index, 1)
        // }

        handlePlayCard(card) {
            playCard(card)
        },

        handleCardLeaveEnd() {
            console.log('card leave end');
            applyCard()
        },

        handleOverlayClose () {
            overlayCloseHandlers[this.activeOverlay]()
        },
    },

    // 比较实例数据对象和全局state对象
    mounted() {
        // console.log(this.$data === state)
        beginGame()
    },
})

var overlayCloseHandlers = {
    'player-turn' () {
        if (state.turn = 1) {
            state.activeOverlay = 'last-play'
        } else {
            newTurn()
        }
    },

    'last=-play' () {
        newTurn()
    },

    'game-over' () {
        // 重新加载游戏
        document.location.reload()
    },
}

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

function beginGame() {
    state.players.forEach(drawInitialHand)
}

function playCard(card) {
    if (state.canplay) {
        state.canplay = false
        currentPlayingCard = card

        // 将手牌从玩家手牌中移除
        const index = state.currentPlayer.hand.indexOf(card)
        state.currentPlayer.hand.splice(index, 1)

        // 卡牌放到弃牌堆中
        addCardToPile(state.discardpile, card.id)
    }
}

function applyCard() {
    const card = currentPlayingCard

    applyCardEffect(card)

    // 稍等一会，让玩家观察到发生了什么
    setTimeout (() => {
        // 检查玩家是否死亡
        state.players.forEach(checkPlayerLost)

        if (isOnePlayerDead()) {
            endGame()
        } else {
            nextTurn()
        }
    }, 700)
}

function nextTurn() {
    state.turn++
    state.currentPlayerIndex = state.currentOpponentId
    state.activeOverlay = 'player-turn'
}

function newTurn() {
    state.activeOverlay = null
    if (state.currentPlayer.skipTurn) {
        skipTurn()
    } else {
        startTurn()
    }
}

function skipTurn() {
    state.currentPlayer.skippedTurn = true
    state.currentPlayer.skipTurn = false
    nextTurn()
}

function startTurn() {
    state.currentPlayer.skippedTurn = false
    // 如果两名玩家都已经王国一回合
    if (state.turn > 2) {
        // 抽一张新的卡牌
        setTimeout(() => {
            state.currentPlayer.hand.push(drawCard())
            state.canplay = true
        }, 800);
    } else {
        state.canplay = true
    }
}

function endGame() {
    state.activeOverlay = 'game-over'
}