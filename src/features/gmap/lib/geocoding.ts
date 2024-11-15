import { Business } from "@prisma/client";
import { env } from "~/env"

// Haversine formula to calculate distance between two coordinates
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of Earth in km
  const φ1 = lat1 * Math.PI / 180; // Convert latitude to radians
  const φ2 = lat2 * Math.PI / 180; // Convert latitude to radians
  const Δφ = (lat2 - lat1) * Math.PI / 180; // Latitude difference in radians
  const Δλ = (lon2 - lon1) * Math.PI / 180; // Longitude difference in radians

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

type Coordinates = {
  lat: string;
  lng: string;
}

// Function to sort array of coordinates based on distance from user coordinates
export function sortByNearest(userCoords: Coordinates, coordinatesArray: Business[]) {
  console.log(coordinatesArray)
  
  return coordinatesArray?.sort((a, b) => {
      const distanceA = haversine(parseFloat(userCoords.lat), parseFloat(userCoords.lng), parseFloat(`${a.latitude}`), parseFloat(`${a.longitude}`));
      const distanceB = haversine(parseFloat(userCoords.lat), parseFloat(userCoords.lng), parseFloat(`${b.latitude}`), parseFloat(`${b.longitude}`));
      return distanceA - distanceB; // Sort in ascending order of distance
  });
}


export const geocode = async (address: string) => {
  
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${env.NEXT_PUBLIC_GOOGLE_MAP_API}`)

  const data = await response.json()
  const lat = data.results[0].geometry.location.lat?.toString();
  const lng = data.results[0].geometry.location.lng?.toString();
  console.log({lat, lng})
  return { lat, lng };
}

// Function to get user's latitude and longitude and return as an object
export async function getUserLocation() {
  return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          // Request the user's geolocation
          navigator.geolocation.getCurrentPosition(
              function(position) {
                  const lat = position.coords.latitude;
                  const lng = position.coords.longitude;
                  resolve({ lat, lng }); // Resolve the promise with the location data
              },
              function(error) {
                  reject('Error occurred. Error code: ' + error.code); // Reject the promise if there's an error
              }
          );
      } else {
          reject('Geolocation is not supported by this browser.'); // Reject if geolocation is not supported
      }
  });
}

