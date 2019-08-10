import Vue from "vue";
import * as components from "./index";

console.log(components);

Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});
