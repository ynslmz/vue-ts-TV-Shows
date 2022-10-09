<template>
  <div class="show-list">
    <h3 class="genre">{{ genre }}</h3>
    <div class="show-wrapper" ref="wrapper">
      <button class="btn btn-left" @click="nextItems(-1)" v-show="showButtons">
        &lt;
      </button>
      <div class="show-scroller">
        <TransitionGroup name="show-list">
          <ShowCard :show="show" v-for="show in showList" :key="show.id" />
        </TransitionGroup>
      </div>
      <button class="btn btn-right" @click="nextItems(1)" v-show="showButtons">
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
  computed: {
    ...mapGetters({
      containerWidth: RootStore.GET_CONTAINER_WIDTH,
    }),
  },
})
export default class ShowList extends Vue {
  declare $refs: {
    wrapper: HTMLElement;
  };
  declare shows: Show[];
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
    color: $green;
    font-size: 1.5rem;
    font-weight: 700;
    padding: $spacing-3;
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
      top: 50%;
      z-index: 50;
      height: 50px;
      width: 50px;

      text-align: center;

      &-left {
        left: 0;
      }

      &-right {
        right: 0;
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
