<template>
  <v-app>
    <appRegister @reg-user="getReg"></appRegister>
  </v-app>
</template>

<script>
import appRegister from './components/app-register/app-register.vue'

export default {
  name: 'App',
  components: { appRegister },
  data: () => ({
    //
  }),
  methods: {
    async getReg ({ email, password, type }) {
      await this.$store.dispatch(type, { email, password })
    }
  }
}
</script>
