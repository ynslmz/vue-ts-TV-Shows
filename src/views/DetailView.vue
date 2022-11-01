<template>
  <div class="row detail">
    <div class="col">
      <img class="img" :src="showImageUrl" :alt="showDetail.name" />
    </div>
    <div class="col">
      <h2 class="show-title">
        {{ showDetail.name }}
      </h2>
      <p class="tags">
        <span class="badge" v-if="showDetail.rating.average">
          {{ showDetail.rating.average }}
        </span>
        <span
          class="badge"
          v-for="gnr in showDetail.genres"
          :key="gnr"
          v-text="gnr"
        />
      </p>

      <p class="title">Summary</p>
      <div class="info" v-html="showDetail.summary" />

      <p class="title">Info</p>
      <div class="info-group">
        <div class="info-label">Status</div>
        <div class="info-value">{{ showDetail.status }}</div>
      </div>
      <div class="info-group">
        <div class="info-label">Premiered</div>
        <div class="info-value">
          {{ new Date(showDetail.premiered).toLocaleDateString() }}
        </div>
      </div>
      <div class="info-group">
        <div class="info-label">Ended</div>
        <div class="info-value">
          {{ new Date(showDetail.ended).toLocaleDateString() }}
        </div>
      </div>
      <div class="info-group">
        <div class="info-label">Language</div>
        <div class="info-value">{{ showDetail.language }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ShowStore } from "@/store/show.module";
import { Show } from "@/types/show.types";
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
export default class DetailView extends Vue {
  showDetail!: Show;
  get showImageUrl() {
    return (
      this.showDetail.image?.original ||
      "https://via.placeholder.com/768x960?text=Show doesn't have image"
    );
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding: $spacing-6 0;
  .img {
    width: 100%;
    min-width: 40%;
    border-radius: $spacing-3;
  }

  .show-title {
    font-family: $title-font;
    color: $green-dark;
    font-weight: bold;
  }

  .title {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 800;
    font-family: $title-font;
    color: $green-dark;
  }

  .tags {
    margin: $spacing-3 0;
  }

  .info {
    margin-bottom: $spacing-3;
  }

  .info-group {
    display: flex;
    color: $green;

    .info-label {
      padding: $spacing-2 $spacing-2 $spacing-2 0;
      font-weight: 600;
      width: 25%;
      min-width: 150px;
    }
    .info-value {
      padding: $spacing-2;
      font-weight: 400;
      flex-grow: 1;
    }
  }
}
</style>
