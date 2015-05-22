var buttons = require('sdk/ui/button/action');


function makeButton(label, func) {
    var button = buttons.ActionButton({
        id: "mozilla-link",
        label: label,
        icon: {
            "16": "./icon-16.jpg",
            "32": "./icon-32.jpg",
            "64": "./icon-64.jpg"
        },
        onClick: func
    });


    return button;
}

exports.createButton = makeButton;