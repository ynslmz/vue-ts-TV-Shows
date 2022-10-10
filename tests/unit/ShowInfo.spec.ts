import { shallowMount } from "@vue/test-utils";
import ShowInfo from "@/components/ShowInfo.vue";

const showObject = {
  id: 1,
  name: "Under the Dome",
  genres: ["Drama", "Science-Fiction", "Thriller"],
  rating: {
    average: 6.5,
  },
  summary: "<p>Summary of the show</p>",
};

const createWrapper = () => {
  return shallowMount(ShowInfo, {
    props: {
      show: showObject,
    },
  });
};

describe("ShowInfo.vue", () => {
  it("should list show name", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toMatch(showObject.name);
  });

  it("should list genres", () => {
    const wrapper = createWrapper();
    console.log(wrapper.text());
    expect(wrapper.text()).toMatch(showObject.genres[2]);
  });
});
