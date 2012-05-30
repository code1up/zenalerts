(function() {

    /*
    var _tooltip = {
        kind: "onyx.Tooltip",
        content: "Tooltip"
    };
    */

    // TODO: create a new control
    var _searchInput = {
        kind: "onyx.InputDecorator",
        
        components: [
            {
                kind: "onyx.Input",
                name: "searchInput", 
                
                placeholder: "Search",
                onkeydown: "onSearchInputKeyDown"
            },
    
            {
                kind: "Image",
                src: "assets/search-input-search.png",
                ontap: "onSearch"
            }
        ]
    };

    var _toolbar = {
        kind: "onyx.Toolbar",
        name: "toolbar",

        components: [
            {
                kind: "onyx.Grabber",
                ontap: "onTapGrabber"
            },
            {
                content: "Zen Internet Alerts"
            },
            {
                fit: true
            },
            _searchInput
        ]
    };

    var _alertSettings ={
        kind: "zen.AlertSettingsSlideable",
        name: "alertSettingsSlideable"
    };

    var _alertList = {
        kind: "zen.AlertList",
        
        fit: true,
        floating: true,

        feedUrl: "http://status.zensupport.co.uk/rss/active.rss2.xml"
    };

    var _onTapGrabber = function() {
        enyo.log("zen.App::onTapGrabber");

        // _tooltip.requestShow();
        this.$.alertSettingsSlideable.toggleMinMax();
    };

    enyo.kind({
        name: "zen.App",
        kind: "enyo.FittableRows",

        fit: true,

        components: [
            _toolbar,
            // _tooltip,
            _alertSettings,
            _alertList
        ],

        create: function() {
            enyo.log("zen.App::create");

            this.inherited(arguments);
        },

        onTapGrabber: _onTapGrabber
    });
})();
