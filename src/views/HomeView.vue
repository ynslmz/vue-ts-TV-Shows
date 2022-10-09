<template>
  <div class="home">
    {{ genres }}
    <hr />
    {{ shows }}
  </div>
</template>

<script lang="ts">
import { ShowStore } from "@/store/show.module";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

@Options({
  components: {},
  computed: {
    ...mapGetters({
      shows: ShowStore.GET_SHOWS,
      genres: ShowStore.GET_GENRES,
    }),
  },
})
export default class HomeView extends Vue {}
</script>
