<template lang="pug">
#basic.text
  article.text(v-if="poll.id != -1")
    #name {{ poll.name }}
    #desc {{ poll.desc }}
  form(v-else @submit.prevent)
    legend Основная информация
    label(for="name") Название
    input#name(
      :value="poll.name"
      @blur="$emit('input-name', $event.target.value.trim())"
      maxlength="100"
    )
    label(for="desc") Описание
    textarea#desc(
      :value="poll.desc"
      @blur="$emit('input-desc', $event.target.value.trim())"
      maxlength="500"
    )
</template>

<script>
export default {
  name: 'PollFormInfo',
  props: ['poll']
}
</script>

<style lang="sass">
#basic
  box-shadow: inset 0 0.7px 0px $divider
  padding: 20px 28% 30px 30px
  overflow: auto
  min-height: 350px
  max-height: 394px
  @media screen and (max-width: $mark)
    min-height: auto
  article
    display: flex
    flex-direction: column
    line-break: anywhere
    #name
      font-weight: 600
      font-size: 20px
      line-height: 27px
      margin-bottom: 25px
    #desc
      font-size: 15px
      line-height: 20px
  form
    display: flex
    flex-direction: column
    legend
      font-weight: 600
      font-size: 20px
      line-height: 27px
    label
      margin: 25px 0 10px 0
      font-size: 15px
      line-height: 20px
      color: $placeholder
    input, textarea
      width: 100%
      border: 1px solid $divider
      border-radius: 10px
      background-color: $hovered
      padding: 10px
    textarea
      resize: none
      height: 170px
      flex-shrink: 0
</style>