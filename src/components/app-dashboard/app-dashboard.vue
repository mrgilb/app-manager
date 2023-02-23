<template>
  <v-container class="app-dashboard rounded-lg" fluid>
    <v-sparkline
      :fill="fill"
      :gradient="selectedGradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="value"
      auto-draw
      :label-size="4"
    >
      <template v-slot:label="item">
        {{ item.value }} &#8381;
      </template>
    </v-sparkline>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      name: 'app-dashboard',
      fill: false,
      selectedGradient: ['#42b3f4'],
      padding: 20,
      radius: 10,
      value: [10232, 7567, 4352, 1203, 43223, 31223, 20011, 14300, 25664, 12331],
      width: 2
    }
  },
  props: {
    generalSummary: {
      type: Object,
      default: () => {
        return {
          costs: [],
          cash: [],
          target: '63000'
        }
      }
    }
  }
}
</script>

<style lang="scss" src="./app-dashboard.scss"/>
