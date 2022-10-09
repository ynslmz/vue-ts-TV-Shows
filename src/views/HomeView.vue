<template>
  <div class="home">
    <ShowList
      :genre="genre"
      :shows="shows[genre]"
      v-for="genre in genres"
      :key="genre.toString().toLowerCase()"
    />
  </div>
</template>

<script lang="ts">
import { ShowStore } from "@/store/show.module";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";
import ShowList from "@/components/ShowList.vue";

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
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  padding: $spacing-6 0;
}
</style>
