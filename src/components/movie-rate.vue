<template>

    <v-container>

        <v-card>

            <v-card-title>
                <h2> Rate the movie - {{ data ? data.name : null}} </h2>
                <v-spacer></v-spacer>
                <v-btn @click="goBack">Back</v-btn>
            </v-card-title>


            <v-form ref="movieRateForm">
                <v-container v-if="data != null">
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="Appraiser name"
                                v-model="model.name"
                                :rules="rules"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="Evaluation"
                                v-model="model.rate"
                                :rules="rules"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col cols="auto">
                            <v-btn @click="save">
                                Save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>

        </v-card>

    </v-container>

</template>

<script>
    import Axios from "axios";

    export default {
        name: 'movie-rate',
        data() {
            return {
                data: null,
                model: {
                    name: '',
                    rate: ''
                },
                rules: [
                    v => !!v || 'This item is required',
                ]
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
            save() {
                if(!this.$refs.movieRateForm.validate()) {
                    return;
                }
                Axios.post(process.env.VUE_APP_BASE_URL + 'rate', {
                    movie_id: this.$route.params.id,
                    name: this.model.name,
                    rate: this.model.rate,
                }).then( () => {
                    this.$router.push({name: 'movie-show', params: { id: this.$route.params.id}});
                }).catch( (error) => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getAll(this.$route.params.id);
        }
    }
</script>