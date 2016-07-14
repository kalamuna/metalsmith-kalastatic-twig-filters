
var equal = require('assert-dir-equal'),
    Metalsmith = require('metalsmith'),
    metalsmithTwigFilters = require('..'),
    metalsmithTwig = require('metalsmith-twig'),
    markdown = require('metalsmith-markdown'),
    rm = require('rimraf').sync;

describe('metalsmith-kalastatic-twig-filters', function(){

  it('should register twig helpers', function(done){
    rm('test/fixtures/simple/build');
    var m = Metalsmith('test/fixtures/simple')
      .use(markdown())
      .use(metalsmithTwigFilters)
      .use(metalsmithTwig({
        directory: 'templates',
        twig: metalsmithTwigFilters.Twig
      }));

    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/simple/build', 'test/fixtures/simple/expected');
      done();
    });
  });

  it('should register dynamic twig helpers', function(done){
    rm('test/fixtures/dynamic/build');
    var m = Metalsmith('test/fixtures/dynamic')
      .use(markdown({}))
      .use(metalsmithTwigFilters({
        filters: {
          "xorcrypt": "xor-crypt"
        }
      }))
      .use(metalsmithTwig({
        directory: 'templates',
        twig: metalsmithTwigFilters.Twig
      }));

    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/dynamic/build', 'test/fixtures/dynamic/expected');
      done();
    });
  });

});
