(function() {

    var searchInput =
        { kind: "onyx.InputDecorator",
            components: [
                { kind: "onyx.Input", name: "searchInput", 
                    placeholder: "Search", onkeydown: "searchOnEnter" },
                { kind: "Image", src: "assets/search-input-search.png", ontap: "search" }
            ]
        };

    var toolbar =
        { kind: "onyx.Toolbar", name: "toolbar",
            components: [
                { kind: "onyx.Grabber", ontap: "onTapGrabber" },
                { content: "Zen Internet Alerts" },
                { kind: "onyx.Button", content: "Hello" },
                { content: "Middle", fit: true },
                searchInput
            ]
        };

    var zenAlertNavigator =
        { kind: "Scroller",
            components: [
                { kind: "onyx.Groupbox",
                    components: [
                        { kind: "onyx.GroupboxHeader", style: "min-height: 30px; line-height: 30px;", "class": "onyx-groupbox", content: "ZEN ALERTS" },
                        { kind: "onyx.Checkbox", label: "Broadband Alerts" }
                    ]
                }
            ]
        };

    var supplierAlertNavigator =
        { kind: "Scroller",
            components: [
                { kind: "onyx.Groupbox",
                    components: [
                        { kind: "onyx.GroupboxHeader", style: "min-height: 30px; line-height: 30px;", content: "SUPPLIER ALERTS" },
                        { kind: "onyx.Checkbox", label: "Broadband Alerts" }
                    ]
                }
            ]
        };
    
    var slideable =
        { kind: "enyo.Slideable", floating: true, name: "leftPanel", value: -100, min: -100, unit: "%",
            style: "position: absolute; width: 360px; height: 500px; background-color: #D8D8D8; padding: 10px;",
            
            components: [
                zenAlertNavigator,
                { style: "height: 16px;" },
                supplierAlertNavigator
            ]
        };

    var onTapGrabber = function() {
        enyo.log("onTapGrabber");
        this.$.leftPanel.toggleMinMax();
    };

    enyo.kind({
        name: "zen.App",
        kind: "enyo.Control", // TODO: should the app be a control?

        fit: true,

        components: [
            toolbar,
            slideable,
            { content: "Hello, World." }
        ],

        create: function() {
            enyo.log("create");
            this.inherited(arguments);

            //  this.$.leftPanel.setParent(enyo.floatingLayer);
        },

        onTapGrabber: onTapGrabber
    });
})();
