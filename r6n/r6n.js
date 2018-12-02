function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getTimestamp() {
  return new Date().getTime()
}

class Experiment {
  initialize() {
    this.metrics = []
    this.metricsSize = 10
    this.display =  new Display(document, document.body)
  }

  run() {
    this.display.initialize()
    this.display.addClickListener(() => { this.clicker() })
    this.waitForMark()
  }

  clicker() {
    if (this.onClick) {
      this.onClick()
    }
  }

  waitForMark() {
    sleep(this.getDelay()).then(() => {
      this.display.drawMarker()
      this.onClick = this.react
      this.markTime = getTimestamp()
    })
  }

  getDelay() {
    const minDelay = 1000
    const maxDelay = 5000
    const grades = 10
    const step = (maxDelay - minDelay) / grades
    return minDelay + getRandomInt(grades) * step
  }

  react() {
    this.reactionTime = getTimestamp()
    this.onClick = null
    const reactionDelay = this.reactionTime - this.markTime
    this.addMetric(reactionDelay)
    this.display.clear()
    this.display.drawText(Math.round(this.getAverageMetric()) + ' ms')
    this.waitForMark()
  }

  addMetric(metric) {
    this.metrics.push(metric)
    if (this.metrics.length > this.metricsSize)
      this.metrics.shift()
  }

  getAverageMetric() {
    return this.metrics.reduce((f, s) => f + s, 0) / this.metrics.length
  }
}

class Display {
  constructor(dom, element) {
    this.dom = dom;
    this.element = element;
  }

  initialize() {
    const canvas = this.dom.createElement('canvas')
    canvas.style.backgroundColor = 'black'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = 'absolute'
    canvas.style.left = 0
    canvas.style.top = 0
    canvas.style.zIndex = 100000
    this.element.appendChild(canvas)
    this.canvas = canvas
  }

  addClickListener(listener) {
    this.canvas.addEventListener('click', listener)
    this.dom.addEventListener('keypress', listener)
  }

  drawMarker() {
    const size = Math.min(this.canvas.height, this.canvas.width)
    const boxWidth = size /5
    const boxHeight = size / 5
    const context = this.canvas.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(this.canvas.width / 2 - boxWidth / 2,
    this.canvas.height / 2 - boxHeight / 2, boxWidth, boxHeight)
  }

  clear() {
    const context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawText(text) {
    const context = this.canvas.getContext('2d')
    context.fillText(text, 30, 30)
  }
}

function r6n() {
  var experiment = new Experiment()
  experiment.initialize()
  experiment.run()
}