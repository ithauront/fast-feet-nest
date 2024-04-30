"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocation = void 0;
class GeoLocation {
    constructor(latitude, longitude) {
        if (latitude < -90 || latitude > 90) {
            throw new Error('Latitude must be between -90 and 90.');
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error('Longitude must be between -180 and 180.');
        }
        this.latitude = latitude;
        this.longitude = longitude;
    }
    getDistanceTo(to) {
        const earthRadiusKm = 6371;
        const dLat = this.degreesToRadians(to.latitude - this.latitude);
        const dLon = this.degreesToRadians(to.longitude - this.longitude);
        const lat1 = this.degreesToRadians(this.latitude);
        const lat2 = this.degreesToRadians(to.latitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    }
    degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
}
exports.GeoLocation = GeoLocation;
//# sourceMappingURL=geolocation.js.map