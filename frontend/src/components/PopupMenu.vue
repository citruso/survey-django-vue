<template>
<div class="popup-menu box">
  <ol class="text">
    <slot />
  </ol>
</div>
</template>

<script>
export default {
  name: 'PopupMenu'
}
</script>

<style lang="sass">
.popup-menu
  position: absolute
  bottom: 50px
  padding: 7px 0
  width: 100%
  overflow: visible

  .active
    background: $field

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

  ol > li
    font-size: 13px
    line-height: 18px
    padding: 8px 10px

    &:before
      padding-right: 5px
</style>