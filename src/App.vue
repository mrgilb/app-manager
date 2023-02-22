<template>
  <v-app>
    <app-register
      v-if="!authSet"
      @reg-user="getReg"
      @clear-error="clearError"
      :error="errorAuth"
    />

    <app-nav v-if="authSet" />

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    overlay: false,
    errorAuth: ''
  }),

  methods: {
    async getReg ({
      email,
      password,
      name,
      type
    }) {
      try {
        this.overlay = true

        await this.$store.dispatch(type, {
          email,
          password,
          name
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
