<template>
  <div class="show-info">
    <p class="title">{{ show.name }}</p>
    <p class="year">{{}}</p>
    <div class="genres">
      <span class="badge" v-for="gnr in show.genres" :key="gnr" v-text="gnr" />
    </div>
    <p class="summary" v-html="show.summary"></p>
    <button class="btn-more" @click="$router.push(`/details/${show.id}`)">
      More...
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
})
export default class ShowInfo extends Vue {}
</script>

<style lang="scss" scoped>
.show-info {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  height: 300px;

  .title {
    color: $green-dark;
    font-size: 1.2rem;
    padding: $spacing-1;
    text-align: left;
  }

  .genres {
    padding: $spacing-1 0;
    display: flex;
    flex-wrap: wrap;
  }

  .summary {
    flex-grow: 1;
    margin: $spacing-2 0;
    font-family: $text-font;
    font-size: 0.7rem;
    color: $black;
    overflow: hidden;
    line-height: 1.25;
  }

  .btn-more {
    background: $yellow;
    color: $green;
    padding: $spacing-2;
    border: none;
    border-radius: $spacing-1;
    font-weight: 600;
    align-self: flex-end;
    &:hover {
      background: $yellow-dark;
    }
  }
}
</style>
