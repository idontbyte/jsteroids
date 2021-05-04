var J = extend(true, {}, J);

J.Utilities = {
    ToggleClass: function (element, className) {
        if (!element || !className) {
            return;
        }

        var classString = element.className, nameIndex = classString.indexOf(className);
        if (nameIndex == -1) {
            classString += ' ' + className;
        }
        else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
        }
        element.className = classString;
    },
    DateToTicks: function (date) {
        return (date.getTime() * 10000) + 621355968000000000;
    },
    RandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}