<template functional>
<div class="stats">
  <div class="box box-wrap">
    <div class="placeholder bi-graph-up">
      <p class="text">Статистика</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'StatsInfo'
}
</script>

<style lang="sass">
.stats
  flex: 0 0 250px

  @media screen and (max-width: 1000px)
    display: none

  .box-wrap
    display: flex
    flex-direction: column
    align-items: center
    padding: 100px 0

    .placeholder
      font-size: 105px
      color: $field
    .text
      margin-top: 10px
      font-size: 14px
      line-height: 19px
      color: $placeholder
</style>