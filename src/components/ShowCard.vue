<template>
  <div class="show-card" :id="`show-${show.id}`" :data-id="show.id">
    <div class="image-container">
      <img class="image" :src="imageUrl" :alt="show.name" />
    </div>
    <ShowInfo :show="show" />
  </div>
</template>

<script lang="ts">
import ShowInfo from "@/components/ShowInfo.vue";
import { Show } from "@/types/show.types";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Options({
  components: {
    ShowInfo,
  },
})
export default class ShowCard extends Vue {
  @Prop({ required: true }) show!: Show;

  get imageUrl() {
    return (
      this.show.image?.medium ||
      "https://via.placeholder.com/210x295?text=No image"
    );
  }
}
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
