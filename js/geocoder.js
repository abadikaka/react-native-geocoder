import { NativeModules } from 'react-native';
import GoogleApi from './googleApi.js';

const { RNGeocoder } = NativeModules;

export default {
  apiKey: null,

  fallbackToGoogle(key) {
    this.apiKey = key;
  },

  geocodePositionWithLanguage(position, language){
	if (!position || !position.lat || !position.lng) {
      return Promise.reject(new Error("invalid position: {lat, lng} required"));
    }

    return RNGeocoder.geocodePositionWithLanguage(position, language).catch(err => {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodePosition(this.apiKey, position);
    });
  }

  geocodeAddressWithLanguage(address, language) {
    if (!address) {
      return Promise.reject(new Error("address is null"));
    }

    return RNGeocoder.geocodeAddressWithLanguage(address, language).catch(err => {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodeAddress(this.apiKey, address);
    });
  },
  
  geocodePosition(position) {
    if (!position || !position.lat || !position.lng) {
      return Promise.reject(new Error("invalid position: {lat, lng} required"));
    }

    return RNGeocoder.geocodePosition(position).catch(err => {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodePosition(this.apiKey, position);
    });
  },

  geocodeAddress(address) {
    if (!address) {
      return Promise.reject(new Error("address is null"));
    }

    return RNGeocoder.geocodeAddress(address).catch(err => {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodeAddress(this.apiKey, address);
    });
  },
}
