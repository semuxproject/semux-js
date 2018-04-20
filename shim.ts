// shims
import "core-js/shim";
if (!global['XMLHttpRequest']) {
  global['XMLHttpRequest'] = require("xmlhttprequest").XMLHttpRequest;
}
if (!global['btoa']) {
  global['btoa'] = require('btoa');
}
if (!global['atob']) {
  global['atob'] = require('atob');
}
