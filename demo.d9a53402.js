parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"DOAq":[function(require,module,exports) {

},{}],"u9vI":[function(require,module,exports) {
function n(n){var o=typeof n;return null!=n&&("object"==o||"function"==o)}module.exports=n;
},{}],"j3D9":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3],t="object"==typeof e&&e&&e.Object===Object&&e;module.exports=t;
},{}],"MIhM":[function(require,module,exports) {
var e=require("./_freeGlobal"),t="object"==typeof self&&self&&self.Object===Object&&self,l=e||t||Function("return this")();module.exports=l;
},{"./_freeGlobal":"j3D9"}],"pJf5":[function(require,module,exports) {
var r=require("./_root"),e=function(){return r.Date.now()};module.exports=e;
},{"./_root":"MIhM"}],"wppe":[function(require,module,exports) {
var o=require("./_root"),r=o.Symbol;module.exports=r;
},{"./_root":"MIhM"}],"uiOY":[function(require,module,exports) {
var r=require("./_Symbol"),t=Object.prototype,e=t.hasOwnProperty,o=t.toString,a=r?r.toStringTag:void 0;function l(r){var t=e.call(r,a),l=r[a];try{r[a]=void 0;var c=!0}catch(n){}var i=o.call(r);return c&&(t?r[a]=l:delete r[a]),i}module.exports=l;
},{"./_Symbol":"wppe"}],"lPmd":[function(require,module,exports) {
var t=Object.prototype,o=t.toString;function r(t){return o.call(t)}module.exports=r;
},{}],"e5TX":[function(require,module,exports) {
var e=require("./_Symbol"),r=require("./_getRawTag"),o=require("./_objectToString"),t="[object Null]",i="[object Undefined]",n=e?e.toStringTag:void 0;function u(e){return null==e?void 0===e?i:t:n&&n in Object(e)?r(e):o(e)}module.exports=u;
},{"./_Symbol":"wppe","./_getRawTag":"uiOY","./_objectToString":"lPmd"}],"OuyB":[function(require,module,exports) {
function e(e){return null!=e&&"object"==typeof e}module.exports=e;
},{}],"bgO7":[function(require,module,exports) {
var e=require("./_baseGetTag"),r=require("./isObjectLike"),o="[object Symbol]";function t(t){return"symbol"==typeof t||r(t)&&e(t)==o}module.exports=t;
},{"./_baseGetTag":"e5TX","./isObjectLike":"OuyB"}],"iS0Z":[function(require,module,exports) {
var e=require("./isObject"),r=require("./isSymbol"),t=NaN,i=/^\s+|\s+$/g,f=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,n=/^0o[0-7]+$/i,s=parseInt;function a(a){if("number"==typeof a)return a;if(r(a))return t;if(e(a)){var o="function"==typeof a.valueOf?a.valueOf():a;a=e(o)?o+"":o}if("string"!=typeof a)return 0===a?a:+a;a=a.replace(i,"");var l=u.test(a);return l||n.test(a)?s(a.slice(2),l?2:8):f.test(a)?t:+a}module.exports=a;
},{"./isObject":"u9vI","./isSymbol":"bgO7"}],"CXfR":[function(require,module,exports) {
var i=require("./isObject"),t=require("./now"),r=require("./toNumber"),n="Expected a function",e=Math.max,u=Math.min;function o(o,a,f){var c,v,d,m,l,s,T=0,p=!1,h=!1,x=!0;if("function"!=typeof o)throw new TypeError(n);function g(i){var t=c,r=v;return c=v=void 0,T=i,m=o.apply(r,t)}function q(i){var t=i-s;return void 0===s||t>=a||t<0||h&&i-T>=d}function w(){var i=t();if(q(i))return y(i);l=setTimeout(w,function(i){var t=a-(i-s);return h?u(t,d-(i-T)):t}(i))}function y(i){return l=void 0,x&&c?g(i):(c=v=void 0,m)}function b(){var i=t(),r=q(i);if(c=arguments,v=this,s=i,r){if(void 0===l)return function(i){return T=i,l=setTimeout(w,a),p?g(i):m}(s);if(h)return clearTimeout(l),l=setTimeout(w,a),g(s)}return void 0===l&&(l=setTimeout(w,a)),m}return a=r(a)||0,i(f)&&(p=!!f.leading,d=(h="maxWait"in f)?e(r(f.maxWait)||0,a):d,x="trailing"in f?!!f.trailing:x),b.cancel=function(){void 0!==l&&clearTimeout(l),T=0,c=s=v=l=void 0},b.flush=function(){return void 0===l?m:y(t())},b}module.exports=o;
},{"./isObject":"u9vI","./now":"pJf5","./toNumber":"iS0Z"}],"D3J9":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.OUTSIDE="outside",e.INSIDE="inside"}(e=exports.MuchResultTypes||(exports.MuchResultTypes={}));
},{}],"zat6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HTML_RULES={'"':"&#34;","&":"&#38;","'":"&#39;","/":"&#47;","<":"&#60;",">":"&#62;"},exports.CLEAR_TAGS=/[-[\](){}*+?.,\\^$|#\s]/g,exports.MATCH_HTML=/&(?!#?\w+;)|<|>|"|'|\//g;
},{}],"sMN0":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3];function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function l(e){try{u(r.next(e))}catch(t){a(t)}}function i(e){try{u(r.throw(e))}catch(t){a(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(l,i)}u((r=r.apply(e,t||[])).next())})},r=this&&this.__generator||function(e,t){var n,r,o,a,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,r=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!(o=(o=l.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){l=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){l.label=a[1];break}if(6===a[0]&&l.label<o[1]){l.label=o[1],o=a;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(a);break}o[2]&&l.ops.pop(),l.trys.pop();continue}a=t.call(e,l)}catch(i){a=[6,i],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./contants"),a=require("./types");function l(e,n){for(var r in void 0===n&&(n={}),e)!n.hasOwnProperty(r)&&e.hasOwnProperty(r)&&("object"===t(e[r])?n[r]=l(e[r]):n[r]=e[r]);return n}function i(e,t){for(var n in e)e.hasOwnProperty(n)&&t(e[n],n,e)}function u(e,t){return n(this,void 0,void 0,function(){var n,o,a;return r(this,function(r){switch(r.label){case 0:for(n=[],o=0,a=e.length;o<a;o+=1)n.push(t(e[o],o,e));return[4,Promise.all(n)];case 1:return[2,r.sent()]}})})}function s(e){return e.toString().replace(o.MATCH_HTML,function(e){return o.HTML_RULES[e]||e})}function c(e){return e.trim().replace(/^"(.*)"$/g,"$1").replace(/^'(.*)'$/g,"$1")}function p(e){return JSON.stringify(e)}function f(e,t){return void 0===t&&(t=""),Array.prototype.join.call(e,t)}function h(e){return e.toString().toUpperCase()}function y(e){return e.toString().toLowerCase()}function d(e,t,n){for(var r,o,l=t.global,i=t.sticky,u=[],s=0,c=0,p=0,f=0,h=0,y=0;;){if(r=b(e,t,p),o=b(e,n,p),r&&o&&(r.index<=o.index?o=null:r=null),r||o)p=(c=(r||o).index)+(r||o)[0].length;else if(!s)break;if(i&&!s&&c>f)break;if(r)s||(h=c,y=p),s+=1;else{if(!o||!s)throw null!==o?new SyntaxError('Unbalanced delimiter "'+o+'" was found in the template\n'+e+"\n"+" ".repeat(o.index)+"^".repeat(o.toString().length)):new SyntaxError("Unbalanced delimiter found in the template\n"+e);if(!(s-=1)&&(h>f&&u.push({name:a.MuchResultTypes.OUTSIDE,value:e.slice(f,h),start:f,end:h}),u.push({name:a.MuchResultTypes.INSIDE,value:e.slice(y,c),start:y,end:c,left:{value:e.slice(h,y),start:h,end:y},right:{value:e.slice(c,p),start:c,end:p}}),f=p,!l))break}c===p&&(p+=1)}return l&&e.length>f&&u.push({name:a.MuchResultTypes.OUTSIDE,value:e.slice(f),start:f,end:e.length}),u}function v(e,t,n){void 0===n&&(n=0),t.lastIndex=n;var r=t.test(e);return t.global&&(t.lastIndex=r?t.lastIndex:0),r}function b(e,t,n){void 0===n&&(n=0),t.lastIndex=n;var r=t.exec(e);return t.global&&(t.lastIndex=r?t.lastIndex:0),r}function x(e){for(var t=0;t<e.length;t+=1)void 0===e[t]&&(e.splice(t,1),t-=1)}function g(e,t){for(var n,r,o=t.global,l=t.sticky,i=[],u=0,s=0;;){var c=b(e,t,u);if(null===c)break;if(s=c.index,l&&s>u)break;if(x(c),r=u+(n=s+c[1].length)+c[2].length,s>u&&i.push({name:a.MuchResultTypes.OUTSIDE,value:e.slice(u,s),start:u,end:s}),i.push({name:a.MuchResultTypes.INSIDE,value:c[2],start:n,end:r,left:{value:c[1],start:s,end:n},right:{value:c[3],start:r,end:r+c[3].length}}),u=s+c[0].length,!o)break}return o&&e.length>u&&i.push({name:a.MuchResultTypes.OUTSIDE,value:e.slice(u),start:u,end:e.length}),i}exports.merge=l,exports.loopByObject=i,exports.loopAsync=u,exports.encodeHtml=s,exports.escapeQuotes=c,exports.jsonStringify=p,exports.joinHelper=f,exports.uppercaseHelper=h,exports.lowercaseHelper=y,exports.matchRecursive=d,exports.regexpTest=v,exports.regexpExec=b,exports.cleanArray=x,exports.matchInline=g;
},{"./contants":"zat6","./types":"D3J9"}],"R9YP":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function u(e){try{c(n.next(e))}catch(t){o(t)}}function s(e){try{c(n.throw(e))}catch(t){o(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(u,s)}c((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!(i=(i=u.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=t.call(e,u)}catch(s){o=[6,s],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./atat"),n=require("./types"),i=require("./utils");function o(r,o){return e(this,void 0,void 0,function(){var s,c=this;return t(this,function(a){switch(a.label){case 0:return 0===r.length?[2,""]:(s=i.matchRecursive(r,o.tags.open,o.tags.close),[4,i.loopAsync(s,function(r){return e(c,void 0,void 0,function(){var e;return t(this,function(t){switch(t.label){case 0:return r.name!==n.MuchResultTypes.OUTSIDE?[3,2]:""===r.value.trim()?[2,""]:[4,u(r.value,o)];case 1:return[2,t.sent()];case 2:return e=r.left,[4,o.getCompiler(e.value)(r,o)];case 3:return[2,t.sent()||""]}})})})]);case 1:return[2,a.sent().join("")]}})})}function u(r,o){return e(this,void 0,void 0,function(){var u,s=this;return t(this,function(c){switch(c.label){case 0:return u=i.matchInline(r,o.tags.inline),[4,i.loopAsync(u,function(r){return e(s,void 0,void 0,function(){var e,i,u;return t(this,function(t){switch(t.label){case 0:return r.name===n.MuchResultTypes.OUTSIDE?(o.parts.push(r.value),[2,"this.output += this.parts["+(o.parts.length-1)+"];"]):(e=r.left,i=r.value,u=r.right,""===i.trim()?[2,""]:[4,o.getCompiler(e.value+i+u.value)(r,o)]);case 1:return[2,t.sent()||""]}})})})];case 1:return[2,c.sent().join("")]}})})}function s(r){return e(this,void 0,void 0,function(){return t(this,function(e){return[2,r.value.trim()]})})}function c(r,n){return e(this,void 0,void 0,function(){var e,u,s,c,a,l;return t(this,function(t){switch(t.label){case 0:return e="for("+r.value+"}",u=i.matchRecursive(e,/\{/g,/\}/g),s=u[0].value,c=u[1].value,a=s,l=a+="{",[4,o(c,n)];case 1:return a=l+t.sent(),[2,a+="}"]}})})}function a(r){return e(this,void 0,void 0,function(){return t(this,function(e){return[2,""+r.left.value.trim().substring(1)+r.value.trim()+"}"]})})}function l(r,u){return e(this,void 0,void 0,function(){var s,c,a=this;return t(this,function(l){switch(l.label){case 0:return s="if("+r.value+"}",c=i.matchRecursive(s,/\{/g,/\}/g),[4,i.loopAsync(c,function(r){return e(a,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return r.name===n.MuchResultTypes.OUTSIDE?[2,r.value]:[4,o(r.value,u)];case 1:return[2,e.sent()]}})})})];case 1:return[2,l.sent().join("")]}})})}function p(n,o){return e(this,void 0,void 0,function(){var e,u,s,c,a,l;return t(this,function(t){switch(t.label){case 0:if(e=n.value.trim(),u=n.left.value.trim(),s=/^@section\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)+\s*\{/g,!(c=i.regexpExec(u,s))||c.length>2)throw new Error("Section name is not specified");return a=c[1].trim(),[4,r.parse(e,o.options)];case 1:if(l=t.sent(),o.sections[a])throw new Error('The section "'+a+'" is already specified');return l.context.parent=o,o.sections[a]=l,[2]}})})}function h(r,n){return e(this,void 0,void 0,function(){var e,u,s,c,a,l;return t(this,function(t){switch(t.label){case 0:return e="while("+r.value+"}",u=i.matchRecursive(e,/\{/g,/\}/g),s=u[0].value,c=u[1].value,a=s,l=a+="{",[4,o(c,n)];case 1:return a=l+t.sent(),[2,a+="}"]}})})}function f(r){return e(this,void 0,void 0,function(){return t(this,function(e){return[2,"this.output += this.helpers.encode("+r.value.trim()+");"]})})}function v(r){return e(this,void 0,void 0,function(){return t(this,function(e){return[2,"this.output += ("+r.value.trim()+");"]})})}function d(n,o){return e(this,void 0,void 0,function(){var e;return t(this,function(t){switch(t.label){case 0:return[4,r.loadAndParse(i.escapeQuotes(n.value),o.options)];case 1:if(e=t.sent(),o.layout)throw new Error("Layout is already specified");return o.layout=e,e.context.parent=o,[2]}})})}function g(n,o){return e(this,void 0,void 0,function(){var e,u,s,c;return t(this,function(t){switch(t.label){case 0:return e=n.value.trim(),u=e.split(/\s*,\s*/g),s=i.escapeQuotes(u.shift()||""),[4,r.loadAndParse(s,o.options)];case 1:return c=t.sent(),o.partials.push(c),c.context.parent=o,[2,"this.output += this.partials["+(o.partials.length-1)+"]("+u+");"]}})})}function m(r,n){return e(this,void 0,void 0,function(){var e;return t(this,function(t){return e=i.escapeQuotes(r.value),[2,"this.output += (function(){var s = this.getSection('"+e+"'); return s?s("+n.arguments+'):"";}).call(this);']})})}function x(r,n){return e(this,void 0,void 0,function(){var e,i,o;return t(this,function(t){if(e=r.left,i=r.value,o=e.value.substring(1,e.value.length-1),"function"!=typeof n.helpers[o])throw new Error('Helper "'+o+'" is not declarated');return[2,"this.output += this.helpers['"+o+"']("+i.trim()+");"]})})}exports.helpers={encode:i.encodeHtml,join:i.joinHelper,json:i.jsonStringify,lower:i.lowercaseHelper,upper:i.uppercaseHelper},exports.tags={open:/@\{|@for\s*\(|@function\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\(|@if\s*\(|@section\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\{|@while\s*\(/g,close:/}@/g,inline:/(@\()([^]*?)(\)@)|(@!\()([^]*?)(\)@)|(@[a-zA-Z_$]{1}[a-zA-Z_$0-9]*\()([^]*?)(\)@)/g,compilers:[{regexp:/@\{/g,compiler:s},{regexp:/@for\s*\(/g,compiler:c},{regexp:/@function\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\(/g,compiler:a},{regexp:/@if\s*\(/g,compiler:l},{regexp:/@section\s+([a-zA-Z_$]{1}[a-zA-Z_$0-9]*)*\s*\{/g,compiler:p},{regexp:/@while\s*\(/g,compiler:h},{regexp:/(@\()([^]*?)(\)@)/g,compiler:f},{regexp:/(@!\()([^]*?)(\)@)/g,compiler:v},{regexp:/(@layout\()([^]*?)(\)@)/g,compiler:d},{regexp:/(@partial\()([^]*?)(\)@)/g,compiler:g},{regexp:/(@section\()([^]*?)(\)@)/g,compiler:m},{regexp:/(@[a-zA-Z_$]{1}[a-zA-Z_$0-9]*\()([^]*?)(\)@)/g,compiler:x}]},exports.compile=o,exports.compileInline=u,exports.compileCode=s,exports.compileFor=c,exports.compileFunction=a,exports.compileIf=l,exports.compileSection=p,exports.compileWhile=h,exports.outputAsText=f,exports.outputAsHtml=v,exports.compileLayout=d,exports.compilePartial=g,exports.outputSection=m,exports.outputCallHelper=x;
},{"./atat":"vjx7","./types":"D3J9","./utils":"sMN0"}],"hlh9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_LOADER=function(e){return new Promise(function(r,t){require("fs").readFile(e,"utf-8",function(e,n){return e?t(e):r(n)})})};
},{"fs":"DOAq"}],"urhJ":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{c(r.next(e))}catch(t){i(t)}}function a(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,a)}c((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.FETCH_LOADER=function(n){return e(void 0,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return[4,fetch(n)];case 1:return[4,e.sent().text()];case 2:return[2,e.sent()]}})})};
},{}],"Fsgx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./default");exports.DEFAULT_LOADER=e.DEFAULT_LOADER;var r=require("./fetch");exports.FETCH_LOADER=r.FETCH_LOADER;
},{"./default":"hlh9","./fetch":"urhJ"}],"nNXC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./loaders");exports.DEFAULT_OPTIONS={it:"it",$:"$",helpers:{},loader:e.DEFAULT_LOADER};
},{"./loaders":"Fsgx"}],"WWJn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./compiler"),e=require("./options"),i=require("./utils"),s=function(){function s(s){this.body=null,this.template=null,this.options=i.merge(e.DEFAULT_OPTIONS,s),this.helpers=i.merge(t.helpers,s.helpers),this.model=null,this.output="",this.parts=[],this.parent=null,this.arguments=[this.options.it,this.options.$,"body"].join(","),this.tags=t.tags,this.layout=null,this.partials=[],this.sections={}}return s.prototype.getSection=function(t){return t?this.sections[t]||this.parent&&this.parent.getSection(t):null},s.prototype.getCompiler=function(t){for(var e=0,s=this.tags.compilers.length;e<s;e+=1){var r=this.tags.compilers[e];if(i.regexpTest(t,r.regexp))return r.compiler}return null},s}();exports.AtatContext=s;
},{"./compiler":"R9YP","./options":"nNXC","./utils":"sMN0"}],"vjx7":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{c(r.next(e))}catch(t){i(t)}}function a(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,a)}c((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./compiler"),r=require("./context"),o=require("./loaders"),i=require("./options");function u(e){Object.assign(i.DEFAULT_OPTIONS,e)}function a(o,i){return void 0===i&&(i={}),e(this,void 0,void 0,function(){var e,u,a,c;return t(this,function(t){switch(t.label){case 0:return e=new r.AtatContext(i),[4,n.compile(o,e)];case 1:return u=t.sent(),a=new Function(e.arguments,u+";return this.output;"),(c=function(t){e.output="",e.model=t||e.model;var n=a.call(e,e.model,e.helpers,e.body);return e.layout&&(e.layout.context.body=n,n=e.layout(e.model)),n}).context=e,e.template=c,[2,e.template]}})})}function c(n,r){return void 0===r&&(r={}),e(this,void 0,void 0,function(){var e;return t(this,function(t){switch(t.label){case 0:return(e=r.loader||i.DEFAULT_OPTIONS.loader)||(e=o.DEFAULT_LOADER,r.loader=e),[4,e(n)];case 1:return[4,a(t.sent(),r)];case 2:return[2,t.sent()]}})})}function s(n,r,o){return void 0===r&&(r={}),void 0===o&&(o={}),e(this,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return[4,a(n,o)];case 1:return[2,e.sent()(r)]}})})}function l(n,r,o){return void 0===o&&(o={}),e(this,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return[4,c(n,o)];case 1:return[2,e.sent()(r)]}})})}exports.config=u,exports.parse=a,exports.loadAndParse=c,exports.render=s,exports.loadAndRender=l;
},{"./compiler":"R9YP","./context":"WWJn","./loaders":"Fsgx","./options":"nNXC"}],"GmWQ":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function u(e){try{c(r.next(e))}catch(t){a(t)}}function i(e){try{c(r.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,i)}c((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,r=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){u=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){u.label=a[1];break}if(6===a[0]&&u.label<o[1]){u.label=o[1],o=a;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(a);break}o[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(i){a=[6,i],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./atat");function r(r,o,a){e(this,void 0,void 0,function(){var e,u;return t(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,n.loadAndRender(r,o)];case 1:return e=t.sent(),a(null,e),[3,3];case 2:return u=t.sent(),a(u),[3,3];case 3:return[2]}})})}exports.__express=r;
},{"./atat":"vjx7"}],"vVAc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./atat");exports.config=e.config,exports.loadAndParse=e.loadAndParse,exports.loadAndRender=e.loadAndRender,exports.parse=e.parse,exports.render=e.render;var r=require("./express");exports.__express=r.__express;var d=require("./loaders");exports.DEFAULT_LOADER=d.DEFAULT_LOADER,exports.FETCH_LOADER=d.FETCH_LOADER,exports.default={config:e.config,loadAndParse:e.loadAndParse,loadAndRender:e.loadAndRender,parse:e.parse,render:e.render,FETCH_LOADER:d.FETCH_LOADER,DEFAULT_LOADER:d.DEFAULT_LOADER};
},{"./atat":"vjx7","./express":"GmWQ","./loaders":"Fsgx"}],"ugWK":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,u){function a(e){try{l(r.next(e))}catch(t){u(t)}}function i(e){try{l(r.throw(e))}catch(t){u(t)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,i)}l((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(i){u=[6,i],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),require("normalize.css"),require("./styles.scss");var r=n(require("lodash/debounce")),o=require("atat"),u=document.getElementById("template"),a=document.getElementById("data"),i=document.getElementById("result"),l=document.getElementById("error");u.onkeyup=a.onkeyup=r.default(function(){return e(void 0,void 0,void 0,function(){var e,n;return t(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,o.render(u.value,JSON.parse(a.value||"{}"))];case 1:return e=t.sent(),l.textContent="",i.textContent=e,[3,3];case 2:return n=t.sent(),i.textContent="",l.textContent=""+n.toString(),[3,3];case 3:return[2]}})})},1e3);
},{"normalize.css":"DOAq","./styles.scss":"DOAq","lodash/debounce":"CXfR","atat":"vVAc"}]},{},["ugWK"], null)