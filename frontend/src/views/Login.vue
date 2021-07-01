<template lang="pug">
#login-page
  form.box.text(@submit.prevent="login")
    #preloader(v-if="isLoading")
    #box-wrap
      legend Вход
      input(
        v-model.lazy.trim="user"
        autofocus
        type="text"
        placeholder="Имя пользователя"
      )
      input(
        v-model.lazy.trim="pass"
        type="password"
        placeholder="Пароль"
      )
      span Нет учетной записи?
        router-link(to="/register")  Зарегистрируйтесь
      button.btn-rect.text Войти
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    user: '',
    pass: '',
    isLoading: false
  }),
  methods: {
    async login() {
      this.isLoading = true

      await this.$store.dispatch('login', {
        'username': this.user,
        'password': this.pass
      })

      if (this.$store.getters.isAuth)
        this.$router.push('/home')

      this.isLoading = false
    }
  }
}
</script>

<style lang="sass">
#login-page
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  background-color: $background
  @media screen and (max-width: 600px)
    background-color: #fff
    align-items: flex-start
  form
    width: 410px
    background-color: #fff
    border-radius: 5px
    position: relative
    @media screen and (max-width: 600px)
      box-shadow: none
      border-radius: 0
    #preloader
      width: 100%
      height: 100%
      background-image: url(../assets/loader.gif)
      background-size: cover
      position: absolute
      opacity: 0.5
    #box-wrap
      padding: 30px 30px 35px 30px
      display: flex
      flex-direction: column
      justify-content: stretch
      @media screen and (max-width: 600px)
        padding: 15px 30px
      legend
        font-size: 24px
        line-height: 33px
        text-align: center
        margin-bottom: 10px
      input
        margin-top: 15px
        padding: 7px 20px 8px 20px
        background-color: $hovered
        border: 1px solid $divider
        border-radius: 3px
        font-size: 14px
        line-height: 19px
        outline: none
        &:focus
          box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.05)
          transform: translateY(-2px)
      span
        margin: 20px 0 20px 0
        text-align: center
        font-size: 14px
        line-height: 19px
      button
        font-weight: 600
        font-size: 16px
        line-height: 22px
        color: #fff
        padding: 7px 0 8px
        text-align: center
        background-color: $submit
        border-radius: 3px
        border: 0
</style>