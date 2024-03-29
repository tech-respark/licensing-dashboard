interface ArrayRange {
    from: number;
    to: number;
}

interface MoveOpts<T> {
    isMutate?: boolean;
    isDuplicate?: boolean;
    isSwap?: boolean;
    fill?: T;
}

/**
 * Converts input to an array
 *
 * @param input
 */
function toArray<T>(input: T | T[]) {
    if (input === null || input === undefined) {
        return [];
    }

    return Array.isArray(input) ? input : [input];
}

// /**
//  * Validate array and its range.
//  *
//  * @param arr
//  * @param arrayRangeObj
//  */
// function isValid<T>(arr: T[], { from, to }: ArrayRange) {
//   return (
//     Array.isArray(arr) &&
//     typeof from === "number" &&
//     typeof to === "number" &&
//     from >= 0 &&
//     to >= 0 &&
//     from < arr.length &&
//     to < arr.length
//   );
// }

// /**
//  * Moves element form/to index.
//  *
//  * @param arr
//  * @param opts
//  */
// function move<T>(arr: T[] = [], { from, to, isMutate = true }: MoveOpts) {
//   if (!isValid(arr, { from, to })) {
//     throw new Error(`Input:is not valid!`);
//   }

//   const modified = isMutate ? arr : arr.slice();

//   modified.splice(to, 0, modified.splice(from, 1)[0]);

//   return modified;
// }

/**
 * Moves multiple indexes in the same array
 *
 * @param arr
 * @param movingMap
 * @param opts
 */
function move<T>(arr: T[] = [], movingMap: ArrayRange | ArrayRange[], { isMutate = false, isDuplicate = false, isSwap = true, fill, }: MoveOpts<T> = {}) {
    const modified: any = isMutate ? arr : arr.slice();

    const mapping = toArray(movingMap);

    mapping.forEach(({ from, to }) => {
        const draft = modified[to];
        modified[to] = arr[from];

        if (isDuplicate) {
            modified[to] = arr[from];
        } else if (fill) {
            modified[from] = fill;
        } else if (!isSwap) {
            modified[from] = null;
        } else {
            modified[from] = draft;
        }
    });

    return modified;
}

/**
 *
 * @param unFlatten
 */
function flatten<T>(unFlatten: T[] = []) {
    const flat: T[] = [];

    function flattenRec(arr: T[]) {
        arr.forEach((elm) => {
            if (!Array.isArray(elm)) {
                flat.push(elm);
            } else {
                flattenRec(elm);
            }
        });

        return flat;
    }

    return flattenRec(unFlatten);
}

function compareOneMeta<T>(arr1: T[], arr2: T[], acc: T[] = []) {
    for (let i = 0; i < arr1.length; i += 1) {
        const elm = arr1[i];

        let hasDiff = true;

        for (let j = 0; j < arr2.length; j += 1) {
            if (arr1[i] === arr2[j]) {
                hasDiff = false;
                break;
            }
        }

        if (hasDiff) {
            acc.push(elm);
        }
    }

    return acc;
}

function compare<T>(...args: T[][]) {
    let diff: T[] = args[0];

    for (let i = 1; i < args.length; i += 1) {
        diff = compareOneMeta(diff, args[i]);
    }

    return diff;
}

function compareMeta<T>(arr1: T[], arr2: T[], acc: T[] = []) {
    const firstDiff = compareOneMeta(arr1, arr2, acc);
    return compareOneMeta(arr2, arr1, firstDiff);
}

function compareBoth<T>(...args: T[][]) {
    let acc = args[0];

    for (let i = 1; i < args.length; i += 1) {
        acc = compareMeta(acc, args[i]);
    }

    return acc;
}

export { compareBoth, compare, flatten, toArray, move };