
export const removeObjRef = (obj: any) => {
    return cloneObject(obj);
    // JSON.parse(JSON.stringify(obj || {}));
}

function cloneObject(source: any, deep: any = true) {
    var o, prop, type;

    if (typeof source != 'object' || source === null) {
        // What do to with functions, throw an error?
        o = source;
        return o;
    }

    o = new source.constructor();

    for (prop in source) {

        if (source.hasOwnProperty(prop)) {
            type = typeof source[prop];

            if (deep && type == 'object' && source[prop] !== null) {
                o[prop] = cloneObject(source[prop]);

            } else {
                o[prop] = source[prop];
            }
        }
    }
    return o;
}

export function isSameObjects(value: any, other: any) {
    // Get the value type
    var type = Object.prototype.toString.call(value);
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;
    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;
    // Compare two items
    var compare = function (item1: any, item2: any) {
        // Get the object type
        var itemType = Object.prototype.toString.call(item1);
        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isSameObjects(item1, item2)) return false;
        }
        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;
            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }
        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }
    // If nothing failed, return true
    return true;

};

export function compareObjects(obj1: any, obj2: any) {
    const deepCompare: any = (value1: any, value2: any) => {
        if (typeof value1 === 'object' && typeof value2 === 'object') {
            return compareObjects(value1, value2);
        }
        return value1 === value2;
    };
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const addedKeys = keys2.filter(key => !keys1.includes(key));
    const removedKeys = keys1.filter(key => !keys2.includes(key));
    const modifiedValues = keys1.filter(key => !deepCompare(obj1[key], obj2[key])).reduce((result: any, key) => {
        result[key] = {
            old: obj1[key],
            new: obj2[key],
        };
        return result;
    }, {});
    const sharedKeys = keys1.filter(key => keys2.includes(key));
    const nestedDifferences = sharedKeys.reduce((result: any, key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (typeof value1 === 'object' && typeof value2 === 'object') {
            const nestedDiff = compareObjects(value1, value2);
            if (Object.keys(nestedDiff).length > 0) {
                result[key] = nestedDiff;
            }
        } else if (Array.isArray(value1) && Array.isArray(value2)) {
            if (!isSameObjects(value1, value2)) {
                result[key] = {
                    old: value1,
                    new: value2,
                };
            }
        }
        return result;
    }, {});
    return {
        added: addedKeys,
        removed: removedKeys,
        modified: modifiedValues,
        nested: nestedDifferences,
    };
}