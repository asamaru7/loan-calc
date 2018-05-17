(function () {
	"use strict";

	$(function () {
		new Vue({
			el: '.pAreaMain',
			data: {
				m2: '',
				pyung: ''
			},
			computed: {
				pyungText: function () {
					var m2 = this.m2;
					if (isNaN(m2)) {
						alertify.error("정확한 숫자 형식이 아닙니다.");
						return '';
					}
					return Math.round((m2 * 0.3025) * 100) / 100;
				},
				m2Text: function () {
					var pyung = this.pyung;
					if (isNaN(pyung)) {
						alertify.error("정확한 숫자 형식이 아닙니다.");
						return '';
					}
					return Math.round((pyung / 0.3025) * 100) / 100;

				}
			},
			watch: {},
			mounted: function () {
			},
			methods: {}
		});
	});
})();
