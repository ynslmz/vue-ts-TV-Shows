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
      <div class="show-scroller" :style="showScrollerStyle">
        <div class="shows" ref="showsContainer">
          <TransitionGroup name="show-card">
            <ShowCard :show="show" v-for="show in showList" :key="show.id" />
          </TransitionGroup>
        </div>
      </div>
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
    showsContainer: HTMLElement;
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

  get showScrollerStyle() {
    return { width: this.shows.length * 230 + "px" };
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

  resize() {
    const wrapperScrollLeft = this.$refs.wrapper.scrollLeft;
    this.activeIndex = Math.round(wrapperScrollLeft / 230);
    this.$refs.showsContainer.setAttribute(
      "style",
      `margin-left:${wrapperScrollLeft}px`
    );
  }

  mounted() {
    this.$refs.wrapper.addEventListener("scroll", this.resize);
  }

  beforeUnmount() {
    this.$refs.wrapper.removeEventListener("scroll", this.resize);
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
    overflow: auto hidden;
    .show-scroller {
      display: flex;
    }

    .shows {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .show-list-enter-active,
  .show-list-leave-active {
    transition: all 0.5 ease;
  }
  .show-list-enter-from,
  .show-list-leave-to {
    opacity: 0;
  }
}
</style>
