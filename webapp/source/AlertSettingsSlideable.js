(function() {

    var _zenAlertsGroupbox = {
        kind: "onyx.Groupbox",
        classes: "zen-alert-settings-groupbox",

        // TODO: defaults = less code
        components: [
            {
                kind: "onyx.GroupboxHeader",
                content: "ZEN ALERTS"
            },

            {
                kind: "enyo.Group",
                defaultKind: "zen.LabeledControl",
                
                classes: "onyx-groupbox zen-alert-settings-groupbox",
                highlander: true,

                components: [
                    {
                        name: "",
                        value: true,
                        
                        defaultKind: "onyx.Checkbox",

                        label: "Connectivity",
                        icon: "assets/glyphish/network.png",
                    },
                    {
                        name: "",
                        
                        defaultKind: "onyx.Checkbox",

                        label: "Hosting",
                        icon: "assets/glyphish/pc.png",
                    },
                    {
                        name: "",
                        
                        defaultKind: "onyx.Checkbox",

                        label: "Network",
                        icon: "assets/glyphish/user-group.png",
                    },
                    {
                        name: "",
                        
                        defaultKind: "onyx.Checkbox",

                        label: "Other",
                        icon: "assets/glyphish/gear.png",
                    }
                ]
            }
        ]        
    };

    var _supplierAlertsGroupbox = {
        kind: "onyx.Groupbox",
        classes: "zen-alert-settings-groupbox",

        components: [
            {
                kind: "onyx.GroupboxHeader",
                content: "SUPPLIER ALERTS"
            },
            {
                kind: "enyo.Group",
                defaultKind: "zen.LabeledControl",

                classes: "onyx-groupbox zen-alert-settings-groupbox",
                highlander: true,

                components: [
                    {
                        name: "",

                        defaultKind: "onyx.Checkbox",

                        label: "Broadband Fault",
                        icon: "assets/glyphish/warning.png",
                    },
                    {
                        kind: "zen.LabeledControl",
                        name: "",
                        
                        defaultKind: "onyx.Checkbox",

                        label: "Broadband Maintenance",
                        icon: "assets/glyphish/gear2.png",
                    }
                ]
            }
        ]        
    };

    enyo.kind({
        kind: "enyo.Slideable",
        name: "zen.AlertSettingsSlideable",

        classes: "zen-alert-settings",

        value: -120,
        min: -120,
        unit: "%",

        components: [
            {
                kind: "enyo.FittableRows",
                fit: true,

                components: [
                    {
                        kind: "enyo.Scroller",
                        layoutKind: "onyx.FittableRowsLayout",
        
                        components: [
                            _zenAlertsGroupbox,
                            _supplierAlertsGroupbox
                        ]
                    }
                ]
            }
        ]
    });

}());
