<template>
  <router-link :to="`/details/${item.id}`">
    <div class="search-result-item">
      <img class="img" :src="item.image?.medium" :alt="item.name" />
      <p class="title">{{ item.name }}</p>
      <p class="badge" v-if="item.rating.average">
        {{ Number(item.rating.average).toFixed(1) }}
      </p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { SearchResult } from "@/types/show.types";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class SearchResultItem extends Vue {
  @Prop({ requeired: true }) item!: SearchResult;
}
</script>
<style lang="scss" scoped>
.search-result-item {
  color: $green-dark;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-1;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }

  &:nth-last-child(odd) {
    background-color: $yellow-light;
  }
  &:nth-last-child(even) {
    background-color: $yellow;
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
