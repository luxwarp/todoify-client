import Vue from "vue";
import * as components from "./index";

Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});
