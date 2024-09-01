import {
  getCurrentPositionAsync,
  hasServicesEnabledAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { DeviceLocation, LatitudeAndLongitude } from '@/core/types/location';
import { notTrue } from '@/core/utils/boolean';
import _ from 'lodash';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    let { granted } = await requestForegroundPermissionsAsync();
    return granted;
  } catch (e) {
    return notTrue;
  }
};

export const locationPermissionGranted = async (): Promise<boolean> => {
  try {
    return hasServicesEnabledAsync();
  } catch (e) {
    return notTrue;
  }
};

export const getCurrentLocation = async (): Promise<DeviceLocation> => {
  try {
    let location = await getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (e) {
    return { latitude: 0, longitude: 0 };
  }
};

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    );
    const data = await response.json();
    return data.results[0]['formatted_address'];
  } catch (e) {
    return '';
  }
};

const _deg2rad = (degree: number) => {
  return degree * (Math.PI / 180);
};

// Use Haversine formula to calculate the distance between two points and return the distance in miles
export const getDistanceBetweenTwoPoints = (
  x: LatitudeAndLongitude,
  y: LatitudeAndLongitude,
) => {
  const R = 6372; // Approx. Radius of the earth in km
  const latitudeInRad = _deg2rad(x.latitude - y.latitude);
  const longitudeInRad = _deg2rad(x.longitude - y.longitude);

  const a =
    Math.sin(latitudeInRad / 2) * Math.sin(latitudeInRad / 2) +
    Math.cos(_deg2rad(y.latitude)) *
      Math.cos(_deg2rad(x.latitude)) *
      Math.sin(longitudeInRad / 2) *
      Math.sin(longitudeInRad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return _.round(R * c * 0.6214, 2);
};
