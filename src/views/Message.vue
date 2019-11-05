<template>
    <v-container fluid fill-height text-xs-center>
        <v-row justify="center">
            <v-col class="content">
                <p class="content-message" v-for="(message,index) in this.message" :key="index">{{message}}</p>
                <v-row justify="center" class="content-signature">
                    <p>Love, Hasthika & Kaushala</p>
                </v-row>
                <v-row justify="center">
                    <v-btn color="black" dark @click="goToDates">See the Dates</v-btn>                    
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {
        methods: {
            goToDates() {
                this.$router.push("dates");
            }
        },

        computed: {
            ...mapState(["guest", "message"])
        },

        mounted() {
            if (!this.guest) {
                this.$router.push("/");
            }
        }
    };
</script>

<style lang="scss" scoped>
    .content {

        &-message {
            margin-top: 3%;
            text-align: justify;
        }

        &-signature {
            bottom: 5%;
        }

        @media screen and (min-width: 768px) {
            font-size: 1.5em;
            line-height: 1.5em;
            font-weight: 400;
            font-style: normal;
            font-variant: normal;

            &-signature {
                margin-top: 5%;
            }
        }
    }
</style>