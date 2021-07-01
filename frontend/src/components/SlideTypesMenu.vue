<template lang="pug">
#types-menu.box
  ol.text
    li(
      v-for="item in typesList"
      :class="[item.class, active(item.type)]"
      @click="$emit('select-type', item.type)"
    ) {{ item.text }}
</template>

<script>
import types from '../store/types'

export default {
  name: 'SlideTypes',
  props: ['activeType'],
  data: () => ({
    typesList: types
  }),
  methods: {
    active(type) {
      return this.activeType == type ? 'active' : ''
    }
  }
}
</script>

<style lang="sass">
#types-menu
  position: absolute
  bottom: 50px
  padding: 7px 0
  width: 100%
  overflow: visible
  .active
    background: $field
  ol > li
    font-size: 13px
    line-height: 18px
    padding: 8px 10px
    &::before
      padding-right: 5px
  &:after
    position: absolute
    text-align: center
    content: ''
    width: 0
    height: 0
    border: solid transparent
    border-width: 5px
    border-top-color: #fff
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))
    margin: 7px 68px
</style>