<template>
  <div class="input-group">
    <SearchIcon class="icon" />
    <input
      class="input-search"
      type="text"
      placeholder="Search"
      v-model="searchText"
      @input="$emit('searched', searchText)"
      @blur="onBlur"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchIcon from "@/components/icons/SearchIcon.vue";
@Options({
  components: { SearchIcon },
})
export default class SearchBar extends Vue {
  searchText = "";
  onBlur() {
    this.$emit("blured");
    this.searchText = "";
  }
}
</script>
<style lang="scss" scoped>
.input-group {
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  height: 40px;
  width: 100%;
  position: relative;

  .input-search {
    flex-grow: 1;
    width: 75%;
    border-radius: 20px;
    border: none;
    padding: $spacing-1 $spacing-4 $spacing-1 $spacing-8;
  }

  .icon {
    position: absolute;
    top: $spacing-2;
    left: $spacing-2;
    height: 22px;
    width: 22px;
  }
}
</style>
