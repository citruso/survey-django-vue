<template>
<div class="app">
  <router-view name="header" />
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap')
@import "~bootstrap-icons/font/bootstrap-icons.css"

.app
  display: flex
  flex-direction: column
</style>