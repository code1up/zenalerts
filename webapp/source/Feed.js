(function() {

    enyo.kind({
        name: "zen.Feed",
        kind: "enyo.Control",

        baseUrl: "https://ajax.googleapis.com/ajax/services/feed/load",

        published: {
            url: "",
            entries: [],
            makeItem: this.defaultItemFactory
        },

        events: {
            onLoading: "",
            onLoaded: "",
            onFailed: ""
        },

        create: function() {
            enyo.log("Feed::create");

            this.inherited(arguments);

            // Custom initializers
            this.urlChanged();
        },
    
        urlChanged: function() {
            enyo.log("Feed::urlChanged - " +
                (this.url || "null or empty"));

            if (this.url) {
                this.refresh();
            } else {
                this.clearEntries();
            }
        },

        refresh: function() {
            enyo.log("Feed::refresh");

            var params = {
                url: this.baseUrl,
                callbackName: "callback"
            };

            var request = new enyo.JsonpRequest(params);

            request.response(enyo.bind(
                this, "handleResponse"));

            this.bubble("onLoading");

            request.go({
                q: this.getUrl(),
                v: "1.0",
                num: "-1"
            });
        },

        // TODO: how to make private functions in enyo?
        handleResponse: function(request, response) {
            enyo.log("Feed::handleResponse");

            // TODO: look at enyo.Async object for fail, error etc handling
            if (!response) {
                this.bubble("onFailed", {
                    status: -1,
                    narrative: "Unknown error"
                });

                return;
            }

            enyo.log("Feed::handleResponse status - " +
                response.responseDetails + " (" + response.responseStatus + ")");

            if (response.responseStatus !== 200) {
                // TODO: raise event
                this.bubble("onFailed", {
                    status: response.responseStatus,
                    narrative: response.responseDetails
                });

                return;                
            }

            var rawEntries = response.responseData.feed.entries;

            this.clearEntries();
            enyo.forEach(rawEntries, this.makeItem, this);

            this.bubble("onLoaded", {
                data: this.entries
            });
        },

        clearEntries: function() {
            this.entries = [];
        },

        makeEntry: function(entry) {
            var newEntry = {
                title: entry.title,
                author: entry.author || "Anon",
                publishedDate: new Date(entry.publishedDate),
                contentSnippet: entry.contentSnippet,
                content: entry.content,
                categories: entry.categories
            };

           this.entries.push(newEntry);
        }
    });

}());
