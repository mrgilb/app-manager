<template>
  <v-app>
    <appRegister
      v-if="!authSet"
      @reg-user="getReg"
      @clear-error="clearError"
      :error="errorAuth"
    />
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
    overlay: false,
    errorAuth: ''
  }),

  methods: {
    async getReg ({
      email,
      password,
      type
    }) {
      try {
        this.overlay = true

        await this.$store.dispatch(type, {
          email,
          password
        })

        this.overlay = false
      } catch (exception) {
      }
    },

    clearError () {
      this.errorAuth = null
    }
  },

  computed: {
    error () {
      return this.$store.getters.error
    },

    authSet () {
      return this.$store.getters.authState
    }
  },

  watch: {
    error (fbError) {
      this.errorAuth = fbError.message
    }
  }
}
</script>
