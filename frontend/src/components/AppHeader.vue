<template>
<div class="header-wrap">
  <header>
    <nav>
      <router-link class="logo btn" to="/" />
      <div class="user text" v-if="$store.getters.isAuth">
        Account: {{ $store.state.user.username }}
        <i class="btn-circular bi-door-open" @click="exit" />
      </div>
      <div class="buttons" v-else>
        <router-link class="login btn-rect" to="/login">Войти</router-link>
        <router-link class="register btn-rect" to="/register">Зарегистрироваться</router-link>
      </div>
    </nav>
  </header>
</div>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    exit() {
      this.$store.commit('resetUser')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
.header-wrap
  background-color: #fff
  box-shadow: 0 0.7px 0px $divider
  position: fixed
  width: 100%
  z-index: 1

  header
    margin: 0 20px

    @media screen and (max-width: $mark)
      margin: 0 10px

    @media screen and (min-width: 1366px)
      width: 1330px
      margin: 0 auto

    nav
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center

      @media screen and (max-width: 300px)
        transform: scale(0.9)

      @media screen and (max-width: $mark)
        flex-direction: column
        justify-content: center

      .logo
        width: 250px
        height: 30px
        margin: 10px 0
        background-color: $black
        mask: url(../assets/text_logo.svg) no-repeat center / contain

        @media screen and (max-width: $mark)
          margin-bottom: 10px

      .buttons
        display: grid
        grid-gap: 20px
        grid-template-columns: 70px 160px
        margin: 10px 0

        @media screen and (max-width: $mark)
          grid-gap: 13px
          grid-template-columns: 93px 144px

        .login
          border: 1px solid $black
          padding: 6px 17px

          @media screen and (max-width: $mark)
            padding: 6px 28px

        .register
          background: $field
          padding: 6px 20px 8px

          @media screen and (max-width: $mark)
            padding: 6px 12px 8px

      .user
        font-size: 16px
        line-height: 50px
        text-align: end
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        padding-left: 10px
        cursor: pointer
        display: flex
        align-items: center
        position: relative

        &:hover
          background-color: $field

        @media screen and (max-width: $mark)
          text-align: center

        i
          display: flex
          padding: 8px 8px
          margin: 0 10px
</style>
