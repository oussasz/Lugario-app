import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const geojsonPath = path.join(ROOT, "Algeria-geojson-master", "all-wilayas.geojson");
const citiesCombinedPath = path.join(
  ROOT,
  "algeria-cities-master",
  "json",
  "algeria_cities.json",
);

const outWilayasPath = path.join(ROOT, "data", "algeria-wilayas.json");
const outCommunesFrPath = path.join(ROOT, "data", "algeria-communes-fr.json");
const outCommunesArPath = path.join(ROOT, "data", "algeria-communes-ar.json");
const outBoundsPath = path.join(ROOT, "data", "algeria-bounds.json");

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function computeBboxFromGeometry(geometry) {
  // GeoJSON coordinates are [lng, lat]
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  const visit = (coords) => {
    if (!Array.isArray(coords)) return;
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      const [lng, lat] = coords;
      if (lng < minLng) minLng = lng;
      if (lat < minLat) minLat = lat;
      if (lng > maxLng) maxLng = lng;
      if (lat > maxLat) maxLat = lat;
      return;
    }
    for (const c of coords) visit(c);
  };

  visit(geometry.coordinates);

  if (![minLng, minLat, maxLng, maxLat].every(Number.isFinite)) {
    throw new Error("Failed to compute bbox");
  }

  return {
    minLng,
    minLat,
    maxLng,
    maxLat,
  };
}

function bboxCenterLatLng(bbox) {
  const centerLng = (bbox.minLng + bbox.maxLng) / 2;
  const centerLat = (bbox.minLat + bbox.maxLat) / 2;
  return [centerLat, centerLng];
}

function sortUniqueStrings(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" }),
  );
}

function normalizeName(value) {
  if (!value) return "";
  return String(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "")
    .trim();
}

function main() {
  const geo = JSON.parse(fs.readFileSync(geojsonPath, "utf8"));
  const cities = JSON.parse(fs.readFileSync(citiesCombinedPath, "utf8"));

  // Build wilaya metadata from the authoritative cities dataset
  const wilayaMetaByCode = {};

  const communesFrByCode = {};
  const communesArByCode = {};
  for (const row of cities) {
    const code = String(row.wilaya_code).padStart(2, "0");
    const nameFr = row.wilaya_name_ascii;
    const nameAr = row.wilaya_name;
    if (!wilayaMetaByCode[code]) {
      wilayaMetaByCode[code] = { code, nameFr, nameAr };
    }

    communesFrByCode[code] ??= [];
    communesFrByCode[code].push(row.commune_name_ascii);

    communesArByCode[code] ??= [];
    communesArByCode[code].push(row.commune_name);
  }

  for (const code of Object.keys(communesFrByCode)) {
    communesFrByCode[code] = sortUniqueStrings(communesFrByCode[code]);
  }
  for (const code of Object.keys(communesArByCode)) {
    communesArByCode[code] = sortUniqueStrings(communesArByCode[code]);
  }

  // Index GeoJSON features by normalized name (FR/AR) and by city_code when present
  const featureByCode = new Map();
  const featureByFrName = new Map();
  const featureByArName = new Map();

  for (const f of geo.features ?? []) {
    const props = f.properties ?? {};
    const code = props.city_code != null ? String(props.city_code).padStart(2, "0") : "";
    const nameFr = props.name ?? "";
    const nameAr = props.name_ar ?? "";

    if (code) featureByCode.set(code, f);
    if (nameFr) featureByFrName.set(normalizeName(nameFr), f);
    if (nameAr) featureByArName.set(normalizeName(nameAr), f);
  }

  let countryMinLng = Infinity;
  let countryMinLat = Infinity;
  let countryMaxLng = -Infinity;
  let countryMaxLat = -Infinity;

  const wilayas = Object.values(wilayaMetaByCode)
    .map((meta) => {
      const feature =
        featureByCode.get(meta.code) ||
        featureByFrName.get(normalizeName(meta.nameFr)) ||
        featureByArName.get(normalizeName(meta.nameAr));

      if (!feature) {
        return {
          code: meta.code,
          nameFr: meta.nameFr,
          nameAr: meta.nameAr,
          center: [28.0, 2.8],
          bounds: [
            [18.968147, -8.668908],
            [37.0898503, 11.997337],
          ],
        };
      }

      const bbox = computeBboxFromGeometry(feature.geometry);
      countryMinLng = Math.min(countryMinLng, bbox.minLng);
      countryMinLat = Math.min(countryMinLat, bbox.minLat);
      countryMaxLng = Math.max(countryMaxLng, bbox.maxLng);
      countryMaxLat = Math.max(countryMaxLat, bbox.maxLat);

      return {
        code: meta.code,
        nameFr: meta.nameFr,
        nameAr: meta.nameAr,
        center: bboxCenterLatLng(bbox),
        bounds: [
          [bbox.minLat, bbox.minLng],
          [bbox.maxLat, bbox.maxLng],
        ],
      };
    })
    .sort((a, b) => a.code.localeCompare(b.code));

  const algeriaBounds = [
    [countryMinLat, countryMinLng],
    [countryMaxLat, countryMaxLng],
  ];

  ensureDir(outWilayasPath);
  fs.writeFileSync(outWilayasPath, JSON.stringify(wilayas, null, 2));
  fs.writeFileSync(outCommunesFrPath, JSON.stringify(communesFrByCode, null, 2));
  fs.writeFileSync(outCommunesArPath, JSON.stringify(communesArByCode, null, 2));
  fs.writeFileSync(outBoundsPath, JSON.stringify(algeriaBounds, null, 2));

  console.log("Generated:");
  console.log("-", path.relative(ROOT, outWilayasPath));
  console.log("-", path.relative(ROOT, outCommunesFrPath));
  console.log("-", path.relative(ROOT, outCommunesArPath));
  console.log("-", path.relative(ROOT, outBoundsPath));
}

main();
