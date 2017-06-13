(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['movie'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"movie\">\r\n	<div class=\"movie-content\">\r\n		<p class=\"movie-title\">\r\n			<a href=\"/movie/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\r\n		</p>\r\n		<p class=\"movie-director\">\r\n			"
    + alias4(((helper = (helper = helpers.director || (depth0 != null ? depth0.director : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"director","hash":{},"data":data}) : helper)))
    + "\r\n		</p>\r\n		<p class=\"movie-comment\">\r\n			\""
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "\"\r\n		</p>\r\n		<p class=\"movie-plus-minus\">\r\n			"
    + alias4(((helper = (helper = helpers.plusminus || (depth0 != null ? depth0.plusminus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plusminus","hash":{},"data":data}) : helper)))
    + "\r\n		</p>\r\n	</div>\r\n</article>\r\n";
},"useData":true});
})();