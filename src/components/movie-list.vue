<template>
    <v-container>

        <v-card>

            <v-card-title>
                <h2>Movies</h2>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="items">

                <template v-slot:item.action="{ item }">

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn text icon v-on="on" @click="view(item.id)">
                                <v-icon>visibility</v-icon>
                            </v-btn>
                        </template>
                        <span>View</span>
                    </v-tooltip><!-- show -->

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn text icon v-on="on" @click="rate(item.id)">
                                <v-icon>star</v-icon>
                            </v-btn>
                        </template>
                        <span>Rate</span>
                    </v-tooltip><!-- rate -->

                </template>

            </v-data-table>

        </v-card>

    </v-container>
</template>

<script>

    import Axios from 'axios';

    export default {
        name: 'movie-list',
        data() {
            return {
                headers: [
                    {text: 'Name', value: 'name'},
                    {text: 'Year', value: 'year'},
                    {text: 'Duration', value: 'duration'},
                    {text: 'Directors', value: 'directors'},
                    {text: '', value: 'action', sortable: false, align: 'right'}
                ],
                items: []
            }
        },
        methods: {
            getAll() {
                Axios.get(process.env.VUE_APP_BASE_URL + 'movie').then( (res) => {
                    this.items = res.data.data.data;
                }).catch( (error) => {
                    console.log(error);
                });
            },
            rate(id) {
                this.$router.push({name: 'movie-rate', params: {id: id}});
            },
            view(id) {
                this.$router.push({name: 'movie-show', params: {id: id}});
            }
        },
        mounted() {
            this.getAll();
        }
    }

</script>