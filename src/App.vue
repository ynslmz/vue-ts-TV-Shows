<template>
  <Header />
  <div class="container" ref="container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
import { mapActions } from "vuex";
import { RootStore } from "./store";
@Options({
  components: {
    Header,
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

<style lang="scss"></style>
