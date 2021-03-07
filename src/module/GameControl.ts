// 游戏控制器，控制其他所有类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  over: HTMLElement
  direction: string = '' // 存储蛇的移动方向（按键方向）
  isLive = true;  // 创建一个属性用来记录游戏是否结束

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2)

    this.over = document.getElementById('over')!
    this.init();
  }


  // 初始化游戏，调用后开始游戏
  init() {
    // 绑定键盘按下事件
    document.addEventListener("keydown", this.keydownHandler.bind(this))

    this.food.change()
    // 调用run（），使蛇移动
    this.run();

  }

  // 创建键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // 检查按键是否合法
    // if (event.key)
    // 将按下的值存到direction
    this.direction = event.key;
  }

  /*
  * 控制蛇移动的方法
  * 目标：根据direction来改变
  *     向上 top 减少
  *     向下 top 增加
  *     向左 left 减少
  *     向右 left 增加
  * */
  run() {
    // 获取当前坐标
    let X = this.snake.X
    let Y = this.snake.Y

    // 根据方向修改X、Y值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动 top 减少
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        // 向下移动 top 增加
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        // 向左移动 left 减少
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        // 向右移动 left 增加
        X += 10;
        break;
    }

    // 检查蛇是否吃到食物
    this.checkEat(X, Y)

    // 修改位置
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      // alert(e.message)
      this.over.style.cssText = "display: block"
      this.isLive = false
    }


    // 开启定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 刷新食物物资
      this.food.change()
      // 加分
      this.scorePanel.addScore()
      // 蛇增加一节
      this.snake.addBody()
    }
  }

}

export default GameControl
