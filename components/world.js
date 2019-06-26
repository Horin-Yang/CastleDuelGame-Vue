Vue.component('castle', {
    template: `<div class="castle" :class="'player-' + index">
        <img class="building" :src="'svg/castle' + index + '.svg'" />
        <img class="ground" :src="'svg/ground' + index + '.svg'" />
        <!-- 这里添加一个城堡旗帜（castle-banners）组件 -->
        <castle-banners :player="player" />
    </div>`,

    props:['player', 'index'],
})

Vue.component('castle-banners', {
    template: `<div class="banners">
        <!-- 食物 -->
        <img class="food-icon" src="svg/food-icon.svg" />
        <!-- 小气泡 -->
        <bubble type="food" :value="player.food" :ratio="foodRatio" />
        <!-- 旗帜栏 -->
        <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

        <!-- 生命值 -->
        <img class="health-icon" src="svg/health-icon.svg" />
        <!-- 小气泡 -->
        <bubble type="health" :value="player.health" :ratio="healthRatio" />
        <!-- 旗帜栏 -->
        <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
    </div>`,

    props: ['player'],

    computed: {
        foodRatio() {
            return this.player.food / maxFood
        },
        healthRatio() {
            return this.player.health / maxHealth
        },
    },
})

Vue.component('bubble', {
    template: `<div class="stat-bubble" :class="type + '-bubble'" :style="bubbleSytle">
        <img :src="'svg/' + type + '-bubble.svg'" />
        <div class="counter">{{ value }}</div>
    </div>`,

    props: ['type', 'value', 'ratio'],

    computed: {
        bubbleSytle() {
            return {
                top: (this.ratio * 220 + 40) * state.worldRatio + 'px',
            }
        },
    },
})

Vue.component('banner-bar', {
    data() {
        return {
            height: 0,
        }
    },

    template:'#banner',

    props: ['color', 'ratio'],

    computed: {
        targetHeight() {
            return 220 * this.ratio + 40
        },
    },

    created() {
        this.height = this.targetHeight
    },

    watch: {
        targetHeight(newValue, oldValue) {
            const vm = this
            new TWEEN.Tween({ value: oldValue})
                .easing(TWEEN.Easing.Cubic.InOut)
                .to({ value: newValue }, 500)
                .onUpdate(function() {
                    vm.height = this.value.toFixed(0)
                })
                .start()
        }
    },
})