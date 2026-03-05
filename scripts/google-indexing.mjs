/**
 * Submit URLs to Google Indexing API for faster crawling.
 * Usage: node scripts/google-indexing.mjs
 *
 * Requires: gen-lang-client-*.json service account key at project root.
 * The service account must be added as Owner in Google Search Console.
 */

import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const BASE_URL = "https://www.fitmycv.io";
const DEFAULT_LOCALE = "en";

// Find the service account key file
const keyFile = fs
  .readdirSync(ROOT)
  .find((f) => f.startsWith("gen-lang-client-") && f.endsWith(".json"));

if (!keyFile) {
  console.error("Service account key file not found at project root.");
  process.exit(1);
}

const KEY_PATH = path.join(ROOT, keyFile);

// Build the list of all URLs to index
function getAllUrls() {
  const urls = [];
  const locales = ["fr", "en", "es", "de"];

  // Static pages
  const staticPages = [
    "", // homepage
    "/blog",
    "/pricing",
    "/how-it-works",
    "/features",
    "/privacy",
    "/terms",
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      if (locale === DEFAULT_LOCALE) {
        urls.push(`${BASE_URL}${page || "/"}`);
      } else {
        urls.push(`${BASE_URL}/${locale}${page || ""}`);
      }
    }
  }

  // Blog articles
  for (const locale of locales) {
    const dir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      const slug = file.replace(/\.md$/, "");
      if (locale === DEFAULT_LOCALE) {
        urls.push(`${BASE_URL}/blog/${slug}`);
      } else {
        urls.push(`${BASE_URL}/${locale}/blog/${slug}`);
      }
    }
  }

  return [...new Set(urls)]; // dedupe
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const client = await auth.getClient();
  const urls = getAllUrls();

  console.log(`Submitting ${urls.length} URLs to Google Indexing API...\n`);

  let success = 0;
  let errors = 0;

  // Google Indexing API has a quota of 200 requests/day
  // Process sequentially with a small delay to avoid rate limiting
  for (const url of urls) {
    try {
      const res = await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: {
          url,
          type: "URL_UPDATED",
        },
      });

      const meta = res.data.urlNotificationMetadata;
      console.log(`OK  ${url}`);
      if (meta?.latestUpdate?.notifyTime) {
        console.log(`    Notified: ${meta.latestUpdate.notifyTime}`);
      }
      success++;
    } catch (err) {
      const status = err.response?.status || err.code;
      const message = err.response?.data?.error?.message || err.message;
      console.error(`ERR ${url}`);
      console.error(`    ${status}: ${message}`);
      errors++;

      // Stop if we hit quota limits
      if (status === 429) {
        console.error(
          "\nQuota exceeded. Try again tomorrow (200 URLs/day limit)."
        );
        break;
      }
    }

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone: ${success} submitted, ${errors} errors.`);
}

main().catch(console.error);
