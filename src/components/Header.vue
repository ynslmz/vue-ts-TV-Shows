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
@Options({
  components: { SearchBar },
})
export default class Header extends Vue {
  searchPerformed(text: string) {
    console.log(text);
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
