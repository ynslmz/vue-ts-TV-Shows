<template>
  <div class="wrapper">
    <Header />
    <div class="container" ref="container">
      <router-view />
    </div>
    <Loading v-if="getLoading" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/common/Header.vue";
import Loading from "@/components/common/Loading.vue";
import { mapActions, mapGetters } from "vuex";
import { RootStore } from "./store";
import { ShowStore } from "./store/show.module";
@Options({
  components: {
    Header,
    Loading,
  },
  computed: {
    ...mapGetters({
      getLoading: ShowStore.GET_LOADING,
    }),
  },
  methods: {
    ...mapActions({
      saveContainerWidth: RootStore.SAVE_CONTAINER_WIDTH,
    }),
  },
})
export default class App extends Vue {
  declare $refs: {
    container: HTMLElement;
  };
  declare saveContainerWidth: (width: number) => void;
  containerWidth = 0;
  timer!: number;

  mounted() {
    this.onResize();
    window.removeEventListener("resize", this.debounce);
    window.addEventListener("resize", this.debounce);
  }

  /// a simple debounce
  debounce() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.onResize();
      }, 200);
    } else {
      this.timer = setTimeout(() => {
        this.onResize();
      }, 200);
    }
  }

  onResize() {
    if (this.containerWidth !== this.$refs.container.clientWidth) {
      this.saveContainerWidth(this.$refs.container.clientWidth);
      this.containerWidth = this.$refs.container.clientWidth;
    }
  }
}
</script>
