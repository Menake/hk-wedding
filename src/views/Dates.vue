<template>
  <friend-dates v-if="showExtendedDates"></friend-dates>
  <guest-dates v-else></guest-dates>
</template>

<script>
import FriendDates from "../components/FriendDates";
import GuestDates from "../components/GuestDates";
import { mapState } from "vuex";
import { db } from "@/db.js";

export default {
  components: {
    FriendDates,
    GuestDates
  },

  data() {
    return {
      guests: []
    };
  },

  computed: {
    ...mapState(["guest"]),

    showExtendedDates() {
      return this.guest.showExtendedDates;
    }
  },

  created() {
    db.collection("guests")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.guests = doc.data();
        });
      });
  },

  mounted() {
    if (!this.guest) {
      this.$router.push("/")
    }
  }
};
</script>

<style>
</style>
