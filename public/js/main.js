var MusicModel = Backbone.Model.extend({});
var MusicList = Backbone.Collection.extend({ model: MusicModel });

musicList = new MusicList({});
musicList.reset([
    {
	num: 1,
	title: 'Setting Forth',
	album: 'Into the Wild',
	artist: 'Eddie Vedder'
    },
    {
	num: 2,
	title: 'No Ceiling',
	album: 'Into the Wild',
	artist: 'Eddie Vedder'
    }
]);

var MusicView = Backbone.View.extend({
    tagName: 'div',
    className: 'music entry',
    initialize: function(){
	this.template = _.template('<%= num %> | <%= title %> | <%= album %> | <%= artist %>');
    },
    render: function(){
	this.$el.html(this.template(this.model.toJSON()));
	return this;
    }
});

var MusicFormView = Backbone.View.extend({
    el: 'div.wrapper',
    events: {
	'submit #musicform': 'submit'
    },
    submit: function(event){
	$.post(this.$el.attr('action'),
	       this.$el.serialize())
	    .done(function(data){
		console.log(data);
	    });
	return false;
    }
});

var MusicListView = Backbone.View.extend({
    el: '#toEdit',
    collection: musicList,
    addOne: function(thisModel) {
	var musicView = new MusicView({ model: thisModel });
	this.$el.append(musicView.render().el);
    },
    addAll: function() {
	this.collection.forEach(this.addOne, this);
    },
    render: function() {
	this.addAll();
    }
});

var musicApp = new (Backbone.Router.extend({
    routes: { '': 'index' },
    initialize: function(){
	this.musicListView = new MusicListView({});
	this.musicFormView = new MusicFormView({});
    },
    start: function(){
	Backbone.history.start({ pushState: true });
    },
    index: function(){
	this.musicListView.render();
    }
}));

$(function(){
    musicApp.initialize();
    musicApp.start();
});
