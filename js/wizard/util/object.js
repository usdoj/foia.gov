/*
 * Goes through each property of an object as an associative array.
 */
function objectForEach(object, forEachFn) {
  Object.entries(object).forEach((item) => forEachFn(item[0], item[1]));
}

/*
 * Returns an array with the return values of the callback function.
 */
function objectMap(object, mapFn) {
  return Object.keys(object).reduce((result, key) => {
    result.push(mapFn(key, object[key]));
    return result;
  }, []);
}

export {
  objectForEach,
  objectMap,
};
