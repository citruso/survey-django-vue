<template lang="pug" functional>
  #empty-content.text
    span 404
</template>

<script>
export default {
  name: 'NotExist'
}
</script>

<style lang="sass">
#empty-content
  display: flex
  justify-content: center
  align-items: center
  span
    font-size: 48px
    font-weight: 700
    padding: 44vh 0
</style>