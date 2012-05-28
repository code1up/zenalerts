(function() {

    enyo.kind({
        name: "zen.LabeledControl",
    
        published: {
            value: "",
            label: "",
            icon: "assets/glyphish/gear2.png"
        },

        components: [
            {
                kind: "enyo.Control",
                tag: "div",

                classes: "zen-labeled-control-icon",
                
                components: [
                    {
                        kind: "Image",
                        name: "icon",
                    }
                ]
            },
            {
                kind: "Control",
                name: "label"
            },
            {
                name: "input",
                classes: "zen-labeled-control-input"
            }
        ],

        create: function() {
            this.inherited(arguments);

            this.labelChanged();
            this.iconChanged();
            this.valueChanged();
        },

        labelChanged: function() {
            this.$.label.setContent(this.label);
        },

        iconChanged: function() {
            this.$.icon.setSrc(this.icon);
        },

        getValue: function() {
            return this.$.input.getValue();
        },
        
        valueChanged: function() {
            this.$.input.setValue(this.value);
        }
    });

}());
