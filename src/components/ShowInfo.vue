<template>
  <div class="show-info">
    <p class="title">
      {{ show.name }}
    </p>

    <div class="genres">
      <span class="badge" v-if="show.rating.average">{{
        show.rating.average
      }}</span>
      <span class="badge" v-for="gnr in show.genres" :key="gnr" v-text="gnr" />
    </div>
    <p class="summary" v-html="show.summary"></p>
  </div>
</template>

<script lang="ts">
import { Show } from "@/types/show.types";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class ShowInfo extends Vue {
  @Prop({ required: true }) show!: Show;
}
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
    vertical-align: middle;
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
}
</style>
