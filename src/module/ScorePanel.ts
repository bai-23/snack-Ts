// 定义ScorePanel类
class ScorePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement

  maxLevel: number   // 最大等级常量
  upScore: number   // 升级条件常量

  constructor(maxLevel: number = 10 , upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!

    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 设置加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    // 根据分数升级
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  // 提升等级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel
