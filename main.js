new Vue({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app">
    <top-bar/>
    </div>`,

    // 比较实例数据对象和全局state对象
    mounted() {
        console.log(this.$data === state)
    },
})

// 窗口大小变化的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})