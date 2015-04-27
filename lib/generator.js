'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts.sort('-date');
  var paginationDir = config.pagination_dir || 'page';

  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/'
  });
};