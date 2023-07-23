import { Loader } from "@googlemaps/js-api-loader";
import { BaseMap } from "../BaseMap";
import { conf } from "~/conf/conf";

export class GoogleMap extends BaseMap {
    map: google.maps.Map;
    autocomplete: google.maps.places.AutocompleteService;
    geocoder: google.maps.Geocoder;
    directionsService: google.maps.DirectionsService;
    distanceService: google.maps.DistanceMatrixService;

    async init(node: HTMLElement, styles?: google.maps.MapTypeStyle[]): Promise<void> {
        this.mapNode = node;
        const loader = new Loader({
            apiKey: conf.googleKey,
            version: 'weekly',
            libraries: ['places'],
            language: 'en',
        });

        await loader.load();
        this.map = new google.maps.Map(node, {
            zoom: 10,
            center: { lat: 51.1000000, lng: 17.0333300 }
        });
        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
        this.directionsService = new google.maps.DirectionsService();
        this.distanceService = new google.maps.DistanceMatrixService();
    }

    centerOnPoint(position: { lat: number, lng: number }): void {
        this.map.setCenter(position);
    }

    addMarker(position: { lat: number, lng: number }, image: google.maps.Icon, title?: string, distance?: string): google.maps.Marker {
        const marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: image,
            title: title
        });
        if (marker.getTitle()) {
            const infoWindow = new google.maps.InfoWindow({
                maxWidth: 170,
            });
            if (distance) {
                let content = `<p style="padding-bottom:5px;margin-bottom:5px;border-bottom:solid 1px #E4DED0;font-family:Kamerik105;font-size:12px;font-weight:400;line-height:160%">${title}</p><p style="margin-bottom:0;font-family:Kamerik105;font-size:12px;font-weight:400;line-height:160%">${distance} mi</p>`
                infoWindow.setContent(content);
            } else {
                infoWindow.setContent(title);
            }

            infoWindow.open(marker.getMap(), marker)
        }
        return marker;
    }

    setMapOptions(options: google.maps.MapOptions): void {
        this.map.setOptions(options)
    }

    addCurrentPositionMarker(position: { lat: number, lng: number }) {
        this.centerOnCurrentLocation(false)
        this.addMarker(position, {
                url: '/carPoint.svg',
                scaledSize: new google.maps.Size(100, 100),
                anchor: new google.maps.Point(50, 50),
            });
    }

    getPlacePredictions(address: string): Promise<google.maps.places.AutocompleteResponse> {
        return this.autocomplete.getPlacePredictions({ input: address });
    }

    async getPlaceDetails(placeId: string): Promise<google.maps.GeocoderResult> {
        const details = await this.geocoder.geocode({ placeId });
        return details.results[0];
    }

    fitViewToPoints(point: {lat: number, lng: number}) {
        console.log(point);
        const bounds = new google.maps.LatLngBounds(point);
        // bounds.extend(point);
        this.map.fitBounds(bounds);
    }

    async calculateDistance(
        start: string|google.maps.LatLng|google.maps.LatLngLiteral|google.maps.Place,
        end: string|google.maps.LatLng|google.maps.LatLngLiteral|google.maps.Place
    ): Promise<number|undefined> {
        const distanceMatrix = await this.distanceService.getDistanceMatrix({
            origins: [start],
            destinations: [end],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        })
        const distance = distanceMatrix.rows[0].elements[0];
        if (distance.status === 'OK') {
            return distance.distance.value / 1609;
        }
    }

    parseAddress(address: google.maps.GeocoderResult): any {
        const addressComponents = address.address_components;
        const postCode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name;
        const countryCode = addressComponents.find(component => component.types.includes('country'))?.short_name;
        const city = addressComponents.find(component => component.types.includes('locality'))?.long_name;
        const route = addressComponents.find(component => component.types.includes('route'))?.long_name;
        const house = addressComponents.find(component => component.types.includes('street_number'))?.long_name;
        const flat = addressComponents.find(component => component.types.includes('subpremise'))?.long_name;
        const administrativeAreaObj = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
        const administrativeRegion = administrativeAreaObj?.long_name;
        const admRegionAbbreviation = administrativeAreaObj?.short_name;
        const street = route ? `${house ? house + ' ': ''}${route}` : null;
        const coords = address.geometry.location;
        return {}
    }
}

