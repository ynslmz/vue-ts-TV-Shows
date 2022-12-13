<template>
  <router-link class="search-result-item" :to="`/details/${item.id}`">
    <img class="img" :src="image" :alt="item.name" />
    <p class="title">{{ item.name }}</p>
    <p class="badge" v-if="item.rating.average">
      {{ Number(item.rating.average).toFixed(1) }}
    </p>
  </router-link>
</template>

<script lang="ts">
import { Show } from "@/types/show.types";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class SearchResultItem extends Vue {
  @Prop({ requeired: true }) item!: Show;
  get image() {
    return (
      this.item.image?.medium ||
      "https://via.placeholder.com/210x295?text=No image"
    );
  }
}
</script>
<style lang="scss" scoped>
.search-result-item {
  color: $primary-dark;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-1;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }

  &:nth-child(even) {
    background-color: $gray;
  }

  &:nth-child(odd) {
    background-color: $white;
  }

  .img {
    max-height: 100px;
    max-width: 10%;
    object-fit: cover;
  }

  .title {
    text-align: left;
    font-weight: 500;
    flex-grow: 1;
    padding: $spacing-3;
  }
}
</style>
