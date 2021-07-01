<template lang="pug" functional>
#index-page
  #main-wrap
    main
      #block
        #info.text
          #title Пройдите опрос
          #desc Для прохождения опроса Вам необходимо иметь учетную запись. Войдите или Зарегистрируйтесь.
        #placeholder.bi-kanban-fill
      #slider
  footer
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="sass">
#index-page
  footer
    height: 50px
  #main-wrap
    margin-top: 50px
    @media screen and (max-width: $mark)
      margin-top: 90px
    main
      display: flex
      align-items: center
    #block
      position: absolute
      width: 100%
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      #info
        flex: 0 1 422px
        filter: drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.4))
        @media screen and (max-width: 500px)
          zoom: 0.5
        #title
          margin-bottom: 25px
          color: #fff
          font-weight: 700
          font-size: 48px
          line-height: 55px
        #desc
          color: #fff
          font-size: 24px
          line-height: 28px
      #placeholder
        font-size: 200px
        color: #fff
        transform: rotate(180deg) scaleX(1.05)
        margin-left: 50px
        filter: drop-shadow(5px 10px 4px rgba(0, 0, 0, 0.4))
        @media screen and (max-width: 900px)
          display: none
    #slider
      width: 100%
      height: 84vh
      max-height: 667px
      overflow: hidden
      background: url(../assets/slider.png) 0px repeat-x
      animation: slide linear 60s infinite
      @keyframes slide
        0%
          background-position: 0 0
        100%
          background-position: -1268px 0
</style>