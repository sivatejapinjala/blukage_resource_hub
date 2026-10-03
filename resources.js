// This is the only file you normally need to edit to manage site content.
// Add, edit, or remove categories and posts in the arrays below.
// A post's category field must match a category id exactly.
//
// Category fields:
//   id          Unique URL-friendly category folder name
//   name        Category label shown to visitors
//   description Short category introduction and sharing description
//
// Post fields:
//   id          URL-friendly, unique name used in the post URL
//   title       Post title
//   category    The id of a category from the categories array
//   description Short description shown on the post page
//   resources   Links collected in this social media post
//
// Resource fields:
//   title       Name of the article, video, tool, or other resource
//   source      Website or creator name
//   url         Full external URL; it opens directly in a new tab
//   cta         Button text, such as "Read Article" or "Watch Video"

export const categories = [
  {
    id: "tools",
    name: "Tools",
    description: "Tools I find useful.",
  },
  {
    id: "articles",
    name: "Articles",
    description: "Articles and reads worth saving.",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Videos and channels worth watching.",
  },
  {
  id: "websites",
  name: "Websites",
  description: "Websites worth bookmarking for design and branding."
  },
  {
    id: "other",
    name: "Other",
    description: "Other creative resources I want to keep close.",
  },
];

export const posts = [
  {
    id: "branding-articles",
    title: "Branding Articles to Save",
    category: "articles",
    description: "A few thoughtful reads about visual identity, brand systems, and distinctive design.",
    resources: [
      {
        title: "Design Articles",
        source: "Smashing Magazine",
        url: "https://www.smashingmagazine.com/category/design/",
        cta: "Read Articles"
      },
      {
        title: "Brand Identity Inspiration",
        source: "Awwwards",
        url: "https://www.awwwards.com/websites/branding/",
        cta: "Explore Stories"
      }
    ]
  },
  {
    id: "typography-resources",
    title: "Typography & Type Pairing Reads",
    category: "articles",
    description: "Helpful starting points for learning about type, choosing fonts, and using typography with intention.",
    resources: [
      {
        title: "Fonts Knowledge",
        source: "Google Fonts",
        url: "https://fonts.google.com/knowledge",
        cta: "Explore Typography"
      },
      {
        title: "Typography Resources",
        source: "Typewolf",
        url: "https://www.typewolf.com/",
        cta: "Explore Resources"
      }
    ]
  },
  {
    id: "design-tools",
    title: "Quick Tools for Design Work",
    category: "tools",
    description: "A couple of handy browser based tools for prototyping and building color palettes.",
    resources: [
      {
        title: "Figma Design",
        source: "Figma",
        url: "https://www.figma.com/",
        cta: "Open Tool"
      },
      {
        title: "Color Palette Generator",
        source: "Coolors",
        url: "https://coolors.co/",
        cta: "Create a Palette"
      }
    ]
  },
  {
    id: "design-youtube",
    title: "Design Videos to Watch",
    category: "youtube",
    description: "Video search links for practical lessons on graphic design and visual identity.",
    resources: [
      {
        title: "Graphic Design Fundamentals",
        source: "YouTube",
        url: "https://www.youtube.com/results?search_query=graphic+design+fundamentals",
        cta: "Watch Videos"
      },
      {
        title: "Brand Identity Design Tutorials",
        source: "YouTube",
        url: "https://www.youtube.com/results?search_query=brand+identity+design+tutorial",
        cta: "Watch Videos"
      }
    ]
  },
  {
    id: "design-resources",
    title: "Places to Find Design Inspiration",
    category: "other",
    description: "Explore visual work and collect references from creative communities.",
    resources: [
      {
        title: "Creative Work & Portfolios",
        source: "Behance",
        url: "https://www.behance.net/",
        cta: "Explore Work"
      },
      {
        title: "A Place for Collections",
        source: "Are.na",
        url: "https://www.are.na/",
        cta: "Explore Channels"
      }
    ]
  },
  {
  id: "3-branding-websites",
  category: "websites",
  title: "3 Websites to Bookmark If You're Getting Into Branding",
  description: "Three websites worth bookmarking for typography, brand identities, and real-world branding references.",
  resources: [
    {
      title: "Fonts In Use",
      source: "Fonts In Use",
      url: "https://fontsinuse.com/",
      cta: "Visit Website"
    },
    {
      title: "Brand New",
      source: "UnderConsideration",
      url: "https://www.underconsideration.com/brandnew/",
      cta: "Visit Website"
    },
    {
      title: "The Brand Identity",
      source: "The Brand Identity",
      url: "https://the-brandidentity.com/",
      cta: "Visit Website"
    }
  ]
},
];
