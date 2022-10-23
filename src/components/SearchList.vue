<template>
  <div class="search-list">
    <div v-if="list.length > 0" class="search-results">
      <SearchResultItem
        :item="result.show"
        v-for="result in list"
        :key="result.show.id"
      />
    </div>
    <p class="no-result-text" v-else>No Results</p>
  </div>
</template>

<script lang="ts">
import { Prop } from "vue-property-decorator";

import SearchResultItem from "@/components/SearchResultItem.vue";
import { SearchResult } from "@/types/show.types";
import { Vue, Options } from "vue-class-component";
@Options({
  components: { SearchResultItem },
})
export default class SearchList extends Vue {
  @Prop({ required: true }) list!: SearchResult[];
}
</script>
<style lang="scss" scoped>
.search-list {
  position: absolute;
  right: $spacing-10;
  left: $spacing-4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $spacing-3 0;
  border: 1px solid $green-dark;
  border-radius: 0 0 $spacing-2 $spacing-2;
  background: $yellow-light;
  z-index: 100;

  .search-results {
    width: 100%;
  }
  .no-result-text {
    font-weight: 500;
    color: $green-dark;
    padding: $spacing-10;
  }
}
</style>
