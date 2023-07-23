<template>
    <div>
        <h1> Hello user </h1>
        <div> Start your journey </div>
        <v-btn to="/register"> Start </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
    render: () => definePageMeta({ layout: 'empty' }),
})
export default class GetStarted extends Vue {
}
</script>