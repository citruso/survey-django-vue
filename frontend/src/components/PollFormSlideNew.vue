<template>
<div class="slide">
  <textarea
    class="question"
    placeholder="Введите Ваш вопрос"
    maxlength="100"
    :value="slide.question"
    @blur="$emit('input-question', $event.target.value.trim())"
  />
  <div class="answers">
    <textarea
      v-if="slide.type == 'text'"
      placeholder="Напишите Ваш ответ здесь..."
      disabled
    />
    <ol v-else>
      <input
        v-for="(choice, index) in slide.choices"
        placeholder="Ответ"
        maxlength="50"
        :key="index"
        :value="slide.choices[index]"
        @blur="$emit('input-choice', { index, choice: $event.target.value.trim() })"
      />
      <div class="actions">
        <div
          v-for="(_, index) in slide.choices"
          :key="index"
          class="row">
          <div
            class="add btn-circular bi-plus-circle"
            v-show="!isMaxChoices"
            @click="$emit('push-choice')"
          />
          <div
            class="sub btn-circular bi-dash-circle"
            v-show="!isMinChoices"
            @click="$emit('pop-choice')"
          />
        </div>
      </div>
    </ol>
  </div>
</div>
</template>

<script>
import { MIN_CHOICES, MAX_CHOICES } from '../store/consts'

export default {
  name: 'PollFormSlideNew',
  props: ['slide'],
  computed: {
    isMaxChoices() {
      return this.slide.choices.length == MAX_CHOICES
    },
    isMinChoices() {
      return this.slide.choices.length == MIN_CHOICES
    }
  }
}
</script>

<style lang="sass">
.slide
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
    font-size: 24px
    line-height: 33px
    margin-bottom: 50px
    overflow-wrap: anywhere

  .answers
    textarea
      height: 87px
      width: 100%
      font-size: 18px

    ol
      grid-gap: 15px
      position: relative

      input
        font-size: 16px
        border-radius: 10px
        overflow: hidden
        text-overflow: ellipsis
        background-color: $hovered
        padding: 10px 90px 10px 20px
        border: 1px solid $divider

      .actions
        position: absolute
        display: flex
        flex-direction: column
        right: 0
        font-size: 24px
        grid-gap: 15px
        padding-right: 5px

        & > .row
          display: flex
          grid-gap: 5px
          padding: 4px
          justify-content: flex-end
          transition: opacity .1s

          &:last-of-type .add
            display: inline-block

          .add
            display: none

          & > *
            opacity: .4
            padding: 6px

            &:hover
              opacity: 1
</style>