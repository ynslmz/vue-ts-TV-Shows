<template>
  <div class="show-list">
    <h3 class="genre">{{ genre }}</h3>
    <div class="show-wrapper">
      <div class="show-scroller">
        <ShowCard :show="show" v-for="show in shows" :key="show.id" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ShowCard from "@/components/ShowCard.vue";
@Options({
  components: { ShowCard },
  props: {
    genre: {
      type: String,
      required: false,
    },
    shows: {
      type: Array,
      required: true,
    },
  },
})
export default class ShowList extends Vue {}
</script>
<style lang="scss" scoped>
.show-list {
  margin-bottom: $spacing-3;

  .genre {
    color: $green;
    font-size: 1.5rem;
    font-weight: 700;
    padding: $spacing-3;
  }
  .show-wrapper {
    width: 100%;
    .show-scroller {
      display: flex;
      overflow: scroll hidden;
    }
  }
}
</style>
