<template>
<div class="polls-list box">
  <div class="search bi-search">
    <input v-model.trim="search" placeholder="Поиск" />
    <router-link
      class="create btn-circular bi-pencil-square"
      v-if="$store.getters.isAdmin"
      to="/poll/new"
      tag="div"
    />
  </div>
  <ol class="items text">
    <polls-list-item
      v-for="poll in filteredPolls"
      :key="poll.id"
      :poll="poll"
    />
  </ol>
</div>
</template>

<script>
import PollsListItem from './PollsListItem'

export default {
  name: 'PollsList',
  components: {
    PollsListItem
  },
  data: () => ({
    search: '',
    polls: []
  }),
  computed: {
    filteredPolls() {
      const str = this.search.toLowerCase()
      return this.polls.filter(poll => {
        return Object.values(poll).some(value => {
          return value.toString().toLowerCase().includes(str)
        })
      })
    }
  },
  methods: {
    queryset(path) { // update local data when url changes
      switch(path) {
        case '/home/completed':
          this.polls = this.$store.getters.getCompletedPolls
          break
        case '/home/bookmarks':
          this.polls = this.$store.getters.getFavsPolls
          break
        default:
          this.polls = this.$store.state.home.polls
      }
    }
  },
  async created() {
    await this.$store.dispatch('getPolls')
    this.queryset(this.$route.path)
  },
  beforeRouteLeave(to, from, next) {
    this.queryset(to.path)
    next()
  }
}
</script>

<style lang="sass">
.polls-list
  max-width: 786px
  flex: 1 1 auto

  .search
    height: 50px
    display: flex
    align-items: stretch
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1)

    &:before
      padding: 0 15px
      font-size: 15px
      color: $placeholder
      display: flex
      align-items: center

    input
      font-size: 14px
      line-height: 19px
      border: none
      flex-grow: 1

      @media screen and (max-width: $mark)
        background-position: 15px

      &:focus
        outline: none

    .create
      font-size: 20px
      padding: 0 10px
      margin: 5px 10px 5px 0
      display: flex
      align-items: center

      &:hover
        opacity: 1
  .items
    overflow: overlay
    min-height: 300px
    max-height: 607px

    @media screen and (max-width: $mark)
      min-height: auto
      max-height: none
</style>