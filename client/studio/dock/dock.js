client.studio = client.studio || {};
client.studio.dock = {

	el: null,
	tab: null,
	items: [],

	init: function() {
		this.el = $("#dock");
		this.tab = this.el.find(".tab");
	},

	add: function() {
		var dock = this;
		this.items.push({

		});
	},

	remove: function(index) {
		var item = this.items[index];

		item.remove();
	}

	collapse: function() {

	},

	expand: function() {

	}
};

