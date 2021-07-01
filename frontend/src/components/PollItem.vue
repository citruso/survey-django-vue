<template lang="pug">
router-link#item(
  :to="{ name: 'poll', params: { id: poll.id }}"
  tag="li"
)
  #avatar(:class="isCompleted")
  #info
    #title {{ poll.name }}
    #desc {{ poll.desc }}
  #menu
    #time {{ poll.time | localeTime }}
    #bookmark(:class="isFav" @click.prevent="updateFavs")
</template>

<script>
export default {
  name: 'PollItem',
  props: ['poll'],
  computed: {
    isCompleted() {
      return this.$store.getters.isCompleted(this.poll.id)
        ? 'bi-file-earmark-check'
        : 'bi-file-earmark-text'
    },
    isFav() {
      return this.$store.getters.isFav(this.poll.id)
        ? 'bi-star-fill'
        : 'bi-star'
    },
  },
  filters: {
    localeTime(str) {
      const data = new Date(str)
      return data.getDate() == new Date().getDate()
        ? data.toLocaleTimeString().slice(0,-3)
        : data.toLocaleDateString()
    }
  },
  methods: {
    updateFavs() {
      this.$store.commit('toggleFav', this.poll.id)
      this.$store.dispatch('updateUserData')
    },
  }
}
</script>

<style lang="sass">
#item
  padding: 10px 20px 10px 0
  box-shadow: 78px -1px $divider
  display: flex
  &:hover
    background-color: $hovered
  #avatar
    display: flex
    align-items: center
    font-size: 38px
    margin: 0 20px
    @media screen and (max-width: $mark)
      margin: 0 15px
  #info
    padding-right: 50px
    overflow: hidden
    flex-grow: 1
    & > *
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
    #title
      font-weight: 600
      font-size: 18px
      line-height: 25px
      color: $black
    #desc
      font-size: 14px
      line-height: 19px
      color: $placeholder
  #menu
    text-align: right
    display: flex
    flex-direction: column
    #time
      font-weight: 300
      font-size: 14px
      line-height: 25px
    #bookmark
      font-size: 20px
      align-self: flex-end
</style>