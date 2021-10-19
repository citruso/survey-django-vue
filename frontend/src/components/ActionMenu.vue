<template>
<div class="box action-menu">
  <nav class="text">
    <ol v-if="pollID == -1">
      <li class="fade-button" @click="save">
        Сохранить
        <i class="bi-check2" :class="{'fade': fade}" />
      </li>
      <i class="divider" />
      <li
        :class="isPoll ? 'enabled' : 'disabled'"
        @click="eventBus.$emit('publish-poll')">
        Опубликовать
      </li>
    </ol>
    <ol v-else>
      <li class="fade-button" @click="updateFavs">
        Добавить в закладки
        <i class="bi-check2" :class="{'fade': fade}" />
      </li>
      <li v-if="isAdmin" @click="eventBus.$emit('delete-poll')">Удалить</li>
      <i class="divider" v-if="!isPollCompleted(pollID)" />
      <li
        v-if="!isPollCompleted(pollID)"
        :class="isAnswer ? 'enabled' : 'disabled'"
        @click="eventBus.$emit('create-answer')">
        Отправить ответ
      </li>
    </ol>
  </nav>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ActionMenu',
  data: () => ({
    fade: false,
    isPoll: false,
    isAnswer: false
  }),
  computed: {
    ...mapGetters([
      'getOpenPoll',
      'isPollCompleted',
      'isAdmin',
    ]),
    pollID() {
      return +this.$route.params.id
    }
  },
  methods: {
    fadeIt() {
      this.fade = true
      setTimeout(() => this.fade = false, 2000)
    },
    save() {
      this.fadeIt()
    },
    updateFavs() {
      this.fadeIt()
      this.$store.commit('toggleFav', this.pollID)
      this.$store.dispatch('updateUserData')
    }
  },
  mounted() {
    this.eventBus.$on('poll-updated', payload => {
      Object.assign(this.$data, payload)
    })
  }
}
</script>

<style lang="sass">
.action-menu
  flex: 0 0 250px
  max-width: 250px
  padding: 7px 0
  white-space: nowrap

  @media screen and  (max-width: $mark)
    flex-grow: 1
    flex-shrink: 1
    max-width: none

  ol
    .fade-button
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