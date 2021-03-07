class Snake {
  head: HTMLElement;  // 蛇头
  bodies: HTMLCollection  // 蛇体（包括头）
  element: HTMLElement; // 蛇对象

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
  }
  // 获取蛇（蛇头）坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇头坐标
  set X(value) {
    // 如果新值和旧值相同，则直接返回不再修改
    if(this.X === value){
      return;
    }
    // X的值的合法范围0-290之间
    if(value < 0 || value > 290){
      // 进入判断说明蛇撞墙了
      throw new Error('蛇撞墙了！');
    }

    // 修改X时，是在修改水平坐标，蛇在向右时，不能向左掉头
    // 思路：如果蛇头位置等于蛇体第二节位置，则出现掉头情况
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 监听到掉头后，重置蛇头方向继续移动
      if (value > this.X) {
        // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X - 10
      }else {
        value = this.X + 10
      }
    }

    // 移动身体
    this.moveBody()

    this.head.style.left = value + 'px'
    // 检查是否撞到身体
    this.checkHeadBody()
  }

  set Y(value) {
    if(this.Y === value){
      return;
    }
    // Y的值的合法范围0-290之间
    if(value < 0 || value > 290){
      // 进入判断说明蛇撞墙了，抛出一个异常
      throw new Error('蛇撞墙了！');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // 监听到掉头后，重置蛇头方向继续移动
      if (value > this.Y) {
        value = this.Y - 10
      }else {
        value = this.Y + 10
      }
    }

    // 移动身体
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }

  // 蛇增加身体
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
  // 蛇身体移动方法
  moveBody() {
    // 后面的身体往前面的身体移动
    // 遍历所有身体
    for(let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      // 将该值设置到当前身体
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';

    }

  }

  // 检查蛇头是否撞到身体的方法
  checkHeadBody(){
    // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
    for(let i=1; i<this.bodies.length; i++){
      let bd = this.bodies[i] as HTMLElement;
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        // 进入判断说明蛇头撞到了身体，游戏结束
        throw new Error('撞到自己了！');
      }
    }
  }
}

export default Snake
