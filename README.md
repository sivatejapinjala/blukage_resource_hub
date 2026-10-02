# Siva's Resource Hub

A lightweight, static website for sharing collections of useful resources from social media posts. It uses HTML, CSS, and vanilla JavaScript. There is no backend, database, framework, or external API.

## How it works

`resources.js` is the source of truth for both categories and posts. The homepage shows every category in its `categories` array. Each category page shows the posts whose `category` field matches that category's ID. A post page shows its description and direct links to all of that post's resources.

GitHub Pages serves files, so `npm run build` uses the included Node.js build script to create category and post pages. A category with ID `articles` and a post with ID `branding-articles` is published at `/articles/branding-articles/`. The generated folders are website output; edit `resources.js`, not those generated files.

## Important files

- `resources.js` — the only file you normally edit to add, change, or remove categories, posts, and resources.
- `index.html` — homepage structure and homepage sharing metadata.
- `category.html` — template used for each category page.
- `post-template.html` — template used for each post page.
- `app.js` — displays category and post data in the website.
- `styles.css` — layout, colors, typography, and responsive styles.
- `build.js` — creates the static category and post pages from the templates and data.
- `<category-id>/` folders — generated category and post pages. Do not edit these by hand.

## Add a category

1. Open `resources.js` and find the `categories` array near the top.
2. Add a category object inside the array, with a comma after the previous object:

   ```js
   {
     id: "new-category",
     name: "New Category",
     description: "A short description of this category."
   }
   ```

3. Use a unique, lowercase `id` made of letters, numbers, and hyphens. The ID becomes the category URL, such as `/new-category/`.
4. `name` is the label visitors see. `description` appears on the category page and is used for its sharing description.
5. Save the file and run `npm run build`. The homepage link and category page are generated automatically.
6. To add posts to the new category, set each post's `category` field to the category ID, such as `"new-category"`.

## Add a post

1. Open `resources.js` in a text editor.
2. Inside the `posts` array, copy the example post in the comments and paste it between the square brackets. If another post is already there, put a comma after the previous post's closing `}`.
3. Replace the example values:
   - `id`: a unique, lowercase URL name using letters, numbers, and hyphens, such as `brand-strategy-links`.
   - `title`: the post title visitors will see.
   - `category`: the exact ID of a category in the `categories` array, such as `"articles"`.
   - `description`: a short explanation of the collection.
   - `resources`: the links in the post. Each one needs `title`, `source`, `url`, and `cta`.
4. Save `resources.js` and run the build command in “Test locally” below. No HTML, CSS, or JavaScript edits are needed for a normal post.

Example post:

```js
{
  id: "branding-articles",
  title: "5 Branding Articles Worth Reading",
  category: "articles",
  description: "A short description of this collection.",
  resources: [
    {
      title: "Kiss Branding",
      source: "DesignWeek",
      url: "https://example.com",
      cta: "Read Article"
    },
    {
      title: "Another Article",
      source: "Website Name",
      url: "https://example.com/another-article",
      cta: "Read Article"
    }
  ]
}
```

## Edit or remove content

- **Edit a post:** change its title, category, description, ID, or resource list in `resources.js`. Changing the ID changes that post's URL.
- **Remove a post:** delete that entire post object, including its braces, from the `posts` array.
- **Add a resource:** add another object inside that post's `resources` square brackets. Separate resource objects with commas.
- **Edit a resource:** change its title, source, URL, or CTA in `resources.js`.
- **Remove a resource:** delete that resource object from the post's `resources` array.

Run the build after each content change so the generated category and post pages match the data.

## Test locally

Install [Node.js](https://nodejs.org/) if it is not already installed. From this project folder:

1. Open a terminal.
2. Run `npm run build`.
3. Start a local static server, for example with `npx serve .`.
4. Open the local address printed by the server in a browser.

The build uses only Node.js built-in modules; the website has no runtime dependencies. The `npx serve` command may download the temporary local server if it is not already available. The site can also be previewed using another local static file server.

## Commit and push changes

After editing `resources.js` and rebuilding:

1. Save all changes.
2. In a terminal opened in this folder, run `git status` to review the files that changed.
3. Run `git add -A` to stage the updated data and generated pages.
4. Run `git commit -m "Add resource posts"`.
5. Run `git push origin master`.

If your GitHub repository uses a branch other than `master`, replace `master` with that branch name.

## GitHub Pages deployment

GitHub Pages publishes static files from a repository branch. In the repository's GitHub settings, open **Pages** and choose the branch and folder containing the site files (usually the repository root). Once Pages is enabled, each push to that branch updates the published site. Build the pages locally with `npm run build` before committing and pushing so the generated category and post URLs are included.

## Design notes

The interface is text based and has no image or thumbnail dependency. It uses the requested Space Grotesk and Satori font names when those fonts are available on the device, with system sans-serif fallbacks. No remote font service is required.
