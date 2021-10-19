<template>
<div class="box nav-menu">
  <nav class="text">
    <ol>
      <router-link to="/home" tag="li">Все опросы</router-link>
      <router-link to="/home/completed" tag="li">Завершенные</router-link>
      <router-link to="/home/bookmarks" tag="li">Закладки</router-link>
    </ol>
    <ol class="items" v-if="openPolls.length">
      <i class="divider" />
      <router-link
        v-for="poll in openPolls"
        :key="poll.id"
        :to="poll.id == -1 ? '/poll/new' : `/poll/${poll.id}`"
        tag="li">
        <span>{{ poll.name | formattedName }}</span>
        <i class="btn-circular bi-x" @click.stop="close(poll.id)" />
      </router-link>
    </ol>
  </nav>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavMenu',
  computed: mapState({
    openPolls: state => state.home.openPolls
  }),
  methods: {
    close(id) {
      this.$store.commit('closePoll', id)

      if (this.$route.params.id == id)
        this.$router.push('/home')
    }
  },
  created() {
    this.openPolls.filter(poll => { // TODO: make it single request
      if (poll.id == -1 || this.$store.dispatch('getPoll', poll.id))
        return true

      this.$store.commit('closePoll', poll.id)
    })
  }
}
</script>

<style lang="sass">
.nav-menu
  flex: 0 0 250px
  min-width: 136px
  max-width: 250px
  padding: 7px 0
  white-space: nowrap

  @media screen and  (max-width: $mark)
    display: none

  .items li
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

    .router-link-exact-active
      background-color: $field
      border-left: 3px solid $link
      padding-left: 17px

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
</style>