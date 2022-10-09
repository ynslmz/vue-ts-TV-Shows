<template>
  <div class="home">
    {{ shows }}
  </div>
</template>

<script lang="ts">
import { GET_SHOWS } from "@/store/showModule.types";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

@Options({
  components: {},
  computed: {
    ...mapGetters({
      shows: GET_SHOWS,
    }),
  },
})
export default class HomeView extends Vue {}
</script>
