<template>
  <div class="home">
    <ShowList
      :genre="genre"
      :shows="shows[genre]"
      v-for="genre in listableGenres"
      :key="genre.toString().toLowerCase()"
    />
    <p
      id="load_more"
      class="load-more-text"
      v-show="genres.length > 0 && !isFullList"
    >
      Loading More...
    </p>
  </div>
</template>

<script lang="ts">
import { ShowStore } from "@/store/show.module";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";
import ShowList from "@/components/ShowList.vue";
import { Show } from "@/types/show.types";

@Options({
  components: {
    ShowList,
  },
  computed: {
    ...mapGetters({
      shows: ShowStore.GET_SHOWS,
      genres: ShowStore.GET_GENRES,
    }),
  },
})
export default class HomeView extends Vue {
  genres!: Show[];
  isFullList = false;
  observer!: IntersectionObserver;
  index = 0;
  listableGenres: Show[] = [];

  beforeUnmount() {
    this.observer.disconnect();
  }

  mounted() {
    this.loadItem();
    this.observer = new IntersectionObserver(this.intersectionCallback);
    const element = document.querySelector("#load_more");
    if (element) this.observer.observe(element);
  }

  intersectionCallback(entries: IntersectionObserverEntry[]) {
    if (entries[0].intersectionRatio === 0) return;
    this.loadItem();
  }

  loadItem() {
    this.listableGenres.push(...[...this.genres].splice(this.index, 2));
    if (this.listableGenres.length > 0) {
      this.index += 2;
      if (this.index === this.genres.length) {
        this.isFullList = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: $spacing-6 0;
}
.load-more-text {
  font-family: $title-font;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  font-size: 1rem;
  color: $primary-dark;
}
</style>
