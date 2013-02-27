var MusicTrackModel = Backbone.Model.extend({
    defaults: {
	num: 1,
	title: 'Setting Forth',
	album: 'Into the Wild',
	artist: 'Eddie Vedder'
    }
});

var musicTrackModel = new MusicTrackModel({});

var MusicTrackView = Backbone.View.extend({
    model: musicTrackModel,
    el: "#toEdit",
    initialize: function(){
	this.template = _.template('<%= num %> | <%= title %> | <%= album %> | <%= artist %>');
    },
    render: function(){
	this.$el.html(this.template(this.model.toJSON()));
    }
});

$(function(){
    var musicTrackView = new MusicTrackView({});
    musicTrackView.render();
});
