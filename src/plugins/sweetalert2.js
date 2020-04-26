import Vue from "vue";
import Swal from "sweetalert2";

Object.defineProperty(Vue.prototype, "$swal", {
  value: Swal
});
