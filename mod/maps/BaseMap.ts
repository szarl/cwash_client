
export abstract class BaseMap {

    readonly earthRadiusMiles = 3958.8; 
    
    mapNode: Element;
    abstract map: object;
    currentPosition: { lat: number, lng: number };

    abstract init(node: Element, styles?: object): Promise<void>;

    abstract centerOnPoint(position: { lat: number, lng: number}): void;

    abstract addMarker(position: { lat: number, lng: number }, image: object, title?: string, distance?: string): google.maps.Marker;

    abstract setMapOptions(options: object): void;

    abstract addCurrentPositionMarker(pos: { lat: number, lng: number }): void;

    abstract getPlacePredictions(address: string): Promise<google.maps.places.AutocompleteResponse>;

    abstract getPlaceDetails(placeId: string): Promise<google.maps.GeocoderResult>;

    abstract fitViewToPoints(points: {lat: number, lng: number}): void;

    abstract calculateDistance(
        start: string|google.maps.LatLng|google.maps.LatLngLiteral|google.maps.Place,
        end: string|google.maps.LatLng|google.maps.LatLngLiteral|google.maps.Place
    ): Promise<number|undefined>;

    abstract parseAddress(components: object): any;

    centerOnCurrentLocation(addMarker: boolean): void|{ lat: number, lng: number } {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    this.centerOnPoint(pos);
                    if(addMarker) {
                        this.addCurrentPositionMarker(pos);
                    }
                },
                () => {
                    this.handleLocationError();
                }
            )
        } else {
            this.handleLocationError();
        }
    }

    getCurrentPosition(addMarker: boolean): void {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.currentPosition = pos;
                if (addMarker) {
                    this.addCurrentPositionMarker(pos);
                }
            }
        )

    }

    handleLocationError(): void {
        console.warn("Location is not available");
    }
}
