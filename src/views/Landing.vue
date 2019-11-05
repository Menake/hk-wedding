<template>
    <v-container class="wrapper" v-bind:style="{ backgroundImage: 'url(' + bgImg + ')' }" fluid fill-height
        text-xs-center>
        <v-row class="content">
            <v-col>
                <v-row class="logo">
                    <v-img :src="this.logo"></v-img>
                </v-row>

                <v-row class="content-heading text-center">
                    We're Getting Married
                </v-row>

                <v-row class="input-row">
                    <v-text-field class="content-input" placeholder="First Name" dark solo-inverted
                        v-model="firstName" />

                    <v-text-field class="content-input" placeholder="Last Name" dark solo-inverted v-model="lastName" />
                </v-row>

                <v-row justify="center">
                    <v-btn color="black" dark @click="checkGuestAndEnter">I'm excited!</v-btn>
                </v-row>

                <v-row justify="center">
                    <p class="subheading">{{message}}</p>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {
        db
    } from "@/db.js";
    import _ from "lodash";
    import Logo from "@/assets/logo.png";

    export default {
        data() {
            return {
                firstName: "",
                lastName: "",
                guestLists: [],
                message: "",
                logo: Logo,
                landingImages: ""
            };
        },

        firestore() {
            return {
                guestLists: db.collection("guests"),
                landingImages: db.collection("landing").doc("yBAVEwOtxGvFXIT1JCvH")
            };
        },

        computed: {
            fullName() {
                return this.firstName.trim().toLowerCase() + " " + this.lastName.trim().toLowerCase();
            },

            bgImg() {
                switch (this.$vuetify.breakpoint.name) {
                    case "xs":
                        return this.landingImages.mobileImg;
                    case "sm":
                        return this.landingImages.tabletImg;
                    case "md":
                    case "lg":
                    case "xl":
                        return this.landingImages.img;
                    default:
                        return "";
                }
            }
        },

        methods: {
            checkGuestAndEnter: function () {
                let guest = this.getGuestInfo();
                if (guest === null) {
                    this.message = "Sorry! You're not on the guest list";
                } else {
                    // Find the message for the guest
                    let message = _.find(this.guestLists, guestList => {
                        return guestList.type === guest.group;
                    }).message;

                    // Save to vuex store
                    this.$store.dispatch("saveGuest", guest);
                    this.$store.dispatch("setMessage", message);

                    // Route to next page
                    this.$router.push("message");
                }
            },

            getGuestInfo() {
                let guest = null;
                _.forEach(this.guestLists, guestList => {
                    let lowerCaseNames = _.map(guestList.people, person => {
                        return (person.toLowerCase());
                    });

                    if (_.includes(lowerCaseNames, this.fullName)) {
                        guest = {
                            name: this.fullName,
                            showExtendedDates: guestList.extendedDates,
                            group: guestList.type
                        };
                    }
                });
                return guest;
            }
        }
    };
</script>

<style lang="scss" scoped>
    $primary: #d4a024;

    @import url("https://fonts.googleapis.com/css?family=Mrs+Saint+Delafield");

    .wrapper {
        background-color: white;
        background-repeat: no-repeat;
        background-origin: center;
        background-size: cover;

        & .content {
            padding: 10%;

            &-heading {
                font-family: "Mrs Saint Delafield";
                font-size: 53px;
                color: $primary;
                text-shadow: 0px 0px 5px #4e342e;
            }


            .logo {
                position: fixed;
                width: 100%;
                top: 2%;
                right: 10%;
                max-width: 100px;
            }

            &-input {
                color: #000;
            }

            & .subheading {
                color: #ffffff;
            }
        }
    }

    @media screen and (min-width: 768px) {
        .input-row {
            margin: 0 30%;
        }

        .wrapper {
            .content {
                padding: 10% 0 0 0;

                &-heading {
                    font-size: 5em;
                    margin: 0;
                    font-weight: 400;
                    display: block;
                    width: 100%;
                    margin-bottom: -10px;
                    text-align: center;
                }

                .logo {
                    right: 2%;
                }

                &-input {
                    padding: 5px !important;
                    color: #ffff;
                }
            }
        }
    }
</style>