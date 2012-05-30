(function() {

    var _makeEntry = function(rawEntry) {
        var newEntry = {
            title: rawEntry.title,
            author: rawEntry.author || "Anon",
            publishedDate: new Date(rawEntry.publishedDate),
            contentSnippet: rawEntry.contentSnippet,
            content: rawEntry.content,
            categories: rawEntry.categories
        };

        return newEntry;
    };

    enyo.kind({
        name: "zen.Feed",
        kind: "enyo.Control",

        baseUrl: "https://ajax.googleapis.com/ajax/services/feed/load",

        published: {
            url: "",
            entries: [],
            makeEntry: _makeEntry
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
            enyo.forEach(rawEntries, this.addEntry, this);

            this.bubble("onLoaded", {
                data: this.entries
            });
        },

        clearEntries: function() {
            this.entries = [];
        },

        addEntry: function(rawEntry) {
            var newEntry = this.makeEntry(rawEntry);

            this.entries.push(newEntry);
        }
    });

}());
