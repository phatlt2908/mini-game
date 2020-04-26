<template>
  <div @mousedown="startPower" @mouseup="stopPower" class="container" id="wheel">
    <canvas id="canvas" width="500" height="500"></canvas>
    <div class="needle"></div>
    <b-progress id="progress" :value="power" :max="maxPower" show-progress variant="success" animated></b-progress>
    <b-tooltip :show.sync="isShowTooltip" target="progress" placement="bottom">
      <div>Nhấn và giữ<br>để quay mạnh hơn!</div>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  name: 'LuckyWheel',
  props: {
    items: null
  },
  data() {
    return {
      tags: [],
      slices: null,
      sliceDeg: null,
      deg: null,
      speed: 0,
      slowDownRand: 0,
      width: null,
      center: null,
      lock: false,
      vueCanvas: null,
      isStopped: false,
      fontSize: 30,

      interval: false,
      maxPower: 100,
      power: 0,

      isShowTooltip: true
    }
  },
  methods: {
    rand(min, max) {
      return Math.random() * (max - min) + min
    },
    deg2rad(deg) {
      return deg * Math.PI/180
    },
    drawSlice(deg, color) {
      this.vueCanvas.beginPath()
      this.vueCanvas.fillStyle = color
      this.vueCanvas.moveTo(this.center, this.center)
      this.vueCanvas.arc(this.center, this.center, this.width / 2, this.deg2rad(deg), this.deg2rad(deg + this.sliceDeg))
      this.vueCanvas.lineTo(this.center, this.center)
      this.vueCanvas.fill()
    },
    drawText(deg, text) {
      this.vueCanvas.save()
      this.vueCanvas.translate(this.center, this.center)
      this.vueCanvas.rotate(this.deg2rad(deg))
      this.vueCanvas.textAlign = "right"
      this.vueCanvas.fillStyle = "#fff"
      this.vueCanvas.font = this.fontSize + 'px sans-serif'
      this.vueCanvas.fillText(text, 210, 10)
      this.vueCanvas.restore()
    },
    drawImg() {
      this.vueCanvas.shadowBlur = 20
      this.vueCanvas.shadowColor = "black"
      this.vueCanvas.clearRect(0, 0, 500, 500)
      for(var i = 0; i < this.slices; i++) {
        this.drawSlice(this.deg, this.tags[i].color)
        this.drawText(this.deg + this.sliceDeg / 2, this.tags[i].label)
        this.deg += this.sliceDeg
      }
    },
    spin() {
      this.deg += this.speed
      this.deg %= 360
      this.slowDownRand = this.rand(0.994, 0.998)
      this.power = this.power > 0.1 ? this.power *= this.slowDownRand : 0
      // Increment speed
      if (!this.isStopped && this.speed < this.power) {
        this.speed = this.speed + 1 * 0.1
      }
      if (this.speed >= this.power) {
        this.isStopped = true
      }
      // Decrement Speed
      if (this.isStopped) {
        if (!this.lock){
          this.lock = true
        } 
        this.speed = this.speed > 0.05 ? this.speed *= this.slowDownRand : 0
      }
      // Stopped!
      if (this.lock && !this.speed) {
        let ai = Math.floor(((360 - this.deg - 45) % 360) / this.sliceDeg) // deg 2 Array Index
        ai = (this.slices + ai) % this.slices // Fix negative index
        this.isStopped = false
        return this.$swal.fire({
          title: this.tags[ai].label,
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Xóa khỏi danh sách',
          cancelButtonText: 'Đóng',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.giphy.com/media/DKnMqdm9i980E/giphy.gif")
            left top
            no-repeat
          `
        }).then((result) => {
          if (result.value) {
            this.$emit('deleteItem', ai)
          }
        })
      }
      this.drawImg()
      requestAnimationFrame(this.spin)
    },
    generateText() {
      this.tags = []
      this.fontSize = 30
      this.items.forEach(element => {
        this.items.forEach(eCheckLength => {
          if (eCheckLength.length > 10 && this.fontSize > 22) {
            this.fontSize = 22
          } else if (eCheckLength.length > 12 && this.fontSize > 20) {
            this.fontSize = 20
          }
        })
        if (element) {
          if (element.length > 15) {
            element = element.slice(0, 15) + '...'
            this.fontSize = 15
          }
          let tag = {
            label: element.trim(),
            color: this.getRandomColor()
          }
          this.tags.push(tag)
        }
      })
      this.slices = this.tags.length
      this.sliceDeg = 360 / this.slices
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    startPower(){
      if(!this.interval && this.items.length){
      	this.interval = setInterval(() => {
          if (this.power < 100) {
            this.power++
          }
        }, 30)
      }
    },
    stopPower(){
      if (this.power) {
        clearInterval(this.interval)
        this.interval = false
        this.spin()
      }
    }
  },
  mounted() {
    this.generateText()
    let dpi = window.devicePixelRatio
    let c = document.getElementById("canvas")
    let ctx = c.getContext("2d")
    this.width = c.width * 90 / 100
    this.center = c.width / 2
    this.vueCanvas = ctx
    this.drawImg()
  },
  created() {
    this.deg = this.rand(0, 360)
  },
  watch: {
    items() {
      this.generateText()
      this.drawImg()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.luckywheel {
  margin: 40px auto;
  width: 100%;
  height: 100%; 
}
#canvas {
  width: 100%;
  height: 100%;
}
#wheel{
  display:inline-block;
  position:relative;
  overflow:hidden;
  text-align: center;
  cursor: pointer;
}
.needle {
  position: absolute;
  right: 15%;
  top: 15%;
  transform: rotate(-45deg);
  border-top: 30px solid transparent;
  border-right: 60px solid red;
  border-bottom: 30px solid transparent;
  transform-origin: 0 0;
  -webkit-filter: drop-shadow(10px 10px 10px rgba(0,0,0,.5));
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,.5));
}
</style>
