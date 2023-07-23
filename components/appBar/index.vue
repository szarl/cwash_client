<template>
    <v-app-bar class="appBar">
        <template v-slot:prepend v-if="showNavIcon">
            <v-app-bar-nav-icon @click="updateDrawer"/>
        </template>
        <v-app-bar-title class="text-center"> {{ $t('cwash') }} </v-app-bar-title>
    </v-app-bar>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import './appBar.scss';

@Component
export default class AppBar extends Vue {
    @Prop()
    drawer: boolean;

    @Prop({ default: false })
    showNavIcon: boolean;

    updateDrawer(value: boolean) {
        this.$emit('updateDrawer');
    }
}
</script>