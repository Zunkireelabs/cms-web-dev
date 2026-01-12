import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import path from "path";

export default function (eleventyConfig) {
  // Vite Plugin with configuration
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      build: {
        emptyOutDir: false, // Preserve Eleventy files
        rollupOptions: {
          input: {
            main: path.resolve(process.cwd(), "src/assets/js/main.js"),
          },
        },
      },
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        fs: {
          allow: [process.cwd()],
          strict: false
        },
        allowedHosts: [
          'cms-dev.zunkireelabs.com',
          'localhost',
          '127.0.0.1'
        ]
      }
    },
  });

  // Copy static assets with proper path mapping
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // Shortcode for current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
