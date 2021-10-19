<template>
<div class="home-page">
  <div class="main-wrap">
    <main>
      <router-view name="leftside" />
      <router-view />
      <router-view name="rightside" />
    </main>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="sass">
.home-page
  .main-wrap
    margin-top: 50px
    padding: 20px

    @media screen and (max-width: $mark)
      padding: 0
      margin-top: 100px

    main
      display: flex
      flex-direction: row
      align-items: flex-start
      justify-content: center
      grid-gap: 20px

      @media screen and (max-width: $mark)
        flex-direction: column-reverse
        grid-gap: 0px
</style>