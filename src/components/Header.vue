<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>
            <router-link to="/" class="home-link">ABN TV MAZE</router-link>
          </h1>
        </div>
        <div class="col flex-grow text-right align-self-center">
          <SearchBar @searched="searchPerformed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchBar from "@/components/SearchBar.vue";
import { mapActions } from "vuex";
import { ShowStore } from "@/store/show.module";
@Options({
  components: { SearchBar },
  methods: {
    ...mapActions({
      search: ShowStore.SEARCH_SHOW,
    }),
  },
})
export default class Header extends Vue {
  declare search: (text: string) => void;
  searchPerformed(text: string) {
    this.search(text);
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
}
</style>
