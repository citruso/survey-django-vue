<template lang="pug">
section#nav-menu.box
  nav.text
    ol
      router-link(to="/home" tag="li") Все опросы
      router-link(to="/home/completed" tag="li") Завершенные
      router-link(to="/home/favs" tag="li") Закладки
    ol#items(v-if="openPolls.length")
      .divider
      li(
        v-for="poll in openPolls"
        :key="poll.id"
        :class="active(poll.id)"
        @click="navigate(poll)"
      )
        span {{ poll.name | formattedName }}
        i.btn-circular.bi-x(@click.stop="closePoll(poll.id)")
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'NavMenu',
  computed: {
    ...mapState({
      openPolls: state => state.home.openPolls
    }),
    ...mapGetters([
      'getName',
      'getActiveID',
      'getActivePoll'
    ])
  },
  methods: {
    active(id) {
      return this.getActiveID == id
        ? 'router-link-exact-active'
        : 'router-link-active'
    },
    navigate(poll) {
      if (this.getActiveID != poll.id) {
        this.$store.commit('setPoll', poll)
        document.title = this.$options.filters.formattedName(poll.name)
        this.$router.push(poll.id == -1 ? '/poll/new' : `/poll/${poll.id}`)
      }
    },
    closePoll(id) {
      this.$store.commit('closePoll', id)

      if (this.$route.path.includes('poll'))
        this.$router.push('/home')
    }
  },
  created() {
    this.openPolls.map(poll => {
      if (poll.id == -1 || this.$store.dispatch('getPoll', poll.id))
        return poll

      this.$store.commit('closePoll', poll.id)
    })
  }
}
</script>

<style lang="sass">
#nav-menu
  flex: 0 0 250px
  min-width: 136px
  max-width: 250px
  padding: 7px 0
  white-space: nowrap
  @media screen and  (max-width: $mark)
    display: none
  #items
    li
      &:hover i
        opacity: 1
      @media screen and  (max-width: $mark)
        padding-right: 0
        text-align: center
      i
        font-size: 16px
        line-height: 19px
        padding: 4px 5px
        margin-right: 15px
        opacity: 0
        @media screen and  (max-width: $mark)
          margin: 0 5px 0 15px
  ol
    text-overflow: ellipsis
    overflow: hidden
    li
      padding: 0 0 0 20px
      font-size: 14px
      line-height: 37px
      border-left: none
      display: flex
      justify-content: space-between
      align-items: center
      @media screen and  (max-width: $mark)
        padding: 0 20px
      span
        text-overflow: ellipsis
        overflow: hidden
        padding-right: 10px
    .router-link-exact-active
      background-color: $field
      border-left: 3px solid $link
      padding-left: 17px
</style>