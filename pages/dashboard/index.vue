<template>
    <div class="d-flex dashboard">
        <v-card class="dashboard_map" :loading="loading" max-height="calc(100vh - 128px)" max-width="48%">
            <div class="map"></div>
        </v-card>
        <v-card class="dashboard_cleanings" max-height="calc(100vh - 128px)" max-width="48%">
            <v-tabs v-if="showNavigationTab" v-model="tab" :show-arrows="true" center-active align-tabs="center">
                <v-tab :text="$t('history')" :value="0"/>
                <v-tab :text="$t('newCleaning')" :value="1"/>
            </v-tabs>
            <v-window v-model="tab" class="dashboard_functionalPanel">
                <v-window-item :value="0" class="history">
                    <div>History</div>
                </v-window-item>
                <v-window-item :value="1" class="newWashingOrder">
                    <v-form @submit.prevent="orderWashing">
                        <!-- TODO add icons before inputs -->
                        <v-autocomplete v-model="googleAddress" @input="selectAddress" item-text="description" :search-input.sync="addressStr" :items="predictions" :label="$t('typeAddress')" hide-no-data hide-selected rounded return-object variant="solo" />
                        <v-select v-model="washing.vehicleId" :label="$t('selectCar')" rounded variant="solo" />
                        <v-text-field v-model="washing.description" :label="$t('typeDescription')" persistent-counter rounded variant="solo"/>
                        <v-btn type="submit" class="newWashingOrder_button"> {{ $t('next') }} </v-btn>
                    </v-form>
                </v-window-item>
                <v-window-item :value="3" class="history">
                    <success-content/>
                </v-window-item>
            </v-window>
        </v-card>
        <v-card class="dashboard_ocasions"  max-height="50vh" max-width="48%">
            <div> Special occasions </div>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { GoogleMap } from '~/mod/maps/googleMaps/GoogleMap';
import './dashboard.scss';
import { validateSync } from 'class-validator';
import { Washing } from '~/model/washing/Washing';

@Component
export default class GetStarted extends Vue {
    mapObject!: GoogleMap;
    googleAddress!: google.maps.places.AutocompletePrediction;
    addressStr!: string;
    washing = new Washing();
    predictions: google.maps.places.AutocompletePrediction[] = [];
    loading = true;
    showNavigationTab = true;
    tab = 0;

    created() {
        this.mapObject = new GoogleMap();
    }

    async mounted() {
        try {
            await this.mapObject.init(document.querySelector('.map') as HTMLElement);
            this.loading = false;
            if (navigator?.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => this.mapObject.fitViewToPoints({ lat: position.coords.latitude, lng: position.coords.longitude}),
                    (error) => console.warn(error),
                );
            }
        } catch (error) {
            this.loading = true;
            throw error;
        }
    }

    async getAutocompletePredictions(value: string) {
        if (value && value !== this.googleAddress?.description) {
            await this.getPlaceSuggestionsForAutocomplete();
        }
    }

    async getPlaceSuggestionsForAutocomplete(): Promise<void> {
        const response = await this.mapObject.getPlacePredictions(this.addressStr);
        this.predictions = response.predictions;
    }

    async selectAddress(item: google.maps.places.AutocompletePrediction): Promise<void> {
        if (!item) {
            return;
        }

        const addressDetails = await this.mapObject.getPlaceDetails(item.place_id);
        this.washing.address = this.mapObject.parseAddress(addressDetails);
        if (validateSync(this.washing.address, { groups: ['cleaningAddress'] }).length !== 0) {
            // TODO: handle lack of data
            console.warn('address error');
        }
    }

    async orderWashing() {
        console.log('success');
        this.tab = 3;
        this.showNavigationTab = false;
    }
}
</script>