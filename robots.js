import robotstxt from "generate-robotstxt";

robotstxt({
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: "/search",
      crawlDelay: 2
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/"
    }
  ],
  sitemap: "https://mietdas.de/sitemap.xml",
  host: "https://mietdas.de"
}).then(content => {
  console.log(content);
});
