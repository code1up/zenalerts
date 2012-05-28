(function() {

    // zen.AlertList : enyo.List
    enyo.kind({
        name: "zen.AlertList",
        kind: enyo.List,

        classes: "zen-alert-list",
        style: "background-color: white",

        /*
            title: entry.title,
            author: entry.author || "Anon",
            publishedDate: entry.publishedDate,
            contentSnippet: entry.contentSnippet,
            content: entry.content,
        */

        components: [
            {
                name: "title",
                classes: "zen-alert-list-entry-title"
            },
            {
                name: "whoWhen",
                classes: "zen-alert-list-entry-who-when",
            },
            {
                name: "contentSnippet",
                classes: "zen-alert-list-entry-content-snippet"
            },
            {
                style: "width: 95%; color: lightgray; background-color: lightgray;",
                tag: "hr"
            },
            {
                name: "feed",
                kind: "zen.Feed",
                onLoaded: "feedLoaded"
            }
        ],

        data: null,        

        published: {
            feedUrl: ""
        },

        handlers: {
            onSetupRow: "setupRow"
        },
    
        create: function() {
            enyo.log("AlertList::create");

            // inherited
            this.inherited(arguments);

            // this
            this.feedUrlChanged();
        },

        feedUrlChanged: function() {
            enyo.log("AlertList::feedUrlChanged");

            // NOTE: this causes the feed to automatically refresh
            this.$.feed.setUrl(this.feedUrl);
        },

        refresh: function() {
            enyo.log("AlertList::refresh");

            this.inherited(arguments);
        },

        setupRow: function(inSender, inEvent) {
            enyo.log("AlertList::setupRow");

            var entry = this.data[inEvent.index];

            this.$.title.setContent(entry.title);
            this.$.contentSnippet.setContent(entry.contentSnippet);
            this.$.whoWhen.setContent(
                entry.author + ", " +
                entry.publishedDate.toDateString("W"));

            return true;
        },

        feedLoaded: function(inSender, inEvent) {
            enyo.log("AlertList::feedLoaded");

            this.setRows(inEvent.data.length);
            this.data = inEvent.data;

            this.refresh();
        }
    });

}());
