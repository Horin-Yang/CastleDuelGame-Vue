// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // 用户界面
  activeOverlay: null,

  // World
  worldRatio: getWorldRatio(),
  // TODO Other things
  // 游戏
  turn: 1,
  players: [
    {
      name: 'Anne of Cleves',
      // 游戏开始时状态
      food: 10,
      health: 10,
      // 是否跳过下个回合
      skipTurn: false,
      // 跳过了上个回合
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: null,
      deed: false,
    },
    {
      name: 'William the Bald',
      // 游戏开始时状态
      food: 10,
      health: 10,
      // 是否跳过下个回合
      skipTurn: false,
      // 跳过了上个回合
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: null,
      deed: false,
    },
  ],
  currentPlayerIndex: Math.round(Math.random()),

  // 临时属性，测试用
  testHand: [],
}
