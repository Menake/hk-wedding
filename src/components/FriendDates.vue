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
      <a
        v-for="(event, index) in events"
        :key="index"
        :href="hashString(event.eventNo)"
        class="scrollactive-item menu-item"
        :class="initialActive(index)"
      >{{event.date}}</a>
    </scrollactive>
    <div class="scroll-container">
      <div class="scroll-wrapper">
        <timeline-slide
          v-for="event in events"
          :key="event.eventNo"
          :id="event.eventNo"
          :event="event"
        ></timeline-slide>
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
      events: [],
      options: {
        activeClass: "active",
        offset: 0,
        scrollOffset: 20,
        duration: 1000,
        modifyUrl: false,
        highlightFirstItem: true
      }
    };
  },

  components: {
    TimelineSlide
  },

  methods: {
    hashString(string) {
      return "#" + string;
    },

    initialActive(index) {
      return index === 0 ? "active" : "";
    }
  },

  firestore() {
    return {
      events: db.collection("events").orderBy("date", "asc")
    };
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
  }

  .menu {
    display: none;
    // flex-flow: row;
    // position: fixed;
    // z-index: 2;
    // align-content: center;
    // justify-content: center;

    &-item {
      margin: 5px;
      opacity: 1;
      text-decoration: none;
      background: transparent;
      color: $primary;
    }
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
