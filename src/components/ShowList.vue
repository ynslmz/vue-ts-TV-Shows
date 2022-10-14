<template>
  <div class="show-list">
    <div class="genre">
      <h3 class="title">
        {{ genre }}
      </h3>
      <span class="count">{{
        `(${activeIndex + 1} to ${Math.min(
          maxShowableItem + activeIndex,
          shows.length
        )} of ${shows.length} )`
      }}</span>
    </div>
    <div class="show-wrapper" ref="wrapper">
      <button
        class="btn btn-left"
        @click="nextItems(-1)"
        v-show="showButtons && activeIndex - maxShowableItem >= 0"
      >
        &lt;
      </button>
      <div class="show-scroller">
        <TransitionGroup name="show-list">
          <ShowCard :show="show" v-for="show in showList" :key="show.id" />
        </TransitionGroup>
      </div>
      <button
        class="btn btn-right"
        @click="nextItems(1)"
        v-show="showButtons && activeIndex + maxShowableItem < shows.length"
      >
        &gt;
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ShowCard from "@/components/ShowCard.vue";
import { mapGetters } from "vuex";
import { RootStore } from "@/store";
import { Show } from "@/types/show.types";
import { Prop } from "vue-property-decorator";
@Options({
  components: { ShowCard },
  computed: {
    ...mapGetters({
      containerWidth: RootStore.GET_CONTAINER_WIDTH,
    }),
  },
})
export default class ShowList extends Vue {
  @Prop({ required: true }) genre!: string;
  @Prop({ required: true }) shows!: Show[];

  declare $refs: {
    wrapper: HTMLElement;
  };
  declare containerWidth: number;

  activeIndex = 0;

  get maxShowableItem() {
    return Math.floor(this.containerWidth / 230);
  }

  get showList() {
    let list = [...this.shows].slice(
      this.activeIndex,
      this.maxShowableItem + this.activeIndex
    );
    return list;
  }

  get showButtons() {
    return this.maxShowableItem < this.shows.length;
  }

  nextItems(direction: 1 | -1 = 1) {
    let nextStart = this.activeIndex + this.maxShowableItem * direction;
    if (nextStart <= 0) {
      this.activeIndex = 0;
    } else if (nextStart >= this.shows.length) {
      this.activeIndex = this.shows.length - this.maxShowableItem;
    } else {
      this.activeIndex = nextStart;
    }
  }
}
</script>
<style lang="scss" scoped>
.show-list {
  margin-bottom: $spacing-3;

  .genre {
    display: flex;
    color: $green;
    font-weight: 700;
    padding: $spacing-3;
    .title {
      flex-grow: 1;
      font-size: 1.5rem;
      font-family: $title-font;
    }
    .count {
      font-family: $text-font;
    }
  }
  .show-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden hidden;
    .show-scroller {
      display: flex;
      justify-content: center;
    }

    .btn {
      background: $green-light;
      color: $yellow-dark;
      position: absolute;
      border: none;
      border-radius: $spacing-2;
      padding: $spacing-2;
      font-size: 1.3rem;
      font-weight: 500;
      font-family: $text-font;
      top: 50%;
      z-index: 50;
      height: 50px;
      width: 50px;
      opacity: 0.95;

      text-align: center;

      &-left {
        left: 0;
        top: 40%;
      }

      &-right {
        right: 0;
        top: 40%;
      }
    }
  }
  .show-list-enter-active,
  .show-list-leave-active {
    transition: all 0.25s ease;
  }
  .show-list-enter-from {
    opacity: 1;
  }
  .show-list-leave-to {
    opacity: 0;
  }
}
</style>
