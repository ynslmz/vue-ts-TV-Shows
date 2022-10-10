<template>
  <div class="container detail">
    <div class="row">
      <div class="col">
        <img
          class="img"
          :src="showDetail.image.original"
          :alt="showDetail.name"
        />

        <p class="title">
          {{ showDetail.name }}
        </p>
        <span class="badge" v-if="showDetail.rating.average">
          {{ showDetail.rating.average }}
        </span>
        <span
          class="badge"
          v-for="gnr in showDetail.genres"
          :key="gnr"
          v-text="gnr"
        />
      </div>
      <div class="col">
        <div class="info" v-html="showDetail.summary" />
        <div>{{ showDetail }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ShowStore } from "@/store/show.module";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

@Options({
  computed: {
    ...mapGetters({
      showDetail: ShowStore.GET_SHOW_DETAILS,
    }),
  },
  async beforeRouteUpdate(to, from, next) {
    await this.$store.dispatch(ShowStore.LOAD_SHOW_DETAILS, to.params.id);
    next();
  },
})
export default class DetailView extends Vue {}
</script>

<style lang="scss" scoped>
.detail {
  padding: $spacing-6 0;
  .img {
    width: 100%;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: $title-font;
  }
}
</style>
