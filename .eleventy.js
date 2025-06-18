const { DateTime } = require("luxon");
const { format, isValid } = require("date-fns");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/");
	eleventyConfig.addPassthroughCopy("src/css/");
	eleventyConfig.addPassthroughCopy("src/js/");
	
	eleventyConfig.addWatchTarget("src/css/");
	// Configure Eleventy
	
//Filters
	
//FILTER 1: myDateFormat
// FILTER 1-1: For human-readable dates like "Jun 17, 2025"
	eleventyConfig.addFilter("myDateFormat", (dateObj) => {
 
	console.log("Date object type:", typeof dateObj, dateObj);
	if (!dateObj || !isValid(new Date(dateObj))) {
	return "";
  }

  return format(new Date(dateObj), "MMM dd, yyyy");
});


// FILTER 1-2: For machine-readable dates like "2025-06-17"
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
  const dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
  if (!dt.isValid) {
    return "";
  }

  return dt.toFormat("yyyy-LL-dd");
});

// FILTER 2: Tags List for Archive
// This creates a custom collection named "tagList" that we can use in our templates.
eleventyConfig.addCollection("tagList", function(collectionApi) {
  const tagSet = new Set();
  collectionApi.getAll().forEach(item => {
    (item.data.tags || []).forEach(tag => tagSet.add(tag));
  });

  // We'll filter out our "posts" meta-tag and then sort the list alphabetically.
  return [...tagSet].filter(tag => tag !== "posts").sort();
});

// ... module.exports = function(eleventyConfig) { ... make sure this is all inside the export

// FILTER 3: Markdownify Filter using Markdown-it
  const md = new markdownIt({
    html: true, // This allows HTML tags in your Markdown
  });

  eleventyConfig.addFilter("markdownify", (content) => {
    return md.render(content);
  });
  
 /* Creating the posts collection */
    eleventyConfig.addCollection("posts", function (collection) {

    const coll = collection
      .getFilteredByTag("posts")
      .sort((a, b) => b.data.date - a.data.date);
    // Adds {{ prevPost.url }} {{ prevPost.data.title }} to templates
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });
	
	return {
		dir: {
			input: 'src',
			includes: '_includes',
			output: '_site',
		},
		templateFormats: ['md', 'njk', 'html'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
	};
};