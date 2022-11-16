const DEFAULT_VOLUME_DYNAMIC_RANGE_DB = 50;
const DEFAULT_VOLUME_BOOST_DYNAMIC_RANGE_DB = 6;

export function perceptualToAmplitude(
  perceptual: number,
  normalizedMax: number = 1,
  range: number = DEFAULT_VOLUME_DYNAMIC_RANGE_DB,
  boostRange: number = DEFAULT_VOLUME_BOOST_DYNAMIC_RANGE_DB
) {
  if (perceptual === 0) {
    return 0;
  }
  let db;
  if (perceptual > normalizedMax) {
    db = ((perceptual - normalizedMax) / normalizedMax) * boostRange;
  } else {
    db = (perceptual / normalizedMax) * range - range;
  }
  return normalizedMax * Math.pow(10, db / 20);
}

export function amplitudeToPerceptual(
  amp: number,
  normalizedMax: number = 1,
  range: number = DEFAULT_VOLUME_DYNAMIC_RANGE_DB,
  boostRange: number = DEFAULT_VOLUME_BOOST_DYNAMIC_RANGE_DB
) {
  if (amp === 0) {
    return 0;
  }
  const db = 20 * Math.log10(amp / normalizedMax);
  let perceptual;
  if (db > 0) {
    perceptual = db / boostRange + 1;
  } else {
    perceptual = (range + db) / range;
  }
  return normalizedMax * perceptual;
}