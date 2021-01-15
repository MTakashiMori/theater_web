<template>

    <v-container>

        <v-card>

            <v-card-title>
                <h2>Movie - {{ data ? data.name : null}} </h2>
                <v-spacer></v-spacer>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn text icon v-on="on" @click="rate">
                            <v-icon>star</v-icon>
                        </v-btn>
                    </template>
                    <span>Rate</span>
                </v-tooltip><!-- rate -->

                <v-btn @click="goBack">Back</v-btn>
            </v-card-title>

            <v-container v-if="data != null">

                <v-row>
                    <v-col>
                        <item-show title="Name" :value="data.name"></item-show>
                    </v-col>
                    <v-col>
                        <item-show title="Year" :value="data.year"></item-show>
                    </v-col>
                    <v-col>
                        <item-show title="Duration" :value="data.duration"></item-show>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <item-show title="Synopse" :value="data.synopses"></item-show>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <item-show title="Directors" :value="data.directors"></item-show>
                    </v-col>
                    <v-col>
                        <item-show title="Writers" :value="data.writers"></item-show>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <item-show title="Rating" :value="data.rating"></item-show>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col v-for="(rate, index) in data.rates" :key="index">
                        <item-show
                                pre="Evaluator - "
                                :title="rate.name"
                                :value="rate.rate"
                                :pos="dateFormat(rate.created_at)">
                        </item-show>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-img :src="data.image"></v-img>
                    </v-col>
                </v-row>


            </v-container>

        </v-card>

    </v-container>

</template>

<script>
    import Axios from "axios";
    import moment from 'moment';
    import ItemShow from "./item-show";

    export default {
        name: 'movie-show',
        components: {ItemShow},
        data() {
           return {
               data: null
           }
        },
        methods: {
            getAll(id) {
                Axios.get(process.env.VUE_APP_BASE_URL + 'movie/' + id).then( (res) => {
                    this.data = res.data.data.data;
                }).catch( (error) => {
                    console.log(error);
                });
            },
            goBack() {
                this.$router.push({name: 'movie-list'});
            },
            rate() {
                this.$router.push({name: 'movie-rate', params: {id: this.$route.params.id}});
            },
            dateFormat(date) {
                return moment(date).format('DD/MM/YYYY HH:mm')
            }
        },
        filters: {

        },
        mounted() {
            this.getAll(this.$route.params.id);
        }

    }
</script>