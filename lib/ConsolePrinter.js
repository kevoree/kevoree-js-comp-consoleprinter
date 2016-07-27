var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
    toString: 'ConsolePrinter',
    tdef_version: 1,

    construct: function () {
        this.maxLines = 25;
        this.messages = [];
        this.onInput = function () { /* noop */ };
    },

    in_input: function (msg) {
        var line = this.getName() + '>' + msg;
        if (this.messages.length === this.maxLines) {
            this.messages.shift();
        }
        this.messages.push(msg);
        console.log(line);
        this.onInput();
    },

    uiController: function () {
        return ['$scope', '$timeout', 'instance', function ($scope, $timeout, instance) {
            $scope.maxLines = instance.maxLines;
            $scope.messages = instance.messages;

            $scope.clear = function () {
                instance.messages.length = 0;
            };

            $scope.onMaxLinesChange = function () {
                if ($scope.maxLines < instance.messages.length) {
                    instance.messages.splice(0, instance.messages.length - $scope.maxLines);
                }
                instance.maxLines = $scope.maxLines;
            };

            instance.onInput = function () {
                $timeout(function () {
                    $scope.messages = instance.messages;
                });
            };
        }];
    }
});

module.exports = ConsolePrinter;
