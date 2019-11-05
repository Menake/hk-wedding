<template>
  <v-container fluid fill-height v-if="this.event" class="timeline-event" v-bind:style="{ backgroundImage: 'url(' + getBgImage + ')' }">
    <v-row>
      <v-col>
        <v-row>
          <div class="logo" @click="goHome()">
            <v-img :src="this.logo"></v-img>
          </div>
        </v-row>

        <v-col class="timeline-event-content">
          <v-row class="timeline-event-content-date">{{this.event.date}}</v-row>
          <v-row class="timeline-event-content-name">{{this.event.name}}</v-row>
          <v-row v-for="(message,index) in this.event.description" :key="index" class="timeline-event-content-description text-justify">{{message}}</v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
  <div v-else class="timeline-event">
    <slot></slot>
  </div>
</template>

<script>
  import Logo from "@/assets/logo.png";

  export default {
    props: {
      event: {
        date: String,
        name: String,
        description: String
      }
    },

    data() {
      return {
        logo: Logo
      };
    },

    computed: {
      getBgImage() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return this.event.mobileImg;
          case "sm":
          case "md":
            return this.event.tabletImg;
          case "lg":
          case "xl":
            return this.event.img;
          default:
            return "";
        }
      }
    },

    methods: {
      goHome() {
        this.$router.push("/");
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Mrs+Saint+Delafield");

  // Colours
  $white: #fff;
  $black: #000;
  $primary: #d4a024;
  $gray: #616161;
  $pink: #f8bbd0;

  .timeline-event {
    position: relative;
    color: $white;
    overflow: hidden;
    background: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      right: -115%;
      top: 0%;
      width: 100%;
      height: 10%;
      background-color: rgba($black, 0.7);
      box-shadow: -230px 10px 150px 100vw rgba($black, 0.5);
      border-radius: 100%;
    }

    &-content {
      position: absolute;
      width: 100%;
      top: 25%;
      font-size: 12px;
      z-index: 2;

      &-date {
        font-style: italic;
        font-size: 3em;
        margin: 0 0 10px 10px;
        color: $primary;
        font-weight: 300;
        transition: 0.2s ease 0.4s;
      }

      &-name {
        font-weight: 600;
        font-size: 2em;
        margin: 0 0 10px 10px;
        transition: 0.2s ease 0.5s;
        text-transform: uppercase;
      }

      &-description {
        line-height: 1.5em;
        font-size: 1em;
        transition: 0.2s ease 0.6s;
        padding: 3% 8%;
      }
    }

    & .logo {
      position: fixed;
      width: 100%;
      top: 5%;
      right: 3%;
      max-width: 50px;
      z-index: 100;

      &:hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .timeline-event {
      &::before {
        content: "";
        position: absolute;
        z-index: 1;
        left: -100%;
        bottom: -10%;
        width: 100%;
        height: 100%;
        background-color: rgba($black, 0.7);
        box-shadow: -130px 0 150px 100vw rgba($black, 0.6);
        border-radius: 100%;
      }

      &-content {
        left: 35%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        text-align: left;
        position: relative;
        width: 60%;

        &-year {
          margin-bottom: 0;
          font-size: 32px;
        }

        &-title {
          font-size: 46px;
          margin: 0;
        }

        &-description {
          font-size: 1.25em;
          padding: 0;
        }
      }

      & .logo {
        top: 3%;
        right: 2%;
        max-width: 100px;
        z-index: 100;
      }
    }

    @media screen and (min-width: 1024px) {
      .timeline-event {
        &::before {
          content: "";
          position: absolute;
          z-index: 1;
          left: -115%;
          bottom: -10%;
          width: 100%;
          height: 100%;
          background-color: rgba($black, 0.7);
          box-shadow: -230px 0 150px 100vw rgba($black, 0.6);
          border-radius: 100%;
        }

        &-content {
          left: 30%;

          &-date {
            margin: 0 0 10px -10px;
          }

          &-name {
            margin: 0 0 10px -10px;
          }
        }
      }
    }

    @media screen and (min-width: 1024px) {
      .timeline-event {
        &::before {
          content: "";
          position: absolute;
          z-index: 1;
          left: -115%;
          bottom: -10%;
          width: 100%;
          height: 100%;
          background-color: rgba($black, 0.7);
          box-shadow: -230px 0 150px 100vw rgba($black, 0.5);
          border-radius: 100%;
        }

        &-content {
          left: 30%;          
        }
      }
    }

    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) {
      .timeline-event {
        background: center center fixed;
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;

        &-content {
          left: 20%;
        }
      }
    }
  }
</style>