<template>
  <div class="timeline">
    <scrollactive
      class="menu"
      active-class="active"
      :offset="1"
      :duration="1000"
      :modify-url="false"
      :highlight-first-option="true"
      :scroll-offset="0"
    >
      <a :href="hashString(event.eventNo)" class="scrollactive-item menu-item active">{{event.date}}</a>
      <a href="#photos" class="scrollactive-item menu-item">Photos</a>
    </scrollactive>
    <div class="scroll-container">
      <div class="scroll-wrapper">
        <timeline-slide :id="this.event.eventNo" :event="this.event"></timeline-slide>
        <timeline-slide id="photos">
          <v-carousel dark height="100vh" hide-delimiters>
            <v-carousel-item v-for="item in this.carouselImages" :key="item.id" :src="imgSrc(item)"></v-carousel-item>
          </v-carousel>
        </timeline-slide>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import TimelineSlide from "./TimelineSlide";

export default {
  data() {
    return {
      options: {
        navigation: true
      },

      event: [],
      carouselImages: []
    };
  },

  components: {
    TimelineSlide
  },

  firestore() {
    return {
      event: db.collection("events").doc("SlmwijTL6k855cKY1Rbe"),
      carouselImages: db.collection("carousel")
    };
  },

  methods: {
    hashString(string) {
      return "#" + string;
    },

    imgSrc(carouselItem) {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return carouselItem.mobileImg;
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return carouselItem.src;
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// Colours
$white: #fff;
$black: #000;
$primary: #d4a024;
$gray: #616161;

.timeline {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 5px 25px 5px rgba($black, 0.2);

  .scroll-container {
    height: 100vh;
    width: 100%;
    position: relative;
  }

  .scroll-wrapper {
    height: 100%;
    transition: 2s cubic-bezier(0.68, -0.4, 0.27, 1.34) 0.2s;

    & #photos {
      height: 100%;
    }
  }

  .menu {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .menu {
      left: 5% !important;
      height: 100%;
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-style: italic;
      font-weight: 300;
      font-size: 18px;
      z-index: 2;

      &::after {
        content: "";
        position: absolute;
        right: -30px;
        top: 0;
        height: 100%;
        width: 1px;
        background-color: rgba($white, 0.2);
      }

      &-item {
        width: auto;
        height: auto;
        text-align: center;
        opacity: 1;
        text-decoration: none;
        background: transparent;
        color: $primary;
        margin: 15px 0 !important;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 8px;
          right: -32.5px;
          width: 6px;
          height: 6px;
          border-radius: 100%;
          background-color: $primary;
          transform: scale(0);
          transition: 0.2s;
        }

        &.active {
          color: $primary;

          &::before {
            transform: scale(1);
          }
        }
      }
    }
  }
}
</style>
