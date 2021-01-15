<template>

    <v-list-item two-line>
        <v-list-item-content>
            <v-list-item-title> {{ pre }} {{ title }} {{ pos }} </v-list-item-title>
            <v-list-item-subtitle> {{ value }} </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

</template>

<script>

    export default {
        name: 'item-show',
        props: [
            'title',
            'value',
            'pre',
            'pos'
        ]
    }

</script>