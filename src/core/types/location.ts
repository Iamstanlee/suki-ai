export type DeviceLocation = {
  latitude: number;
  longitude: number;
};

export type LatitudeAndLongitude = DeviceLocation;

export type Address = {
  address?: string;
  city?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
};
