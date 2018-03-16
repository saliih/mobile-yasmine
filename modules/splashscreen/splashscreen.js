define(['jquery', 'underscore', 'backbone', 'modules/baseview/baseview', 'text!modules/splashscreen/splashscreenTemplate.html'],
	function ($, _, Backbone, BaseView, template) {

	var View = BaseView.extend({
			//initialize template
			template : _.template(template),
			noScroll: true,
			appended: function () {

			}
		});
	return View;
});