<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>
            <router-link to="/" class="home-link">TV MAZE</router-link>
          </h1>
        </div>
        <div class="col flex-grow text-right align-self-center search">
          <SearchBar
            @searched="debouncedSearch"
            @blured="clearSearch"
            class="search-input"
          />
          <SearchList v-show="showResultList" :list="searchResults" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import SearchList from "@/components/SearchList.vue";
import { mapActions, mapGetters } from "vuex";
import { ShowStore } from "@/store/show.module";
import { SearchResult } from "@/types/show.types";
import { debounce } from "@/helpers/debounce";
@Options({
  components: { SearchBar, SearchList },
  methods: {
    ...mapActions({
      search: ShowStore.SEARCH_SHOW,
    }),
  },
  computed: {
    ...mapGetters({
      searchResults: ShowStore.GET_SEARCH_RESULTS,
    }),
  },
})
export default class Header extends Vue {
  declare search: (text: string) => void;
  declare searchResults: SearchResult[];
  searched = false;

  get showResultList() {
    return this.searchResults.length || this.searched;
  }

  debouncedSearch(text: string) {
    return debounce(() => this.searchPerformed(text), 300);
  }

  searchPerformed(text: string) {
    if (text.length > 2) {
      this.search(text);
      this.searched = true;
    }
  }

  clearSearch() {
    /// to wait before destroy to perform if there is an action (click link etc)
    setTimeout(() => {
      this.searched = false;
      this.search("");
    }, 300);
  }
}
</script>
<style lang="scss" scoped>
.header {
  background: $green-gradient;
  padding: $spacing-4;

  a.home-link {
    color: $white;
    font-family: $title-font;
  }
  .search {
    position: relative;
    z-index: 105;
  }
}
</style>
