// 定义food类
class Food {
  // 食物所对应的元素
  element: HTMLElement

  constructor( ) {
    this.element = document.getElementById('food')!  // 表示不可能为空
  }

  // 定义获取食物X坐标的方法
  get X() {
    return this.element.offsetLeft
  }
  // 定义获取食物Y坐标的方法
  get Y() {
    return this.element.offsetTop
  }
  // 定义修改食物位置的方法
  change() {
    // 生成随机位置
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

}

export default Food
