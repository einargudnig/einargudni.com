// Solar position for Reykjavík, after SunCalc (Vladimir Agafonkin, BSD-2).
// The site prints a day or night edition depending on whether the sun is up
// over Reykjavík right now, so this runs in the browser and, serialised, in
// the pre-paint script in __root.tsx. Keep `sunAltitude` self-contained: no
// imports, no closure over module scope, or the serialised copy breaks.

export const REYKJAVIK = { lat: 64.1466, lng: -21.9426 };

// Below this the sky is dark enough to read the night edition (civil dusk).
export const NIGHT_BELOW_DEG = -6;

export function sunAltitude(date: Date, lat: number, lng: number): number {
  const rad = Math.PI / 180;
  const days = date.getTime() / 86400000 - 10957.5;
  const meanAnomaly = rad * (357.5291 + 0.98560028 * days);
  const center =
    rad *
    (1.9148 * Math.sin(meanAnomaly) +
      0.02 * Math.sin(2 * meanAnomaly) +
      0.0003 * Math.sin(3 * meanAnomaly));
  const eclipticLng = meanAnomaly + center + rad * 102.9372 + Math.PI;
  const obliquity = rad * 23.4397;
  const declination = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLng));
  const rightAscension = Math.atan2(
    Math.sin(eclipticLng) * Math.cos(obliquity),
    Math.cos(eclipticLng),
  );
  const siderealTime = rad * (280.16 + 360.9856235 * days) + rad * lng;
  const hourAngle = siderealTime - rightAscension;
  const phi = rad * lat;
  return (
    Math.asin(
      Math.sin(phi) * Math.sin(declination) +
        Math.cos(phi) * Math.cos(declination) * Math.cos(hourAngle),
    ) / rad
  );
}

export const isNight = (date = new Date()) =>
  sunAltitude(date, REYKJAVIK.lat, REYKJAVIK.lng) < NIGHT_BELOW_DEG;

// Sunrise and sunset (upper limb at the horizon, -0.833°) for the UTC day of
// `date`. Iceland keeps UTC all year, so the UTC day is the local day. A
// minute-by-minute scan is 1440 cheap evaluations and needs none of SunCalc's
// inverse formulas; Reykjavík is south of the Arctic Circle, so both exist.
export function sunTimes(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  let rise: Date | undefined;
  let set: Date | undefined;
  let previous = sunAltitude(new Date(start), REYKJAVIK.lat, REYKJAVIK.lng) > -0.833;
  for (let minute = 1; minute <= 1440; minute++) {
    const at = new Date(start + minute * 60000);
    const up = sunAltitude(at, REYKJAVIK.lat, REYKJAVIK.lng) > -0.833;
    if (up && !previous) rise ??= at;
    if (!up && previous) set = at;
    previous = up;
  }
  return { rise, set };
}
