"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/pdfast";
exports.ids = ["vendor-chunks/pdfast"];
exports.modules = {

/***/ "(ssr)/./node_modules/pdfast/src/helper.js":
/*!*******************************************!*\
  !*** ./node_modules/pdfast/src/helper.js ***!
  \*******************************************/
/***/ ((module) => {

eval("\nvar self = module.exports;\nmodule.exports.isNumber = function(x) {\n    return typeof x === \"number\";\n};\nmodule.exports.findMin = function(arr) {\n    if (arr.length === 0) {\n        return Infinity;\n    }\n    var curr = arr[0];\n    for(var i = 1; i < arr.length; i++){\n        curr = Math.min(curr, arr[i]);\n    }\n    return curr;\n};\nmodule.exports.findMax = function(arr) {\n    if (arr.length === 0) {\n        return -Infinity;\n    }\n    var curr = arr[0];\n    for(var i = 1; i < arr.length; i++){\n        curr = Math.max(curr, arr[i]);\n    }\n    return curr;\n};\nmodule.exports.findMinMulti = function(arr) {\n    var curr = self.findMin(arr[0]);\n    for(var i = 1; i < arr.length; i++){\n        curr = Math.min(curr, self.findMin(arr[i]));\n    }\n    return curr;\n};\nmodule.exports.findMaxMulti = function(arr) {\n    var curr = self.findMax(arr[0]);\n    for(var i = 1; i < arr.length; i++){\n        curr = Math.max(curr, self.findMax(arr[i]));\n    }\n    return curr;\n};\nmodule.exports.inside = function(min, max, x) {\n    return min <= x && x <= max;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcGRmYXN0L3NyYy9oZWxwZXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFFQSxJQUFJQSxPQUFPQyxPQUFPQyxPQUFPO0FBRXpCRCx1QkFBdUIsR0FBRyxTQUFVRyxDQUFDO0lBQ25DLE9BQVEsT0FBT0EsTUFBTTtBQUN2QjtBQUVBSCxzQkFBc0IsR0FBRyxTQUFVSyxHQUFHO0lBQ3BDLElBQUlBLElBQUlDLE1BQU0sS0FBSyxHQUFHO1FBQ3BCLE9BQU9DO0lBQ1Q7SUFFQSxJQUFJQyxPQUFPSCxHQUFHLENBQUMsRUFBRTtJQUNqQixJQUFLLElBQUlJLElBQUksR0FBR0EsSUFBSUosSUFBSUMsTUFBTSxFQUFFRyxJQUFLO1FBQ25DRCxPQUFPRSxLQUFLQyxHQUFHLENBQUNILE1BQU1ILEdBQUcsQ0FBQ0ksRUFBRTtJQUM5QjtJQUNBLE9BQU9EO0FBQ1Q7QUFFQVIsc0JBQXNCLEdBQUcsU0FBVUssR0FBRztJQUNwQyxJQUFJQSxJQUFJQyxNQUFNLEtBQUssR0FBRztRQUNwQixPQUFPLENBQUNDO0lBQ1Y7SUFFQSxJQUFJQyxPQUFPSCxHQUFHLENBQUMsRUFBRTtJQUNqQixJQUFLLElBQUlJLElBQUksR0FBR0EsSUFBSUosSUFBSUMsTUFBTSxFQUFFRyxJQUFLO1FBQ25DRCxPQUFPRSxLQUFLRyxHQUFHLENBQUNMLE1BQU1ILEdBQUcsQ0FBQ0ksRUFBRTtJQUM5QjtJQUNBLE9BQU9EO0FBQ1Q7QUFFQVIsMkJBQTJCLEdBQUcsU0FBVUssR0FBRztJQUN6QyxJQUFJRyxPQUFPVCxLQUFLSyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxFQUFFO0lBQzlCLElBQUssSUFBSUksSUFBSSxHQUFHQSxJQUFJSixJQUFJQyxNQUFNLEVBQUVHLElBQUs7UUFDbkNELE9BQU9FLEtBQUtDLEdBQUcsQ0FBQ0gsTUFBTVQsS0FBS0ssT0FBTyxDQUFDQyxHQUFHLENBQUNJLEVBQUU7SUFDM0M7SUFDQSxPQUFPRDtBQUNUO0FBRUFSLDJCQUEyQixHQUFHLFNBQVVLLEdBQUc7SUFDekMsSUFBSUcsT0FBT1QsS0FBS2EsT0FBTyxDQUFDUCxHQUFHLENBQUMsRUFBRTtJQUM5QixJQUFLLElBQUlJLElBQUksR0FBR0EsSUFBSUosSUFBSUMsTUFBTSxFQUFFRyxJQUFLO1FBQ25DRCxPQUFPRSxLQUFLRyxHQUFHLENBQUNMLE1BQU1ULEtBQUthLE9BQU8sQ0FBQ1AsR0FBRyxDQUFDSSxFQUFFO0lBQzNDO0lBQ0EsT0FBT0Q7QUFDVDtBQUVBUixxQkFBcUIsR0FBRyxTQUFVVyxHQUFHLEVBQUVFLEdBQUcsRUFBRVYsQ0FBQztJQUMzQyxPQUFPLE9BQVFBLEtBQU9BLEtBQUtVO0FBQzdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGljZW5zaW5nLy4vbm9kZV9tb2R1bGVzL3BkZmFzdC9zcmMvaGVscGVyLmpzPzJmMjAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VsZiA9IG1vZHVsZS5leHBvcnRzO1xuXG5tb2R1bGUuZXhwb3J0cy5pc051bWJlciA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiAodHlwZW9mIHggPT09ICdudW1iZXInKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZpbmRNaW4gPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG5cbiAgdmFyIGN1cnIgPSBhcnJbMF07XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgY3VyciA9IE1hdGgubWluKGN1cnIsIGFycltpXSk7XG4gIH1cbiAgcmV0dXJuIGN1cnI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5maW5kTWF4ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAtSW5maW5pdHk7XG4gIH1cblxuICB2YXIgY3VyciA9IGFyclswXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBjdXJyID0gTWF0aC5tYXgoY3VyciwgYXJyW2ldKTtcbiAgfVxuICByZXR1cm4gY3Vycjtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZpbmRNaW5NdWx0aSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgdmFyIGN1cnIgPSBzZWxmLmZpbmRNaW4oYXJyWzBdKTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBjdXJyID0gTWF0aC5taW4oY3Vyciwgc2VsZi5maW5kTWluKGFycltpXSkpO1xuICB9XG4gIHJldHVybiBjdXJyO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZmluZE1heE11bHRpID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgY3VyciA9IHNlbGYuZmluZE1heChhcnJbMF0pO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGN1cnIgPSBNYXRoLm1heChjdXJyLCBzZWxmLmZpbmRNYXgoYXJyW2ldKSk7XG4gIH1cbiAgcmV0dXJuIGN1cnI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5pbnNpZGUgPSBmdW5jdGlvbiAobWluLCBtYXgsIHgpIHtcbiAgcmV0dXJuIChtaW4gPD0geCkgJiYgKHggPD0gbWF4KTtcbn07XG4iXSwibmFtZXMiOlsic2VsZiIsIm1vZHVsZSIsImV4cG9ydHMiLCJpc051bWJlciIsIngiLCJmaW5kTWluIiwiYXJyIiwibGVuZ3RoIiwiSW5maW5pdHkiLCJjdXJyIiwiaSIsIk1hdGgiLCJtaW4iLCJmaW5kTWF4IiwibWF4IiwiZmluZE1pbk11bHRpIiwiZmluZE1heE11bHRpIiwiaW5zaWRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/pdfast/src/helper.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/pdfast/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/pdfast/src/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DEFAULT_SIZE = 50;\nvar DEFAULT_WIDTH = 2;\nvar LN_2 = Math.log(2);\nvar self = module.exports;\nvar helper = __webpack_require__(/*! ./helper */ \"(ssr)/./node_modules/pdfast/src/helper.js\");\n// Triangle\nfunction kernel(x) {\n    return 1 - Math.abs(x);\n}\n/**\n * Get min and max value for the pdf, covering all arr data range while respecting options' data\n * @param arr\n * @param options\n * @returns {*}\n */ module.exports.getUnifiedMinMax = function(arr, options) {\n    return self.getUnifiedMinMaxMulti([\n        arr\n    ], options);\n};\nmodule.exports.getUnifiedMinMaxMulti = function(arrMulti, options) {\n    options = options || {};\n    var relaxMin = false;\n    var relaxMax = false;\n    var width = helper.isNumber(options.width) ? options.width : DEFAULT_WIDTH;\n    var size = helper.isNumber(options.size) ? options.size : DEFAULT_SIZE;\n    var min = helper.isNumber(options.min) ? options.min : (relaxMin = true, helper.findMinMulti(arrMulti));\n    var max = helper.isNumber(options.max) ? options.max : (relaxMax = true, helper.findMaxMulti(arrMulti));\n    var range = max - min;\n    var step = range / (size - 1);\n    // Relax?\n    if (relaxMin) {\n        min = min - 2 * width * step;\n    }\n    if (relaxMax) {\n        max = max + 2 * width * step;\n    }\n    return {\n        min: min,\n        max: max\n    };\n};\nmodule.exports.create = function(arr, options) {\n    options = options || {};\n    if (!arr || arr.length === 0) {\n        return [];\n    }\n    var size = helper.isNumber(options.size) ? options.size : DEFAULT_SIZE;\n    var width = helper.isNumber(options.width) ? options.width : DEFAULT_WIDTH;\n    var normalizedMinMax = self.getUnifiedMinMax(arr, {\n        size: size,\n        width: width,\n        min: options.min,\n        max: options.max\n    });\n    var min = normalizedMinMax.min;\n    var max = normalizedMinMax.max;\n    var range = max - min;\n    var step = range / (size - 1);\n    if (range === 0) {\n        // Special case...\n        return [\n            {\n                x: min,\n                y: 1\n            }\n        ];\n    }\n    // Good to go\n    var buckets = [];\n    for(var i = 0; i < size; i++){\n        buckets.push({\n            x: min + i * step,\n            y: 0\n        });\n    }\n    var xToBucket = function(x) {\n        return Math.floor((x - min) / step);\n    };\n    var partialArea = generatePartialAreas(kernel, width);\n    var fullArea = partialArea[width];\n    var c = partialArea[width - 1] - partialArea[width - 2];\n    var initalValue = 0;\n    arr.forEach(function(x) {\n        var bucket = xToBucket(x);\n        // Totally outside?\n        if (bucket + width < 0 || bucket - width >= buckets.length) {\n            return;\n        }\n        var start = Math.max(bucket - width, 0);\n        var mid = bucket;\n        var end = Math.min(bucket + width, buckets.length - 1);\n        var leftBlockCount = start - (bucket - width);\n        var rightBlockCount = bucket + width - end;\n        var spilledAreaLeft = partialArea[-width - 1 + leftBlockCount] || 0;\n        var spilledAreaRight = partialArea[-width - 1 + rightBlockCount] || 0;\n        var weight = fullArea / (fullArea - spilledAreaLeft - spilledAreaRight);\n        if (leftBlockCount > 0) {\n            initalValue += weight * (leftBlockCount - 1) * c;\n        }\n        // Add grads\n        var startGradPos = Math.max(0, bucket - width + 1);\n        if (helper.inside(0, buckets.length - 1, startGradPos)) {\n            buckets[startGradPos].y += weight * 1 * c;\n        }\n        if (helper.inside(0, buckets.length - 1, mid + 1)) {\n            buckets[mid + 1].y -= weight * 2 * c;\n        }\n        if (helper.inside(0, buckets.length - 1, end + 1)) {\n            buckets[end + 1].y += weight * 1 * c;\n        }\n    });\n    var accumulator = initalValue;\n    var gradAccumulator = 0;\n    var area = 0;\n    buckets.forEach(function(bucket) {\n        gradAccumulator += bucket.y;\n        accumulator += gradAccumulator;\n        bucket.y = accumulator;\n        area += accumulator;\n    });\n    // Normalize\n    if (area > 0) {\n        buckets.forEach(function(bucket) {\n            bucket.y /= area;\n        });\n    }\n    return buckets;\n};\nfunction generatePartialAreas(kernel, width) {\n    var partialAreas = {};\n    var accumulator = 0;\n    for(var i = -width; i <= width; i++){\n        accumulator += kernel(i / width);\n        partialAreas[i] = accumulator;\n    }\n    return partialAreas;\n}\nmodule.exports.getExpectedValueFromPdf = function(pdf) {\n    if (!pdf || pdf.length === 0) {\n        return undefined;\n    }\n    var expected = 0;\n    pdf.forEach(function(obj) {\n        expected += obj.x * obj.y;\n    });\n    return expected;\n};\nmodule.exports.getXWithLeftTailArea = function(pdf, area) {\n    if (!pdf || pdf.length === 0) {\n        return undefined;\n    }\n    var accumulator = 0;\n    var last = 0;\n    for(var i = 0; i < pdf.length; i++){\n        last = i;\n        accumulator += pdf[i].y;\n        if (accumulator >= area) {\n            break;\n        }\n    }\n    return pdf[last].x;\n};\nmodule.exports.getPerplexity = function(pdf) {\n    if (!pdf || pdf.length === 0) {\n        return undefined;\n    }\n    var entropy = 0;\n    pdf.forEach(function(obj) {\n        var ln = Math.log(obj.y);\n        if (isFinite(ln)) {\n            entropy += obj.y * ln;\n        }\n    });\n    entropy = -entropy / LN_2;\n    return Math.pow(2, entropy);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcGRmYXN0L3NyYy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLGVBQWU7QUFDbkIsSUFBSUMsZ0JBQWdCO0FBRXBCLElBQUlDLE9BQU9DLEtBQUtDLEdBQUcsQ0FBQztBQUNwQixJQUFJQyxPQUFPQyxPQUFPQyxPQUFPO0FBRXpCLElBQUlDLFNBQVNDLG1CQUFPQSxDQUFDO0FBRXJCLFdBQVc7QUFDWCxTQUFTQyxPQUFPQyxDQUFDO0lBQ2YsT0FBTyxJQUFJUixLQUFLUyxHQUFHLENBQUNEO0FBQ3RCO0FBRUE7Ozs7O0NBS0MsR0FDREwsK0JBQStCLEdBQUcsU0FBVVEsR0FBRyxFQUFFQyxPQUFPO0lBQ3RELE9BQU9WLEtBQUtXLHFCQUFxQixDQUFDO1FBQUNGO0tBQUksRUFBRUM7QUFDM0M7QUFFQVQsb0NBQW9DLEdBQUcsU0FBVVcsUUFBUSxFQUFFRixPQUFPO0lBQ2hFQSxVQUFVQSxXQUFXLENBQUM7SUFFdEIsSUFBSUcsV0FBVztJQUNmLElBQUlDLFdBQVc7SUFFZixJQUFJQyxRQUFRWixPQUFPYSxRQUFRLENBQUNOLFFBQVFLLEtBQUssSUFBSUwsUUFBUUssS0FBSyxHQUFHbkI7SUFDN0QsSUFBSXFCLE9BQU9kLE9BQU9hLFFBQVEsQ0FBQ04sUUFBUU8sSUFBSSxJQUFJUCxRQUFRTyxJQUFJLEdBQUd0QjtJQUMxRCxJQUFJdUIsTUFBTWYsT0FBT2EsUUFBUSxDQUFDTixRQUFRUSxHQUFHLElBQUlSLFFBQVFRLEdBQUcsR0FBSUwsQ0FBQUEsV0FBVyxNQUFNVixPQUFPZ0IsWUFBWSxDQUFDUCxTQUFRO0lBQ3JHLElBQUlRLE1BQU1qQixPQUFPYSxRQUFRLENBQUNOLFFBQVFVLEdBQUcsSUFBSVYsUUFBUVUsR0FBRyxHQUFJTixDQUFBQSxXQUFXLE1BQU1YLE9BQU9rQixZQUFZLENBQUNULFNBQVE7SUFFckcsSUFBSVUsUUFBUUYsTUFBTUY7SUFDbEIsSUFBSUssT0FBT0QsUUFBU0wsQ0FBQUEsT0FB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aWNlbnNpbmcvLi9ub2RlX21vZHVsZXMvcGRmYXN0L3NyYy9pbmRleC5qcz81M2MzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIERFRkFVTFRfU0laRSA9IDUwO1xudmFyIERFRkFVTFRfV0lEVEggPSAyO1xuXG52YXIgTE5fMiA9IE1hdGgubG9nKDIpO1xudmFyIHNlbGYgPSBtb2R1bGUuZXhwb3J0cztcblxudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XG5cbi8vIFRyaWFuZ2xlXG5mdW5jdGlvbiBrZXJuZWwoeCkge1xuICByZXR1cm4gMSAtIE1hdGguYWJzKHgpO1xufVxuXG4vKipcbiAqIEdldCBtaW4gYW5kIG1heCB2YWx1ZSBmb3IgdGhlIHBkZiwgY292ZXJpbmcgYWxsIGFyciBkYXRhIHJhbmdlIHdoaWxlIHJlc3BlY3Rpbmcgb3B0aW9ucycgZGF0YVxuICogQHBhcmFtIGFyclxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5tb2R1bGUuZXhwb3J0cy5nZXRVbmlmaWVkTWluTWF4ID0gZnVuY3Rpb24gKGFyciwgb3B0aW9ucykge1xuICByZXR1cm4gc2VsZi5nZXRVbmlmaWVkTWluTWF4TXVsdGkoW2Fycl0sIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0VW5pZmllZE1pbk1heE11bHRpID0gZnVuY3Rpb24gKGFyck11bHRpLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciByZWxheE1pbiA9IGZhbHNlO1xuICB2YXIgcmVsYXhNYXggPSBmYWxzZTtcblxuICB2YXIgd2lkdGggPSBoZWxwZXIuaXNOdW1iZXIob3B0aW9ucy53aWR0aCkgPyBvcHRpb25zLndpZHRoIDogREVGQVVMVF9XSURUSDtcbiAgdmFyIHNpemUgPSBoZWxwZXIuaXNOdW1iZXIob3B0aW9ucy5zaXplKSA/IG9wdGlvbnMuc2l6ZSA6IERFRkFVTFRfU0laRTtcbiAgdmFyIG1pbiA9IGhlbHBlci5pc051bWJlcihvcHRpb25zLm1pbikgPyBvcHRpb25zLm1pbiA6IChyZWxheE1pbiA9IHRydWUsIGhlbHBlci5maW5kTWluTXVsdGkoYXJyTXVsdGkpKTtcbiAgdmFyIG1heCA9IGhlbHBlci5pc051bWJlcihvcHRpb25zLm1heCkgPyBvcHRpb25zLm1heCA6IChyZWxheE1heCA9IHRydWUsIGhlbHBlci5maW5kTWF4TXVsdGkoYXJyTXVsdGkpKTtcblxuICB2YXIgcmFuZ2UgPSBtYXggLSBtaW47XG4gIHZhciBzdGVwID0gcmFuZ2UgLyAoc2l6ZSAtIDEpO1xuXG4gIC8vIFJlbGF4P1xuICBpZiAocmVsYXhNaW4pIHtcbiAgICBtaW4gPSBtaW4gLSAyICogd2lkdGggKiBzdGVwO1xuICB9XG4gIGlmIChyZWxheE1heCkge1xuICAgIG1heCA9IG1heCArIDIgKiB3aWR0aCAqIHN0ZXA7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1pbjogbWluLFxuICAgIG1heDogbWF4XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbiAoYXJyLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmICghYXJyIHx8IChhcnIubGVuZ3RoID09PSAwKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBzaXplID0gaGVscGVyLmlzTnVtYmVyKG9wdGlvbnMuc2l6ZSkgPyBvcHRpb25zLnNpemUgOiBERUZBVUxUX1NJWkU7XG4gIHZhciB3aWR0aCA9IGhlbHBlci5pc051bWJlcihvcHRpb25zLndpZHRoKSA/IG9wdGlvbnMud2lkdGggOiBERUZBVUxUX1dJRFRIO1xuICB2YXIgbm9ybWFsaXplZE1pbk1heCA9IHNlbGYuZ2V0VW5pZmllZE1pbk1heChhcnIsIHtcbiAgICBzaXplOiBzaXplLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBtaW46IG9wdGlvbnMubWluLFxuICAgIG1heDogb3B0aW9ucy5tYXhcbiAgfSk7XG5cbiAgdmFyIG1pbiA9IG5vcm1hbGl6ZWRNaW5NYXgubWluO1xuICB2YXIgbWF4ID0gbm9ybWFsaXplZE1pbk1heC5tYXg7XG5cbiAgdmFyIHJhbmdlID0gbWF4IC0gbWluO1xuICB2YXIgc3RlcCA9IHJhbmdlIC8gKHNpemUgLSAxKTtcbiAgaWYgKHJhbmdlID09PSAwKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlLi4uXG4gICAgcmV0dXJuIFt7eDogbWluLCB5OiAxfV07XG4gIH1cblxuICAvLyBHb29kIHRvIGdvXG5cbiAgdmFyIGJ1Y2tldHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBidWNrZXRzLnB1c2goe1xuICAgICAgeDogbWluICsgaSAqIHN0ZXAsXG4gICAgICB5OiAwXG4gICAgfSk7XG4gIH1cblxuICB2YXIgeFRvQnVja2V0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoeCAtIG1pbikgLyBzdGVwKTtcbiAgfTtcblxuICB2YXIgcGFydGlhbEFyZWEgPSBnZW5lcmF0ZVBhcnRpYWxBcmVhcyhrZXJuZWwsIHdpZHRoKTtcbiAgdmFyIGZ1bGxBcmVhID0gcGFydGlhbEFyZWFbd2lkdGhdO1xuICB2YXIgYyA9IHBhcnRpYWxBcmVhW3dpZHRoLTFdIC0gcGFydGlhbEFyZWFbd2lkdGgtMl07XG5cbiAgdmFyIGluaXRhbFZhbHVlID0gMDtcbiAgYXJyLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcbiAgICB2YXIgYnVja2V0ID0geFRvQnVja2V0KHgpO1xuXG4gICAgLy8gVG90YWxseSBvdXRzaWRlP1xuICAgIGlmICgoYnVja2V0ICsgd2lkdGggPCAwKSB8fCAoYnVja2V0IC0gd2lkdGggPj0gYnVja2V0cy5sZW5ndGgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgoYnVja2V0IC0gd2lkdGgsIDApO1xuICAgIHZhciBtaWQgPSBidWNrZXQ7XG4gICAgdmFyIGVuZCA9IE1hdGgubWluKGJ1Y2tldCArIHdpZHRoLCBidWNrZXRzLmxlbmd0aCAtIDEpO1xuXG4gICAgdmFyIGxlZnRCbG9ja0NvdW50ID0gc3RhcnQgLSAoYnVja2V0IC0gd2lkdGgpO1xuICAgIHZhciByaWdodEJsb2NrQ291bnQgPSAoYnVja2V0ICsgd2lkdGgpIC0gZW5kO1xuICAgIHZhciBzcGlsbGVkQXJlYUxlZnQgPSBwYXJ0aWFsQXJlYVstd2lkdGgtMSArIGxlZnRCbG9ja0NvdW50XSB8fCAwO1xuICAgIHZhciBzcGlsbGVkQXJlYVJpZ2h0ID0gcGFydGlhbEFyZWFbLXdpZHRoLTEgKyByaWdodEJsb2NrQ291bnRdIHx8IDA7XG4gICAgdmFyIHdlaWdodCA9IGZ1bGxBcmVhIC8gKGZ1bGxBcmVhIC0gc3BpbGxlZEFyZWFMZWZ0IC0gc3BpbGxlZEFyZWFSaWdodCk7XG5cbiAgICBpZiAobGVmdEJsb2NrQ291bnQgPiAwKSB7XG4gICAgICBpbml0YWxWYWx1ZSArPSB3ZWlnaHQgKiAobGVmdEJsb2NrQ291bnQgLSAxKSAqIGM7XG4gICAgfVxuXG4gICAgLy8gQWRkIGdyYWRzXG4gICAgdmFyIHN0YXJ0R3JhZFBvcyA9IE1hdGgubWF4KDAsIGJ1Y2tldC13aWR0aCsxKTtcbiAgICBpZiAoaGVscGVyLmluc2lkZSgwLCBidWNrZXRzLmxlbmd0aC0xLCBzdGFydEdyYWRQb3MpKSB7XG4gICAgICBidWNrZXRzW3N0YXJ0R3JhZFBvc10ueSArPSB3ZWlnaHQgKiAxICogYztcbiAgICB9XG4gICAgaWYgKGhlbHBlci5pbnNpZGUoMCwgYnVja2V0cy5sZW5ndGgtMSwgbWlkICsgMSkpIHtcbiAgICAgIGJ1Y2tldHNbbWlkICsgMV0ueSAtPSB3ZWlnaHQgKiAyICogYztcbiAgICB9XG4gICAgaWYgKGhlbHBlci5pbnNpZGUoMCwgYnVja2V0cy5sZW5ndGgtMSwgZW5kICsgMSkpIHtcbiAgICAgIGJ1Y2tldHNbZW5kICsgMV0ueSArPSB3ZWlnaHQgKiAxICogYztcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBhY2N1bXVsYXRvciA9IGluaXRhbFZhbHVlO1xuICB2YXIgZ3JhZEFjY3VtdWxhdG9yID0gMDtcbiAgdmFyIGFyZWEgPSAwO1xuICBidWNrZXRzLmZvckVhY2goZnVuY3Rpb24gKGJ1Y2tldCkge1xuICAgIGdyYWRBY2N1bXVsYXRvciArPSBidWNrZXQueTtcbiAgICBhY2N1bXVsYXRvciArPSBncmFkQWNjdW11bGF0b3I7XG5cbiAgICBidWNrZXQueSA9IGFjY3VtdWxhdG9yO1xuICAgIGFyZWEgKz0gYWNjdW11bGF0b3I7XG4gIH0pO1xuXG4gIC8vIE5vcm1hbGl6ZVxuICBpZiAoYXJlYSA+IDApIHtcbiAgICBidWNrZXRzLmZvckVhY2goZnVuY3Rpb24gKGJ1Y2tldCkge1xuICAgICAgYnVja2V0LnkgLz0gYXJlYTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBidWNrZXRzO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVQYXJ0aWFsQXJlYXMoa2VybmVsLCB3aWR0aCkge1xuICB2YXIgcGFydGlhbEFyZWFzID0ge307XG5cbiAgdmFyIGFjY3VtdWxhdG9yID0gMDtcbiAgZm9yICh2YXIgaSA9IC13aWR0aDsgaSA8PSB3aWR0aDsgaSsrKSB7XG4gICAgYWNjdW11bGF0b3IgKz0ga2VybmVsKGkvd2lkdGgpO1xuICAgIHBhcnRpYWxBcmVhc1tpXSA9IGFjY3VtdWxhdG9yO1xuICB9XG5cbiAgcmV0dXJuIHBhcnRpYWxBcmVhcztcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0RXhwZWN0ZWRWYWx1ZUZyb21QZGYgPSBmdW5jdGlvbiAocGRmKSB7XG4gIGlmICghcGRmIHx8IChwZGYubGVuZ3RoID09PSAwKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgZXhwZWN0ZWQgPSAwO1xuXG4gIHBkZi5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICBleHBlY3RlZCArPSBvYmoueCAqIG9iai55O1xuICB9KTtcblxuICByZXR1cm4gZXhwZWN0ZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nZXRYV2l0aExlZnRUYWlsQXJlYSA9IGZ1bmN0aW9uIChwZGYsIGFyZWEpIHtcbiAgaWYgKCFwZGYgfHwgKHBkZi5sZW5ndGggPT09IDApKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBhY2N1bXVsYXRvciA9IDA7XG4gIHZhciBsYXN0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZGYubGVuZ3RoOyBpKyspIHtcbiAgICBsYXN0ID0gaTtcbiAgICBhY2N1bXVsYXRvciArPSBwZGZbaV0ueTtcblxuICAgIGlmIChhY2N1bXVsYXRvciA+PSBhcmVhKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGRmW2xhc3RdLng7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nZXRQZXJwbGV4aXR5ID0gZnVuY3Rpb24gKHBkZikge1xuICBpZiAoIXBkZiB8fCAocGRmLmxlbmd0aCA9PT0gMCkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIGVudHJvcHkgPSAwO1xuICBwZGYuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGxuID0gTWF0aC5sb2cob2JqLnkpO1xuXG4gICAgaWYgKGlzRmluaXRlKGxuKSkge1xuICAgICAgZW50cm9weSArPSBvYmoueSAqIGxuO1xuICAgIH1cbiAgfSk7XG4gIGVudHJvcHkgPSAtZW50cm9weSAvIExOXzI7XG5cbiAgcmV0dXJuIE1hdGgucG93KDIsIGVudHJvcHkpO1xufTtcbiJdLCJuYW1lcyI6WyJERUZBVUxUX1NJWkUiLCJERUZBVUxUX1dJRFRIIiwiTE5fMiIsIk1hdGgiLCJsb2ciLCJzZWxmIiwibW9kdWxlIiwiZXhwb3J0cyIsImhlbHBlciIsInJlcXVpcmUiLCJrZXJuZWwiLCJ4IiwiYWJzIiwiZ2V0VW5pZmllZE1pbk1heCIsImFyciIsIm9wdGlvbnMiLCJnZXRVbmlmaWVkTWluTWF4TXVsdGkiLCJhcnJNdWx0aSIsInJlbGF4TWluIiwicmVsYXhNYXgiLCJ3aWR0aCIsImlzTnVtYmVyIiwic2l6ZSIsIm1pbiIsImZpbmRNaW5NdWx0aSIsIm1heCIsImZpbmRNYXhNdWx0aSIsInJhbmdlIiwic3RlcCIsImNyZWF0ZSIsImxlbmd0aCIsIm5vcm1hbGl6ZWRNaW5NYXgiLCJ5IiwiYnVja2V0cyIsImkiLCJwdXNoIiwieFRvQnVja2V0IiwiZmxvb3IiLCJwYXJ0aWFsQXJlYSIsImdlbmVyYXRlUGFydGlhbEFyZWFzIiwiZnVsbEFyZWEiLCJjIiwiaW5pdGFsVmFsdWUiLCJmb3JFYWNoIiwiYnVja2V0Iiwic3RhcnQiLCJtaWQiLCJlbmQiLCJsZWZ0QmxvY2tDb3VudCIsInJpZ2h0QmxvY2tDb3VudCIsInNwaWxsZWRBcmVhTGVmdCIsInNwaWxsZWRBcmVhUmlnaHQiLCJ3ZWlnaHQiLCJzdGFydEdyYWRQb3MiLCJpbnNpZGUiLCJhY2N1bXVsYXRvciIsImdyYWRBY2N1bXVsYXRvciIsImFyZWEiLCJwYXJ0aWFsQXJlYXMiLCJnZXRFeHBlY3RlZFZhbHVlRnJvbVBkZiIsInBkZiIsInVuZGVmaW5lZCIsImV4cGVjdGVkIiwib2JqIiwiZ2V0WFdpdGhMZWZ0VGFpbEFyZWEiLCJsYXN0IiwiZ2V0UGVycGxleGl0eSIsImVudHJvcHkiLCJsbiIsImlzRmluaXRlIiwicG93Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/pdfast/src/index.js\n");

/***/ })

};
;