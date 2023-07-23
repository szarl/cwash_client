<template>
    <v-app>
        <v-layout class="defaultLayout">
            <v-navigation-drawer class="defaultLayout_drawer" theme="dark" v-model="drawer" floating temporary>
                <v-list color="transparent">
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="dashboard"></v-list-item>
                    <v-list-item prepend-icon="mdi-car-estate" title="Vehicles" to="vehicle"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-box" title="Account" to="account"></v-list-item>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block> Logout </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <app-bar :drawer="drawer" :showNavIcon="true" @updateDrawer="updateDrawer"/>
            <v-main class="defaultLayout_content">
                <slot />
            </v-main>
        </v-layout>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import './deafult.scss';

@Component({})
export default class Default extends Vue {
    drawer=false;

    updateDrawer() {
        this.drawer = !this.drawer;
    }
}
</script>
