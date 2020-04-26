<template>
  <div class="row">
    <div class="spinner-main col-md-3">
    </div>
    <div class="spinner-main col-md-6">
      <LuckyWheel :items="items" @deleteItem="deleteItem($event)"/>
    </div>
    <div class="spinner-side col-md-3">
      <!-- <div>Nhập thông tin:</div> -->
      <div class="btn-option">
        <span @click="sort" class="btn btn-light btn-sm">Sắp xếp <i v-if="isASC" class="fas fa-sort-up"></i><i v-else class="fas fa-sort-down"></i></span>
        <span @click="shuffle()" class="btn btn-light btn-sm">Xáo trộn <i class="fas fa-random"></i></span>
        <span class="btn btn-light btn-sm">Thêm ảnh <i class="far fa-image"></i></span>
      </div>
      <div>
        <textarea v-model="text" class="form-control" rows="15"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

import LuckyWheel from '@/components/SpinnerLuckyWheel.vue'

export default {
  name: 'Spinner',
  components: {
    LuckyWheel
  },
  data() {
    return {
      items: [],
      text: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15',
      isASC: false
    }
  },
  methods: {
    sort() {
      this.isASC = !this.isASC
      if (this.isASC) {
        this.items.sort()
      } else {
        this.items.reverse()
      }
      this.text = ''
      let char = ''
      this.items.forEach(element => {
        this.text += char + element
        char = '\n'
      })
    },
    shuffle() {
      var currentIndex = this.items.length, temporaryValue, randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = this.items[currentIndex]
        this.items[currentIndex] = this.items[randomIndex]
        this.items[randomIndex] = temporaryValue
      }
      this.text = ''
      let char = ''
      this.items.forEach(element => {
        this.text += char + element
        char = '\n'
      })
    },
    deleteItem(index) {
      if (index > -1) {
        this.items.splice(index, 1)
      }
      this.text = ''
      let char = ''
      this.items.forEach(element => {
        this.text += char + element
        char = '\n'
      })
    }
  },
  watch: {
    text() {
      this.items = this.text.split('\n')
    }
  },
  created() {
    this.items = this.text.split('\n')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn-option .btn {
  margin: 5px;
}
</style>
