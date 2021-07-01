<template lang="pug">
  section#action-menu.box
    nav.text
      ol(v-if="getActiveID == -1")
        li#fadeButton(@click="save") Сохранить
          i.bi-check2
        .divider
        li(
          :class="this.isDoneToPublish ? 'enabled' : 'disabled'"
          @click="publishPoll"
        ) Опубликовать
      ol(v-else)
        li#fadeButton(@click="updateFavs") Добавить в закладки
          i.bi-check2
        li(v-if="isAdmin" @click="deletePoll") Удалить
        .divider(v-if="!isCompleted(getActiveID)")
        li(
          v-if="!isCompleted(getActiveID)"
          :class="this.isDoneToAnswer ? 'enabled' : 'disabled'"
          @click="createAnswer"
        ) Отправить ответ
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActionMenu',
  computed: {
    ...mapGetters([
      'isDoneToPublish',
      'isDoneToAnswer',
      'getActiveID',
      'isCompleted',
      'isAdmin',
    ])
  },
  methods:{
    ...mapActions([
      'createAnswer',
      'publishPoll',
      'deletePoll'
    ]),
    save(e) {
      e.target.children[0].classList.add('fade')
      setTimeout(() => e.target.children[0].classList.remove('fade'), 2000)
    },
    updateFavs(e) {
      e.target.children[0].classList.add('fade')
      setTimeout(() => e.target.children[0].classList.remove('fade'), 2000)
      this.$store.commit('toggleFav', this.getActiveID)
      this.$store.dispatch('updateUserData')
    }
  }
}
</script>

<style lang="sass">
#action-menu
  flex: 0 0 250px
  max-width: 250px
  padding: 7px 0
  white-space: nowrap
  @media screen and  (max-width: $mark)
    flex-grow: 1
    flex-shrink: 1
    max-width: none
  ol
    #fadeButton
      display: flex
      justify-content: space-between
      i
        opacity: 0
        font-size: 18px
    & > li
      padding: 9px 20px
      font-size: 14px
      line-height: 19px
  .disabled
    color: $divider
    pointer-events: none
  .enabled
    color: $link
  .fade
    animation: opacity 3s
    @keyframes opacity
      0%
        opacity: 1
      100%
        opacity: 0
</style>