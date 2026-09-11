#!/usr/bin/env node

import { readdir, stat } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CATEGORY_EXTENSIONS = {
  svg: new Set([".svg"]),
  raster: new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]),
  font: new Set([".otf", ".ttf", ".woff", ".woff2"]),
  video: new Set([".mov", ".mp4", ".webm"]),
};

function categoryFor(extension) {
  for (const [category, extensions] of Object.entries(CATEGORY_EXTENSIONS)) {
    if (extensions.has(extension)) return category;
  }

  return "other";
}

async function collectFiles(root, directory, files) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      await collectFiles(root, absolutePath, files);
      continue;
    }

    if (!entry.isFile()) continue;

    const fileStats = await stat(absolutePath);
    const extension = extname(entry.name).toLowerCase();

    files.push({
      path: relative(root, absolutePath).replaceAll("\\", "/"),
      extension,
      category: categoryFor(extension),
      bytes: fileStats.size,
    });
  }
}

export async function auditAssets(inputDirectory) {
  const root = resolve(inputDirectory);
  const rootStats = await stat(root);

  if (!rootStats.isDirectory()) {
    throw new TypeError(`Asset path is not a directory: ${root}`);
  }

  const files = [];
  await collectFiles(root, root, files);
  files.sort((left, right) => left.path.localeCompare(right.path));

  const categories = Object.fromEntries(
    ["svg", "raster", "font", "video", "other"].map((name) => [
      name,
      { count: 0, bytes: 0 },
    ]),
  );

  for (const file of files) {
    categories[file.category].count += 1;
    categories[file.category].bytes += file.bytes;
  }

  return {
    root,
    files,
    categories,
    totalBytes: files.reduce((total, file) => total + file.bytes, 0),
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MiB`;
}

async function runCli() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const directory = args.find((arg) => arg !== "--json");

  if (!directory) {
    throw new Error("Usage: node audit-assets.mjs <asset-directory> [--json]");
  }

  const report = await auditAssets(directory);

  if (json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  console.table(
    report.files.map((file) => ({
      File: file.path,
      Category: file.category,
      Size: formatBytes(file.bytes),
    })),
  );
  console.log(`Total: ${formatBytes(report.totalBytes)}`);
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";

if (invokedPath === import.meta.url) {
  runCli().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
