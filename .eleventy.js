module.exports = function(eleventyConfig) {

	// Výchozí výstupní složka: _site

	// Zkopírovat images/ do _site/images
	eleventyConfig.addPassthroughCopy("images");

	// Zkopírovat css/ to _site/css/
	eleventyConfig.addPassthroughCopy("css");

  // Zkopírovat js/ to _site/js/
  eleventyConfig.addPassthroughCopy("js");

  // Zkopírovat icons/ to _site/icons/
  eleventyConfig.addPassthroughCopy("icons");

  // Zkopírovat icons/ to _site/icons/
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });  

  return {
    // možné formáty šablon
    templateFormats: ["njk", "html", "md", "liquid"],

    // jako šablonovací jazyk zvolíme Nunjucks
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  }

};
