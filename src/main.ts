import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/pl'
import { setCssVar } from 'quasar'

import 'quasar/dist/quasar.css'

setCssVar('primary', '#111111')
setCssVar('secondary', '#b4b4b480')

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  lang: quasarLang
})

app.mount('#app')
