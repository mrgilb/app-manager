<template>
  <v-card class="mx-auto app-register" max-width="500" width="320">
    <v-alert
      v-if="error !== ''"
      type="error"
    >
    {{ error }}
  </v-alert>
    <v-form
      class="app-register__reg"
      v-if="showReg"
      transition="fade-transition"
      @submit.prevent
    >
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="stepReg"></v-avatar>
      </v-card-title>

      <v-window v-model="stepReg">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Email"
              value="test@test.com"
              v-model="email"
            >
          </v-text-field>
            <span class="text-caption grey--text text--darken-1">
              This is the email you will use to login to your App-manager account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            >
          </v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
              :rules="isValidConfirmPassword"
            >
          </v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
            <button @click="clickToggleAutn">
              Do you already have an account?
            </button>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <h3 class="text-h6 font-weight-light mb-2">
              Welcome to App-Manager
            </h3>
            <span class="text-caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="stepReg === 1" text @click="stepReg--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="stepReg === 3"
          color="primary"
          depressed
          @click="clickRegButton">
          Next
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-form class="app-register__auth" v-if="!showReg" transition="fade-transition">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>Sign-in</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="stepAuth"></v-avatar>
      </v-card-title>

      <v-window v-model="stepAuth">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Email"
              value="test@test.com"
              v-model="email"
            >
            </v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            >
            </v-text-field>
            <br>
            <button @click="clickToggleAutn">
              Don't have an account yet?
            </button>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <div class="pa-4 text-center">
            <h3 class="text-h6 font-weight-light mb-2">
              Welcome to App-Manager
            </h3>
            <span class="text-caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :disabled="stepAuth === 1"
          text
          @click="stepAuth--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="stepAuth === 2" color="primary" depressed @click="clickAuthButton">
          Auth
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    stepReg: 1,
    stepAuth: 1,
    showReg: false,
    email: '',
    password: ''
  }),

  props: {
    error: String
  },

  computed: {
    currentTitle () {
      switch (this.stepReg) {
        case 1: return 'Sign-up'
        case 2: return 'Create a password'
        default: return 'Account created'
      }
    },

    isValidConfirmPassword () {
      return [value => value === this.password || 'Password doesnt match']
    }
  },

  methods: {
    clickToggleAutn () {
      if (this.showReg) {
        this.showReg = false
      } else {
        this.showReg = true
      }
      this.stepAuth = 1
      this.stepReg = 1
    },

    clickRegButton () {
      this.stepReg++
    },

    clickAuthButton () {
      this.stepAuth++
    }
  },

  watch: {
    stepReg () {
      if (this.stepReg === 3) {
        const email = this.email
        const password = this.password

        this.$emit('reg-user', {
          email,
          password,
          type: 'register'
        })
      }
    },

    stepAuth () {
      if (this.stepAuth === 2) {
        const email = this.email
        const password = this.password

        this.$emit('reg-user', {
          email,
          password,
          type: 'login'
        })
      }
    }
  }
}
</script>

<style lang="scss" src="./app-register.scss">

</style>
