<template>
  <div class="input-group">
    <input
      class="input-search"
      type="text"
      placeholder="Search"
      v-model="searchText"
      @keyup.enter="$emit('searched', searchText)"
    />
    <button
      class="button-search"
      type="button"
      @click="$emit('searched', searchText)"
    >
      <SearchIcon />
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchIcon from "@/components/SearchIcon.vue";
@Options({
  components: { SearchIcon },
})
export default class HomeView extends Vue {
  searchText = "";
}
</script>
<style lang="scss" scoped>
.input-group {
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  height: 40px;
  width: 100%;

  .input-search {
    flex-grow: 1;
    width: 75%;
    border-radius: 20px 0 0 20px;
    border: none;
    padding: $spacing-1 $spacing-4;
  }

  .button-search {
    width: 50px;
    border-width: 0;
    background-color: $yellow-light;
    color: $green-dark;
    border-radius: 0 20px 20px 0;
    padding: $spacing-1;
    svg {
      height: 22px;
      width: 22px;
    }
  }
}
</style>
