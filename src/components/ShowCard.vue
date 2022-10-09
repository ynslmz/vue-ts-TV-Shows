<template>
  <div class="show-card">
    <div class="image-container">
      <img class="image" :src="show.image.medium" :alt="show.name" />
    </div>
    <ShowInfo :show="show" />
  </div>
</template>

<script lang="ts">
import ShowInfo from "@/components/ShowInfo.vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    ShowInfo,
  },
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
})
export default class ShowCard extends Vue {}
</script>

<style lang="scss" scoped>
.show-card {
  width: 220px;
  padding: $spacing-2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .image-container {
    display: flex;
    .image {
      max-height: 300px;
    }
  }
  .show-info {
    width: 100%;
  }
}
</style>
