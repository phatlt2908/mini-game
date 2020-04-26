<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Đây nè</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{name: 'wheel'}">
              <div class="btn" :class="{'btn-success': $route.meta.active === 'wheel', 'btn-outline-success': $route.meta.active != 'wheel'}">Vòng quay</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'ranNum'}">
              <div class="btn" :class="{'btn-primary': $route.meta.active === 'ranNum', 'btn-outline-primary': $route.meta.active != 'ranNum'}">Số ngẫu nhiên</div>
            </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Gửi phản hồi</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'top',
  props: {
    msg: String
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
nav {
  margin-bottom: 20px;
  box-shadow: black 0 0 10px;
}
</style>
