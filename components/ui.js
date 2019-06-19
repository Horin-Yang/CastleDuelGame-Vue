Vue.component('top-bar', {
    template: `<div class="top-bar" :class="'player-' + currentPlayerIndex">
    <div class="player p0">{{ players[0].name }}</div>
    <div class="turn-counter">
    <img class="arrow" src="svg/turn.svg" />
    <div class="turn">Turn {{ turn }}</div>
    </div>
    <div class="player p1">{{ players[1].name }}</div>
    </div>`,
    // 父组件通信的三个子组件
    props: ['players', 'currentPlayerIndex', 'turn'],
    created() {
        console.log(this.currentPlayerIndex)
    },
})

Vue.component('card', {
    template: `<div class="card" :class="'type-' + def.type" @click='play'>
    <div class="title">{{ def.title }}</div>
    <img class="separator" src="svg/card-separator.svg" />
    <div class="description"><div v-html="def.description"></div></div>
    <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
    </div>`,
    props: ['def'],
    methods: {
        play () {
            this.$emit('play', 'orange', '12')
        }
    },
})

Vue.component('hand', {
    template: `<div class="hand">
        <div class="wrapper">
            <!-- 卡牌 -->
            <card v-for="card of cards" :key="cardUid" :def="card.def" />
        </div>
    </div>`,

    props: ['cards'],

})