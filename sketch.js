let amplitude = 600
let speed = 80
let spacing = 50
let lineWeight = 15
let colors = [
  [220, 135, 45],
  [235, 80, 55],
  [0, 140, 110],
  [50, 150, 200],
  [220, 160, 160]
]

let thesis = [
  `Hey! My name is Paha Kuprin`,
  `I'm a generative artist from Russia`,
  `I express my sense of rhythm with the superpower of code`,
  `Follow my artistic journey on Twitter`,
]

let URL = 'https://twitter.com/pahakuprin'

let timer = 0
let scroll = 0
let isRederected = false
let collapsedMode = false

let prevX = 0

function setup() {
  pixelDensity(1)

  createCanvas()
  windowResized()
  
  textFont('Nunito Sans')
  textSize(36)
}

function draw() {
  background(25)

  timer = constrain(timer += 0.015, 0, 1)
  let animationValue = isRederected ? timer : 1 - timer

  let centerY = floor(height / 2)

  push()

  let offsetX = floor(width % spacing / 2)
  translate(offsetX, centerY)

  for (let x = 0; x < width; x += spacing) {
    let time = x / amplitude + frameCount / speed
    let lineHeight = map(pow(sin(time), 3), -0.2, 0.8, 70, height)

    let index = floor((x / spacing) % (colors.length))
    let lineColor = colors[index]

    stroke(lineColor)
    strokeWeight(lineWeight)

    line(x, -lineHeight / 2, x, lineHeight / 2)
  }

  pop()

  fill(25)
  noStroke()

  rect(0, centerY - 60, width, 55) 
  rect(0, centerY, width, 10)

  if (isRederected) {
    rect(0, centerY - 20, width, animationValue * -(centerY - 60))
    rect(0, centerY + 10, width, animationValue * (height - centerY - 10))
  }

  fill(240)
  noStroke()

  if (collapsedMode) {
      textAlign(LEFT, CENTER)
      let x = scroll + 55
      let y = centerY - 30
      text(thesis.join(' '), x, y)
  } else {
    textAlign(CENTER, CENTER)
    thesis.map((statment, index) => {
      let x = scroll + index * width + width / 2
      let y = centerY - 30
      text(statment, x, y)
    })
  }

  background(0, animationValue * 255)
}

function mouseWheel({ delta }) {
  if (isRederected) return

  let maxLength = collapsedMode ? textWidth(thesis.join(' ')) - width + 2 * 55: (thesis.length - 1) * width

  scroll -= constrain(delta, -80, 80)
  if (scroll < -maxLength) {
    if (isRederected === false) {
      isRederected = true
      window.open(URL, '_self')
      timer = 0
    }
  }

  scroll = constrain(scroll, -maxLength, 0)
}

function mousePressed() {
  prevX = mouseX
}

function mouseDragged() {
  let delta = prevX - mouseX
  mouseWheel({ delta })
  prevX = mouseX
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  collapsedMode = thesis.some((statment) => textWidth(statment) > width)
}
