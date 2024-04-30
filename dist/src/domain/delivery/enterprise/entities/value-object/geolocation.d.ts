export declare class GeoLocation {
    readonly latitude: number;
    readonly longitude: number;
    constructor(latitude: number, longitude: number);
    getDistanceTo(to: GeoLocation): number;
    private degreesToRadians;
}
