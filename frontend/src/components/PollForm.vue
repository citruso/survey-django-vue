<template lang="pug">
section#poll-form.box
  #preloader(v-if="isLoading")
  #topbar.text
    #back(@click="prevPage")
      i.bi-chevron-left
      | Назад
    span {{ poll.name | formattedName }}
    #forward(v-if="!page" @click="nextPage") Далее
      i.bi-chevron-right
    #counter(v-else) {{ slidePos + 1 }} / {{ poll.slides.length }}  <!-- +1 for ux comfort -->

  .overlay(v-if="!page")
    PollFormInfo(
      :poll="poll"
      @input-name="dynamicPollName"
      @input-desc="poll.desc = $event"
    )
  .overlay(v-else)
    PollFormSlide(
      v-if="poll.id != -1"
      :slide="currentSlide"
      @input-answer="currentSlide.answerText = $event"
      @push-answer="currentSlide.answers.push($event)"
      @pop-answer="currentSlide.answers.pop()"
      @splice-answer="currentSlide.answers.splice($event, 1)"
    )
    PollFormSlideNew(
      v-else
      :slide="currentSlide"
      @input-question="currentSlide.question = $event"
      @input-choice="$set(currentSlide.choices, $event.index, $event.choice)"
      @push-choice="currentSlide.choices.push('')"
      @pop-choice="currentSlide.choices.splice($event, 1)"
    )

  #bottombar(v-if="page")
    #menu
      #left.btn-circular.bi-arrow-left(@click="prevSlide")
      #add.btn-circular.bi-three-dots(
        v-if="poll.id == -1"
        @click.stop="isVisible = !isVisible"
      )
      #right.btn-circular.bi-arrow-right(@click="nextSlide")
      PopupMenu(v-show="isVisible" v-on-clickaway="closePopup")
        li(
          v-for="item in slidesTypes"
          :class="[item.class, { 'active': currentSlide.type == item.type }]"
          @click="currentSlide.type = item.type"
        ) {{ item.text }}
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import { MAX_SLIDES } from '../store/consts'
import slidesTypes from '../store/types'

import PopupMenu from './PopupMenu'
import PollFormInfo from './PollFormInfo'
import PollFormSlide from './PollFormSlide'
import PollFormSlideNew from './PollFormSlideNew'

export default {
  name: 'PollForm',
  mixins: [ clickaway ],
  data: () => ({
    poll: {},
    page: 0,
    slidePos: 0,
    isLoading: false,
    isVisible: false,
    slidesTypes: slidesTypes
  }),
  components: {
    PopupMenu,
    PollFormInfo,
    PollFormSlide,
    PollFormSlideNew
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'isPollOpen',
      'getOpenPoll',
      'getBlankPoll'
    ]),
    currentSlide() {
      return this.poll.slides[this.slidePos]
    },
    isAnswer() {
      return this.poll.slides.every(slide => {
        return slide.answers.length > 0 || slide.answerText
      })
    },
    isPoll() {
      return this.poll.name && this.poll.desc
      && this.poll.slides.every(slide => {
        return slide.question && slide.choices.every(val => {
          return slide.type == 'text' ? true : !!val
        })
      })
    }
  },
  watch: {
    poll: {
      handler() {
        this.$store.commit('commitPoll', this.poll) // save to open polls
        this.eventBus.$emit('poll-updated', { // communication with ActionMenu for finish button
          isAnswer: this.isAnswer,
          isPoll: this.isPoll
        })
      },
      deep: true
    },
    $route(to) {
      this.initializePoll(to.params.id) // update local data when url changes
    }
  },
  methods: {
    initializePoll(id) {
      this.poll = JSON.parse(JSON.stringify(this.getOpenPoll(id))) // avoid object reference conflicts
      this.slidePos = 0
      this.page = 0

      document.title = this.$options.filters.formattedName(this.poll.name)
    },
    dynamicPollName(event) {
      this.poll.name = event;
      this.$parent.$children[0].$forceUpdate() // update NavMenu for dynamic name display
      document.title = this.$options.filters.formattedName(event)
    },
    pushSlide() {
      this.poll.slides.push({
        type: 'button',
        question: '',
        choices: [''],
        answers: [],
        answerText: ''
      })
    },
    prevSlide() {
      this.slidePos -= this.slidePos > 0 ? 1 : 0
    },
    nextSlide() {
      if (
        this.poll.id == -1
        && this.poll.slides.length < MAX_SLIDES
        && this.slidePos + 1 == this.poll.slides.length
      )
        this.pushSlide()

      if (this.slidePos + 1 < this.poll.slides.length)
        this.slidePos += 1
    },
    prevPage() {
      this.page ? this.page -= 1 : this.$router.push('/home')
    },
    nextPage() {
      this.page += +!this.page
    },
    closePopup() {
      this.isVisible = false
    }
  },
  created() {
    this.initializePoll(this.$route.params.id)

    this.eventBus.$on('delete-poll', () => {
      this.$store.dispatch('deletePoll', this.poll.id)
    })
    this.eventBus.$on('publish-poll', () => {
      this.$store.dispatch('publishPoll', this.poll)
    })
    this.eventBus.$on('create-answer', () => {
      this.$store.dispatch('createAnswer', {
        poll_id: this.poll.id,
        user_id: this.$store.getters.getUserData.id,
        answers: this.poll.slides
      })
    })
  },
  beforeDestroy() {
    this.eventBus.$off([
      'delete-poll',
      'publish-poll',
      'create-answer'
    ])
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