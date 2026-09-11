import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { auditAssets } from "./audit-assets.mjs";

test("reports asset categories and total bytes recursively", async () => {
  const root = await mkdtemp(join(tmpdir(), "landing-assets-"));

  try {
    await mkdir(join(root, "nested"));
    await writeFile(join(root, "logo.svg"), "1234");
    await writeFile(join(root, "photo.jpg"), "123456");
    await writeFile(join(root, "nested", "font.woff2"), "12");
    await writeFile(join(root, "clip.mp4"), "12345678");

    const report = await auditAssets(root);

    assert.equal(report.files.length, 4);
    assert.equal(report.categories.svg.bytes, 4);
    assert.equal(report.categories.raster.bytes, 6);
    assert.equal(report.categories.font.bytes, 2);
    assert.equal(report.categories.video.bytes, 8);
    assert.equal(report.totalBytes, 20);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("classifies extensions case-insensitively and marks unknown files", async () => {
  const root = await mkdtemp(join(tmpdir(), "landing-assets-"));

  try {
    await writeFile(join(root, "hero.AVIF"), "123");
    await writeFile(join(root, "notes.txt"), "12");

    const report = await auditAssets(root);

    assert.equal(report.categories.raster.count, 1);
    assert.equal(report.categories.other.count, 1);
    assert.equal(report.totalBytes, 5);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a path that is not a directory", async () => {
  const root = await mkdtemp(join(tmpdir(), "landing-assets-"));
  const file = join(root, "single.svg");

  try {
    await writeFile(file, "1234");
    await assert.rejects(auditAssets(file), /not a directory/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
