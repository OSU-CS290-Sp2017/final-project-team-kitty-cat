(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['movieView'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"description\">\n  <h1 class=\"movie-title-display\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n  <div class=\"placeToPutReview\">\n    <p class=\"review\">"
    + alias4(((helper = (helper = helpers.review || (depth0 != null ? depth0.review : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"review","hash":{},"data":data}) : helper)))
    + "</p>\n  </div>\n  <p class=\"rating\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/10</p>\n    <!--This will be another tag if we want some form of graphics to be adjusted by rating-->\n</div>\n";
},"useData":true});
})();