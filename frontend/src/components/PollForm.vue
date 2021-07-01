<template lang="pug">
section#poll-form.box
  #preloader(v-if="isLoading")
  #topbar.text
    #back(@click="prevPage")
      i.bi-chevron-left
      | Назад
    span {{ getName | formattedName }}
    #forward(v-if="!page" @click="nextPage") Далее
      i.bi-chevron-right
    #counter(v-else) {{ slidePos + 1 }} / {{ getSlidesLen }}
  PollFormInfo(v-if="!page")
  PollFormSlide(v-else :activeType="type")
  #bottombar(v-if="page")
    #menu
      #left.btn-circular.bi-arrow-left(@click="prevSlide")
      #add.btn-circular.bi-three-dots(
        v-if="getActiveID == -1"
        @click.stop="showMenu"
      )
      #right.btn-circular.bi-arrow-right(@click="nextSlide")
      SlideTypesMenu(v-show="isVisible" @select-type="type = $event" :activeType="type")
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { MAX_SLIDES } from '../store/consts'
import PollFormInfo from './PollFormInfo'
import PollFormSlide from './PollFormSlide'
import SlideTypesMenu from './SlideTypesMenu'

export default {
  name: 'PollForm',
  data: () => ({
    page: 0,
    type: 'button',
    isLoading: false,
    isVisible: false
  }),
  components: {
    SlideTypesMenu,
    PollFormInfo,
    PollFormSlide
  },
  computed: {
    ...mapState({
      slidePos: state => state.poll.slidePos
    }),
    ...mapGetters([
      'isAdmin',
      'getName',
      'getActiveID',
      'getSlidesLen',
      'getBlankPoll',
      'getActivePoll',
      'isPollOpen',
      'getOpenPoll'
    ])
  },
  methods: {
    prevSlide() {
      this.$store.commit('setSlidePos', this.slidePos > 0 ? -1 : 0)
    },
    nextSlide() {
      if (
        this.getActiveID == -1
        && this.getSlidesLen < MAX_SLIDES
        && this.slidePos + 1 == this.getSlidesLen
      )
        this.$store.commit('pushSlide')

      if (this.slidePos + 1 < this.getSlidesLen)
        this.$store.commit('setSlidePos', 1)
    },
    showMenu() {
      this.isVisible = !this.isVisible
    },
    prevPage() {
      this.page
        ? this.page -= 1
        : this.$router.push('/home')
    },
    nextPage() {
      this.page += +!this.page
    }
  },
  created() {
    const onClickOutside = e => this.isVisible = e.target.id == 'types-menu' && this.isVisible
    document.addEventListener('click', onClickOutside)
    this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside))
  },
  beforeRouteUpdate(to, from, next) {
    this.page = 0
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.page = 0
    next()
  },
  beforeDestroy() {
    this.$store.commit('resetPoll')
  }
}
</script>

<style lang="sass">
#poll-form
  max-width: 786px
  flex: 1 1 auto
  position: relative
  @media screen and (max-width: $mark)
    outline: 0.7px solid $divider
  #preloader
    width: 100%
    height: 100%
    background-image: url(../assets/loader.gif)
    background-size: cover
    position: absolute
    opacity: 0.6
  #topbar
    display: flex
    height: 50px
    span
      flex-grow: 1
      text-align: center
      font-weight: 600
      font-size: 16px
      line-height: 22px
      padding: 14px 5%
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    #back, #forward
      transition: background-color linear 0.1s
      font-size: 14px
      line-height: 19px
      color: $placeholder
      width: 100px
      cursor: pointer
    #back
      display: inherit
      align-items: center
      padding-right: 15px
      i
        font-size: 20px
        padding: 15px
        padding-right: 10px
      &:hover
        background: linear-gradient(to right,$background 50%,#fff)
    #forward
      display: inherit
      align-items: center
      justify-content: flex-end
      padding-left: 15px
      i
        font-size: 20px
        padding: 15px
        padding-left: 10px
      &:hover
        background: linear-gradient(to left,$background 50%,#fff)
    #counter
      width: 100px
      font-weight: 600
      font-size: 16px
      line-height: 22px
      padding: 14px
      padding-right: 20px
      text-align: end
      flex-shrink: 0
  #bottombar
    height: 50px
    display: flex
    justify-content: center
    #menu
      display: flex
      align-items: center
      grid-gap: 10px
      position: relative
      #add, #left, #right
        font-size: 26px
        padding: 6px 8px 4px
</style>