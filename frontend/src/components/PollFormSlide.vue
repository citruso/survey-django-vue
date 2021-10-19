<template>
<div class="slide text">
  <div class="question">{{ slide.question }}</div>
  <div class="answers">
    <textarea
      v-if="slide.type == 'text'"
      :value="slide.answerText"
      @blur="$emit('input-answer', $event.target.value.trim())"
      placeholder="Напишите Ваш ответ здесь..."
      :disabled="isPollCompleted(slide.poll_id)"
      maxlength="500"
    />
    <ol v-else >
      <li
        v-for="(choice, index) in slide.choices"
        :key="index"
        :class="stateAnswerButton(index)"
        @click="selectAnswer(index)">
        {{ choice }}
        <div class="check" :class="checkAnswerButton(index)" />
      </li>
    </ol>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PollFormSlide',
  props: ['slide'],
  computed: mapGetters([
    'isPollCompleted',
  ]),
  methods: {
    checkAnswerButton(index) {
      return this.slide.answers.includes(index)
        ? 'bi-check-circle'
        : 'bi-circle'
    },
    stateAnswerButton(index) {
      return [
        this.isPollCompleted(this.slide.poll_id)
          ? 'not-selectable'
          : 'btn btn-rect',
        { 'selected': this.slide.answers.includes(index) }
      ]
    },
    selectAnswer(index) {
      switch(this.slide.type) {
        case 'button':
          if (this.slide.answers.length > 0)
            this.$emit('pop-answer')
          break
        case 'multi-button':
          if (this.slide.answers.includes(index)) {
            this.$emit('splice-answer', this.slide.answers.indexOf(index))
            return
          }
      }
      this.$emit('push-answer', index)
    }
  }
}
</script>

<style lang="sass">
.slide
  .question
    font-size: 24px
    line-height: 33px
    margin-bottom: 30px
    text-align: center
    overflow-wrap: anywhere

  .answers
    textarea
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

        .check
          position: absolute
          color: $divider
          font-size: 22px
          top: 13px
          right: 20px

      .selected
        background-color: $link
        color: #fff

        .check
          color: #fff

      .not-selectable
        pointer-events: none

        &:hover
          background: #fff

        &:active
          background: #fff
</style>