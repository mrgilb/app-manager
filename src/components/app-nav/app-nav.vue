<template>
  <div class="app-nav">
      <v-app-bar
        color="blue"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>App-manager</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="blue--text text--accent-4"
          >
            <v-list-item @click="handleClickExit">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Выход</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cash-fast</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Расходы</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'app-nav',
  data () {
    return {
      drawer: false,
      group: null
    }
  },
  methods: {
    handleClickExit () {
      this.$store.commit('setAuthState', false)
    }
  }
}
</script>

<style lang="scss" src="./app-nav.scss"/>
