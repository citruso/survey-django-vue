<template lang="pug">
#slide(v-if="getActiveID == -1")
  textarea#question.text(
    :value="slide.question"
    @blur="slide.question = $event.target.value.trim()"
    placeholder="Введите Ваш вопрос"
    maxlength="100"
  )
  #answers
    textarea.text(
      v-if="slide.type == 'text'"
      placeholder="Напишите Ваш ответ здесь..."
      disabled
    )
    ol.text(v-else)
      input.text(
        v-for="(choice, index) in slide.choices"
        :value="choice"
        :key="index"
        @blur="$set(slide.choices, index, $event.target.value.trim())"
        placeholder="Ответ"
        maxlength="50"
      )
      #menu
        #row(v-for="(_, index) in slide.choices" :key="index")
          #add.btn-circular.bi-plus-circle(
            :style="{ 'visibility': isMaxChoices ? 'hidden' : 'visible' }"
            @click="pushChoice()"
          )
          #sub.btn-circular.bi-dash-circle(
            :style="{ 'display': isMinChoices ? 'none' : 'inline-block' }"
            @click="popChoice(index)"
          )
#slide(v-else)
  #question.text {{ slide.question }}
  #answers
    textarea.text(
      v-if="slide.type == 'text'"
      :value="slide.answers[0]"
      @blur="$set(slide.answers, 0, $event.target.value.trim())"
      placeholder="Напишите Ваш ответ здесь..."
      :disabled="isCompleted(getActiveID)"
    )
    ol.text(v-else)
      li(
        v-for="(choice, index) in slide.choices"
        :key="index"
        :class="stateButton(index)"
        @click="select(index)"
      ) {{ choice }}
        #check(:class="check(index)")
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
  MIN_CHOICES,
  MAX_CHOICES
} from '../store/consts'

export default {
  name: 'PollFormSlide',
  props: ['activeType'],
  data: () => ({
    slide: {}
  }),
  watch: {
    slidePos() {
      this.initializeSlide()
    },
    activeType() {
      this.slide.type = this.activeType
    }
  },
  computed: {
    ...mapState({
      slidePos: state => state.poll.slidePos
    }),
    ...mapGetters([
      'getActiveID',
      'isCompleted',
      'getSlide'
    ]),
    isMaxChoices() {
      return this.slide.choices.length === MAX_CHOICES
    },
    isMinChoices() {
      return this.slide.choices.length === MIN_CHOICES
    }
  },
  methods: {
    initializeSlide() {
      this.slide = JSON.parse(JSON.stringify(this.getSlide))
      if (!this.slide.answers && this.getActiveID != -1) {
        this.$set(this.slide, 'answers', [])
      }
    },
    check(index) {
      return [
        this.slide.answers.includes(index)
        ? 'bi-check-circle'
        : 'bi-circle'
      ]
    },
    stateButton(index) {
      return {
        'selected': this.slide.answers.includes(index),
        'btn btn-rect': !this.isCompleted(this.getActiveID),
        'not-selectable': this.isCompleted(this.getActiveID)
      }
    },
    pushChoice() {
      if (!this.isMaxChoices)
        this.slide.choices.push('')
    },
    popChoice(index) {
      if (!this.isMinChoices)
        this.slide.choices.splice(index, 1)
    },
    select(index) {
      if (!this.isCompleted(this.getActiveID)) {
        if (this.slide.type == 'button') {
          if (this.slide.answers.length > 0) {
            this.slide.answers.pop()
            this.slide.answers.push(index)
          } else {
            this.slide.answers.push(index)
          }
        } else if (this.slide.type == 'multi-button') {
          if (this.slide.answers.includes(index))
            this.slide.answers.splice(this.slide.answers.indexOf(index), 1)
          else
            this.slide.answers.push(index)
        }
        this.$forceUpdate()
      }
    }
  },
  created() {
    this.initializeSlide()
  },
  beforeUpdate() {
    this.$store.commit('updateSlide',
      JSON.parse(JSON.stringify(this.slide))
    )
  }
}
</script>

<style lang="sass">
#slide
  box-shadow: inset 0 0.7px 0px $divider,inset 0 -0.7px 0px $divider
  padding: 25px 15% 40px
  height: 420px
  display: flex
  flex-direction: column
  overflow: overlay
  background-color: #fff
  textarea
    background-color: #fff
    text-align: center
    border-radius: 10px
    border: 1px solid $divider
    resize: none
    height: 170px
    flex-shrink: 0
    background-color: $hovered
    max-height: 160px
    padding: 12px 30px
  #question
    font-size: 24px
    line-height: 33px
    margin-bottom: 30px
    text-align: center
    overflow-wrap: anywhere
  #answers
    textarea
      height: 87px
      width: 100%
    ol
      grid-gap: 15px
      position: relative
      input, li
        font-size: 16px
        border-radius: 10px
        overflow: hidden
        text-overflow: ellipsis
      input
        background-color: $hovered
        padding: 10px 90px 10px 20px
        border: 1px solid $divider
      li
        position: relative
        overflow-wrap: anywhere
        padding: 16px 60px 16px 20px
        box-shadow: 0px 2px 8px rgba(0,0,0,0.1)
        &:active:not(.selected)
          background-color: $field
        #check
          position: absolute
          color: $divider
          font-size: 22px
          top: 13px
          right: 20px
      .selected
        background-color: $link
        color: #fff
        #check
          color: #fff
      .not-selectable
        pointer-events: none
        &:hover
          background: #fff
        &:active
          background: #fff
      #menu
        position: absolute
        display: flex
        flex-direction: column
        right: 0
        font-size: 24px
        grid-gap: 15px
        padding-right: 5px
        & > #row
          display: flex
          grid-gap: 5px
          padding: 4px
          justify-content: flex-end
          transition: opacity .1s
          &:last-of-type #add
            display: inline-block
          #add
            display: none
          & > *
            opacity: .4
            padding: 6px
            &:hover
              opacity: 1
</style>