// ForeSee Production Embed Script v2.01
// DO NOT MODIFY BELOW THIS LINE *****************************************
;(function (g) {
  var d = document, am = d.createElement('script'), h = d.head || d.getElementsByTagName("head")[0], fsr = 'fsReady',
  aex = {
    "src": "//gateway.foresee.com/sites/foia-gov/production/gateway.min.js",
    "type": "text/javascript",
    "async": "true",
    "data-vendor": "fs",
    "data-role": "gateway"
  };
  for (var attr in aex) { am.setAttribute(attr, aex[attr]); } h.appendChild(am); g[fsr] || (g[fsr] = function () { var aT = '__' + fsr + '_stk__'; g[aT] = g[aT] || []; g[aT].push(arguments); });
})(window);
// DO NOT MODIFY ABOVE THIS LINE *****************************************

// Un-comment out the function below when you are ready to input your variable
/*fsReady(function() {
  FSR.CPPS.set('name','value'); // use single quotes when passing a static-value
  FSR.CPPS.set('name2',somevariable); // don't use quotes for a dynamic value
  FSR.CPPS.set('name3',othervariable); // add as many CPPs as you like in this way
});*/
