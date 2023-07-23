<template>
    <v-app>
        <div class="empty-layout">
            <app-bar :drawer="drawer"/>
            <slot/>
        </div>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
    name: 'header-layout',
})
export default class Empty extends Vue {
    drawer=false;
}
</script>
<style>
.empty-layout {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(103,80,164,1) 100%);
    height: 100vh;
    overflow: hidden;
}
</style>