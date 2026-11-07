/**
 * Fails if a previous public property name leaks back into site source,
 * public files, or (with --built) the Next.js output.
 *
 * The old image paths may appear only in lib/legacy-property-paths.mjs
 * and in redirect/middleware build artifacts that embed that list.
 */
import fs from "node:fs";
import path from "node:path";
import { legacyPropertyRedirects } from "../lib/legacy-property-paths.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const built = process.argv.includes("--built");

const EXPECTED = [
  {
    previous: "Villa Candace",
    nickname: "Hickory",
    redirects: [
      ["/images/villacandace-before.png", "/images/hickory-before.png"],
      ["/images/villacandace-after.png", "/images/hickory-after.png"],
      ["/images/villa-candace/candacekitchen.jpg", "/images/hickory/kitchen.jpg"],
    ],
  },
  {
    previous: "Raven",
    nickname: "Auburn",
    redirects: [
      ["/images/raven/ravenkitchen.jpg", "/images/auburn/kitchen.jpg"],
      ["/images/raven/ravenbed1.jpg", "/images/auburn/bed-1.jpg"],
      ["/images/raven/ravenbed2.jpg", "/images/auburn/bed-2.jpg"],
      ["/images/raven/ravenbed3.jpg", "/images/auburn/bed-3.jpg"],
    ],
  },
];

const FORBIDDEN = [
  { label: "Villa Candace", re: /villa[\s_-]*candace/gi },
  { label: "Candace", re: /candace/gi },
  { label: "Raven", re: /raven/gi },
  { label: "Glen Mora", re: /glen[\s_-]*mora/gi },
  { label: "Glenmora", re: /glenmora/gi },
  { label: "Leland", re: /leland/gi },
  { label: "Mora", re: /\bmora\b/gi },
];

const SOURCE_ALLOW = new Set([
  "lib/legacy-property-paths.mjs",
  "scripts/check-property-privacy.mjs",
]);

const failures = [];

function fail(message) {
  failures.push(message);
}

function rel(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function publicFile(urlPath) {
  return path.join(root, "public", urlPath.replace(/^\/+/, ""));
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function coveredByLegacySource(text, index, length) {
  const forms = [];
  for (const [source] of legacyPropertyRedirects) {
    forms.push(source);
    forms.push(source.replace(/\./g, "\\."));
    forms.push(source.replace(/\./g, "\\\\."));
  }
  for (const source of forms) {
    let from = 0;
    while (from <= text.length) {
      const at = text.indexOf(source, from);
      if (at < 0) break;
      if (index >= at && index + length <= at + source.length) return true;
      from = at + source.length;
    }
  }
  return false;
}

function scanText(file, text, { allowLegacyPaths }) {
  for (const { label, re } of FORBIDDEN) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(text))) {
      if (allowLegacyPaths && coveredByLegacySource(text, match.index, match[0].length)) {
        continue;
      }
      const line = text.slice(0, match.index).split("\n").length;
      fail(`${rel(file)}:${line} still contains ${label} (${JSON.stringify(match[0])})`);
      if (failures.length > 40) return;
    }
  }
}

function assertMapping() {
  const flat = EXPECTED.flatMap((entry) => entry.redirects);
  const same =
    flat.length === legacyPropertyRedirects.length &&
    flat.every((pair, i) => {
      const got = legacyPropertyRedirects[i];
      return got && got[0] === pair[0] && got[1] === pair[1];
    });
  if (!same) {
    fail("legacyPropertyRedirects does not match the locked nickname mapping");
  }

  const nicknames = EXPECTED.map((entry) => entry.nickname);
  if (new Set(nicknames).size !== nicknames.length) {
    fail("nicknames collide");
  }

  const properties = fs.readFileSync(path.join(root, "lib/properties.ts"), "utf8");
  for (const entry of EXPECTED) {
    if (!properties.includes(`name: "${entry.nickname}"`)) {
      fail(`lib/properties.ts is missing public name ${entry.nickname}`);
    }
    for (const [source, destination] of entry.redirects) {
      const unreferenced = destination === "/images/hickory/kitchen.jpg";
      if (!unreferenced && !properties.includes(destination)) {
        fail(`lib/properties.ts is missing ${destination}`);
      }
      if (!fs.existsSync(publicFile(destination))) {
        fail(`missing redirected file public${destination}`);
      }
      if (fs.existsSync(publicFile(source))) {
        fail(`old public file still exists: public${source}`);
      }
    }
    if (properties.toLowerCase().includes(entry.previous.toLowerCase())) {
      fail(`lib/properties.ts still mentions ${entry.previous}`);
    }
  }

  const destinations = new Set(flat.map((pair) => pair[1]));
  if (destinations.size !== flat.length) fail("redirect destinations collide");
}

function assertImageRefs() {
  const files = ["app", "components", "lib"].flatMap((dir) => walk(path.join(root, dir)));
  const refRe = /["'`](\/images\/[^"'`\s]+)["'`]/g;
  for (const file of files) {
    if (!/\.(ts|tsx|js|mjs)$/.test(file)) continue;
    if (SOURCE_ALLOW.has(rel(file))) continue;
    const text = fs.readFileSync(file, "utf8");
    refRe.lastIndex = 0;
    let match;
    while ((match = refRe.exec(text))) {
      const imagePath = match[1];
      const onDisk = publicFile(imagePath);
      if (!fs.existsSync(onDisk)) {
        fail(`${rel(file)} references missing ${imagePath}`);
      }
    }
  }
}

function scanSource() {
  const files = [
    ...["app", "components", "lib", "public", "scripts"].flatMap((dir) => walk(path.join(root, dir))),
    path.join(root, "middleware.js"),
    path.join(root, "next.config.mjs"),
  ];
  for (const file of files) {
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue;
    const name = rel(file);
    if (SOURCE_ALLOW.has(name)) continue;
    const text = fs.readFileSync(file);
    scanText(file, text.toString("latin1"), { allowLegacyPaths: false });
  }
}

function builtAllow(file) {
  const name = rel(file);
  return (
    name.includes("middleware") ||
    name.endsWith("routes-manifest.json") ||
    name.endsWith("required-server-files.json")
  );
}

function scanBuilt() {
  const nextDir = path.join(root, ".next");
  if (!fs.existsSync(nextDir)) {
    fail("--built was set but .next is missing");
    return;
  }
  const files = walk(nextDir);
  for (const file of files) {
    if (file.endsWith(".pack")) continue;
    const text = fs.readFileSync(file).toString("latin1");
    const allowLegacyPaths = builtAllow(file);
    const before = failures.length;
    scanText(file, text, { allowLegacyPaths });
    if (!allowLegacyPaths && failures.length > before) {
      // scanText already recorded the leak
    }
  }
}

assertMapping();
assertImageRefs();
scanSource();
if (built) scanBuilt();

if (failures.length) {
  console.error(`property privacy check failed (${failures.length})`);
  for (const message of failures.slice(0, 40)) console.error(`- ${message}`);
  process.exit(1);
}

console.log(
  `property privacy ok: ${EXPECTED.map((entry) => `${entry.previous} -> ${entry.nickname}`).join("; ")}`,
);
if (built) console.log("built output ok");
