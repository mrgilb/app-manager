<template>
  <v-card class="mx-auto app-register" max-width="500" width="320">
    <v-alert
      v-if="error !== ''"
      type="error"
    >
      {{ errorMessage }}
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
              v-model.trim="$v.email.$model"
              :rules="isValidEmail"
            >
            </v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Этот email вы будете использовать для входа в аккаунт
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Password"
              type="password"
              v-model="$v.password.$model"
              :rules="isValidPassword"
            >
            </v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
              v-model="confirmPassword"
              :rules="isValidConfirmPassword"
            >
            </v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Пожалуйста введите пароль от вашего аккаунта
            </span>
            <br />
            <button @click="clickToggleAuth">
              У вас уже есть аккаунт?
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
          Назад
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="stepReg === 1"
          :disabled="email && $v.email.$error"
          color="primary"
          depressed
          @click="clickRegButton">
          Далее
        </v-btn>
        <v-btn
          v-if="stepReg >= 2"
          :disabled="stepReg === 3 || $v.password.$error || password !== confirmPassword"
          color="primary"
          depressed
          @click="clickRegButton">
          Далее
        </v-btn>
      </v-card-actions>
    </v-form>

    <v-form class="app-register__auth" v-if="!showReg" transition="fade-transition">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>Авторизация</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="stepAuth"></v-avatar>
      </v-card-title>

      <v-window v-model="stepAuth">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Email"
              value="test@test.com"
              v-model="$v.email.$model"
              :rules="isValidEmail"
            >
            </v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="$v.password.$model"
              :rules="isValidPassword"
            >
            </v-text-field>
            <br>
            <button @click="clickToggleAuth">
              У вас нет аккаунта?
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
          Назад
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="stepAuth === 2 || isDisableNextButton"
          color="primary"
          depressed
          @click="clickAuthButton"
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { errorListMap } from '../../maps'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    stepReg: 1,
    stepAuth: 1,
    showReg: false,
    email: '',
    password: '',
    confirmPassword: '',
    activePage: 'auth'
  }),

  validations: {
    email: {
      required,
      email
    },

    password: {
      required,
      minLength: minLength(6)
    }
  },

  props: {
    error: String
  },

  computed: {
    currentTitle () {
      switch (this.stepReg) {
        case 1:
          return 'Регистрация'
        case 2:
          return 'Придумайте пароль'
        default:
          return 'Регистрация завершена'
      }
    },

    isValidPassword () {
      return [!this.$v.password.$error || 'Пароль должен содержать не менее 6 символов']
    },

    isValidConfirmPassword () {
      return [value => value === this.password || 'Пароль не совпадает']
    },

    isValidEmail () {
      return [!this.$v.email.$error || 'Введите в формате test@test.ru']
    },

    errorMessage () {
      return errorListMap[this.error]
    },

    isDisableNextButton () {
      this.$v.email.$touch()
      this.$v.password.$touch()
      return this.$v.email.$error || this.$v.password.$error
    }
  },

  methods: {
    clickToggleAuth () {
      this.showReg = !this.showReg
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
  },

  mounted () {
    this.$refs.reg ? this.activePage = 'reg' : this.activePage = 'auth'
  },

  updated () {
    this.$refs.reg ? this.activePage = 'reg' : this.activePage = 'auth'
  }
}
</script>

<style lang="scss" src="./app-register.scss">

</style>
