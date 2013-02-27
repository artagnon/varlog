var MusicModel = Backbone.Model.extend({});
var MusicList = Backbone.Collection.extend({ model: MusicModel });

musicList = new MusicList();
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
    tagName: "div",
    className: "music out entry",
    initialize: function(){
	this.template = _.template('<%= num %> | <%= title %> | <%= album %> | <%= artist %>');
    },
    render: function(){
	this.$el.html(this.template(this.model.toJSON()));
	return this;
    }
});

var MusicListView = Backbone.View.extend({
    el: "#toEdit",
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

$(function(){
    var musicListView = new MusicListView({});
    musicListView.render();
});
