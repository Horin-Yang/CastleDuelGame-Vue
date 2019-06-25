Vue.component('castle', {
    template: `<div class="castle" :class="'player-' + index">
        <img class="building" :src="'svg/castle' + index + '.svg'" />
        <img class="ground" :src="'svg/ground' + index + '.svg'" />
        <!-- 这里添加一个城堡旗帜（castle-banners）组件 -->
    </div>`,

    props:['player', 'index'],
})