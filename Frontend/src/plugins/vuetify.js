import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VVideo } from 'vuetify/labs/VVideo'
// configuration for vuetify //
export default createVuetify({
    icons: {
        defaultSet: 'mdi',
      },
  components: { VVideo },
})