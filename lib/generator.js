'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  const posts = locals.posts.sort(config.index_generator.order_by);

  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  const paginationDir = config.pagination_dir || 'page';
  const basePath = config.index_generator.path || '';

  const languages = Array.isArray(config.language) ? config.language : [config.language];
  
  if (languages.length > 1) {
    const paginationsPerLanguage = languages.filter((language, index) => languages.indexOf(language) === index).map(function(language) {
      const filteredPosts = posts.filter(function(post) {
        return language === (post.lang || "default");
      });
      
      const langPath = language === "default" ? "en" : language;
      return pagination(basePath + "/" + langPath, filteredPosts, {
        perPage: config.index_generator.per_page,
        layout: ['index', 'archive'],
        format: paginationDir + '/%d/',
        data: {
          __index: true
        }
      });
    });
    return paginationsPerLanguage.flat();
  } else {
    return pagination(basePath, posts, {
      perPage: config.index_generator.per_page,
      layout: ['index', 'archive'],
      format: paginationDir + '/%d/',
      data: {
        __index: true
      }
    });
  }
};
