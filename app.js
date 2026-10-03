import { categories, posts } from "./resources.js";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function postHref(post) {
  const fromHome = document.body.dataset.page === "home";
  return fromHome
    ? `./${encodeURIComponent(post.category)}/${encodeURIComponent(post.id)}/`
    : `./${encodeURIComponent(post.id)}/`;
}

function renderPostRow(post, index) {
  const link = element("a", "post-row");
  link.href = postHref(post);
  const number = element("span", "post-number", String(index + 1).padStart(2, "0"));
  const details = element("span", "post-row-details");
  details.append(element("span", "post-row-title", post.title));
  details.append(element("span", "post-row-description", post.description));
  const arrow = element("span", "post-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  link.append(number, details, arrow);
  return link;
}

function renderHome() {
  const categoryLinks = document.querySelector("#category-links");
  categories.forEach((category, index) => {
    const count = posts.filter((post) => post.category === category.id).length;
    const link = element("a", "category-link");
    link.href = `./${encodeURIComponent(category.id)}/`;
    link.append(element("span", "category-number", `0${index + 1}`));
    link.append(element("span", "category-name", category.name));
    link.append(element("span", "category-count", `${count} ${count === 1 ? "POST" : "POSTS"}`));
    link.append(element("span", "category-arrow", "↗"));
    categoryLinks.append(link);
  });

  const latest = document.querySelector("#latest-posts");
  const recentPosts = [...posts].slice(-4).reverse();
  recentPosts.forEach((post, index) => latest.append(renderPostRow(post, index)));
  if (!recentPosts.length) latest.append(element("p", "empty-state", "Posts you add to resources.js will appear here."));
}

function renderCategory() {
  const appBasePath = new URL(".", import.meta.url).pathname;
  const pagePath = window.location.pathname;
  const sitePath = pagePath.startsWith(appBasePath)
    ? pagePath.slice(appBasePath.length)
    : pagePath.replace(/^\/+/, "");
  const categoryId = decodeURIComponent(sitePath.split("/").filter(Boolean)[0] || "");
  const category = categories.find((item) => item.id === categoryId);
  if (!category) return;

  document.title = `${category.name} — Siva's Resource Hub`;
  document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((meta) => {
    meta.content = `${category.name} — Siva's Resource Hub`;
  });
  document.querySelectorAll('meta[property="og:description"], meta[name="twitter:description"]').forEach((meta) => {
    meta.content = category.description;
  });
  document.querySelector('meta[name="description"]').content = category.description;
  document.querySelector("#category-title").textContent = category.name;
  document.querySelector("#category-kicker").textContent = category.name.toUpperCase();
  document.querySelector("#breadcrumb-category").textContent = category.name.toUpperCase();

  const categoryPosts = posts.filter((post) => post.category === category.id);
  document.querySelector("#post-count").textContent = `${categoryPosts.length} ${categoryPosts.length === 1 ? "POST" : "POSTS"}`;
  const list = document.querySelector("#category-posts");
  categoryPosts.forEach((post, index) => list.append(renderPostRow(post, index)));
  if (!categoryPosts.length) list.append(element("p", "empty-state", "No posts in this category yet."));
}

function renderPost() {
  const post = posts.find((item) => item.id === document.body.dataset.postId && item.category === document.body.dataset.postCategory);
  if (!post) {
    document.querySelector("#main-content").innerHTML = '<section class="not-found"><p class="eyebrow">NOT IN THIS COLLECTION</p><h1>Post not found.</h1><a class="text-link" href="../../">Back to the library ↗</a></section>';
    return;
  }

  const category = categories.find((item) => item.id === post.category);
  if (!category) return;
  document.querySelector("#post-category-link").href = `../../${encodeURIComponent(category.id)}/`;
  const resources = document.querySelector("#post-resources");
  document.querySelector("#resource-count").textContent = `${post.resources.length} ${post.resources.length === 1 ? "LINK" : "LINKS"}`;

  post.resources.forEach((resource) => {
    const link = element("a", "resource-link");
    link.href = resource.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${resource.cta}: ${resource.title} at ${resource.source} (opens in a new tab)`);
    const info = element("span", "resource-info");
    info.append(element("span", "resource-title", resource.title));
    info.append(element("span", "resource-source", resource.source));
    link.append(info);
    link.append(element("span", "resource-cta", resource.cta));
    link.append(element("span", "resource-arrow", "↗"));
    resources.append(link);
  });
  if (!post.resources.length) resources.append(element("p", "empty-state", "Add resource links to this post in resources.js."));
}

document.querySelector("#year").textContent = new Date().getFullYear();
if (document.body.dataset.page === "home") renderHome();
if (document.body.dataset.page === "category") renderCategory();
if (document.body.dataset.page === "post") renderPost();
