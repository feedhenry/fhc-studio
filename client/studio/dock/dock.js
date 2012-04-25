client.studio = client.studio || {};
client.studio.dock = {

	el: null,
	tab: null,
	items: [],

	socket: null,

	init: function() {
		
		//create the socket connection to the server
		this.socket = io.connect('http://localhost:3000');

		this.socket.on("update", function(data) {
			console.log(data);
		});

		this.el = $("#dock");
		this.tab = this.el.find(".tab");
	},

	add: function(name, cacheKey) {
		var dock = this;
		this.items.push({

		});

		this.socket.emit("poll", {
			cacheKey: cacheKey
		});
	},

	remove: function(index) {
		var item = this.items[index];

		item.remove();
	},

	collapse: function() {

	},

	expand: function() {

	}
};

