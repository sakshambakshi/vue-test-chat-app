import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'


const tooltipDirective = (app) => {
    
    app.directive("tooltip", {
      mounted(el, binding) {
        init(el, binding);
      },
      updated(el, binding) {
        init(el, binding);
      }
    });
  };
  
  function init(el, binding) {
    
    let position = binding.arg || "top";
    let tooltipText = binding.value || "Tooltip text";
    alert(tooltipText)
    el.setAttribute("position", position);
    el.setAttribute("tooltip", tooltipText);
  }


const APP = createApp(App)
tooltipDirective(APP)
APP.use(store)
APP.mount('#app')
