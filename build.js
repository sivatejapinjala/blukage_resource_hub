import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categories, posts } from "./resources.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

function validate() {
  const knownCategories = new Set();
  for (const category of categories) {
    if (!category.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.id)) {
      throw new Error(`Invalid category id: ${category.id}`);
    }
    if (knownCategories.has(category.id)) throw new Error(`Category ids must be unique: ${category.id}`);
    if (typeof category.name !== "string" || !category.name.trim()) {
      throw new Error(`Category "${category.id}" needs a name`);
    }
    if (typeof category.description !== "string" || !category.description.trim()) {
      throw new Error(`Category "${category.id}" needs a description`);
    }
    knownCategories.add(category.id);
  }

  const ids = new Set();
  for (const post of posts) {
    if (!post.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)) throw new Error(`Invalid post id: ${post.id}`);
    if (!knownCategories.has(post.category)) throw new Error(`Unknown category id "${post.category}" in ${post.id}`);
    const routeKey = `${post.category}/${post.id}`;
    if (ids.has(routeKey)) throw new Error(`Post ids must be unique within a category: ${routeKey}`);
    ids.add(routeKey);
    if (!Array.isArray(post.resources)) throw new Error(`Post "${post.id}" needs a resources array`);
    for (const resource of post.resources) {
      for (const field of ["title", "source", "url", "cta"]) {
        if (typeof resource[field] !== "string" || !resource[field].trim()) {
          throw new Error(`Resource in "${post.id}" is missing ${field}`);
        }
      }
      let parsedUrl;
      try { parsedUrl = new URL(resource.url); } catch { throw new Error(`Invalid URL in post "${post.id}": ${resource.url}`); }
      if (!["https:", "http:"].includes(parsedUrl.protocol)) throw new Error(`Resource URL must use http or https in "${post.id}"`);
    }
  }
}

async function writeCategoryPages() {
  const template = await readFile(path.join(root, "category.html"), "utf8");
  for (const category of categories) {
    const directory = path.join(root, category.id);
    await mkdir(directory, { recursive: true });
    const page = template
      .replaceAll("{{CATEGORY_ID}}", escapeHtml(category.id))
      .replaceAll("{{CATEGORY_NAME}}", escapeHtml(category.name))
      .replaceAll("{{CATEGORY_NAME_UPPER}}", escapeHtml(category.name.toUpperCase()))
      .replaceAll("{{CATEGORY_DESCRIPTION}}", escapeHtml(category.description));
    await writeFile(path.join(directory, "index.html"), page);
  }
}

async function writePostPages() {
  const template = await readFile(path.join(root, "post-template.html"), "utf8");
  for (const post of posts) {
    const category = categories.find((item) => item.id === post.category);
    const directory = path.join(root, category.id, post.id);
    await mkdir(directory, { recursive: true });
    const values = {
      "{{ID}}": escapeHtml(post.id),
      "{{TITLE}}": escapeHtml(post.title),
      "{{CATEGORY_ID}}": escapeHtml(category.id),
      "{{CATEGORY_NAME}}": escapeHtml(category.name),
      "{{DESCRIPTION}}": escapeHtml(post.description),
    };
    const page = Object.entries(values).reduce((html, [marker, value]) => html.replaceAll(marker, value), template);
    await writeFile(path.join(directory, "index.html"), page);
  }
}

validate();
for (const category of categories) await rm(path.join(root, category.id), { recursive: true, force: true });
await writeCategoryPages();
await writePostPages();
console.log(`Built ${categories.length} category pages and ${posts.length} post pages.`);
