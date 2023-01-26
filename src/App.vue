<template>
  <v-app>
    <appRegister @reg-user="getReg"></appRegister>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import appRegister from './components/app-register/app-register.vue'

export default {
  name: 'App',
  components: { appRegister },
  data: () => ({
    overlay: false
  }),
  methods: {
    async getReg ({ email, password, type }) {
      try {
        this.overlay = true

        await this.$store.dispatch(type, { email, password })

        this.overlay = false
      } catch (exception) {}
    }
  }
}
</script>
