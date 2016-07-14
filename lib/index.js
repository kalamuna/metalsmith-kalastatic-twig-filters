/*
 * metalsmith-kalastatic-twig-filters
*/
'use strict';

var twigFilters = require("kalastatic-twig-filters"),
    Twig = twigFilters.Twig;

module.exports = function plugin( data ) {


  data = (('object' === typeof data)? data : undefined) || {};

  Twig.extend(function(Twig){
    // Dynamic Filters
    // Take an array of functions or strings.
    for (var name in data.filters || {}) {
      var filter = null;
      switch (typeof data.filters[name]) {
        case "string":
          filter = require(data.filters[name]);
          break;
        case "function":
        default:
          filter = data.filters[name];
          break;
      }
      Twig.exports.extendFilter(name, filter);
    }
  });

  return function through (files, metalsmith, done) {
    done();
  };

};

module.exports.Twig = twigFilters.Twig;
