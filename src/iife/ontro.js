var root = (function() { return this || (0, eval)("this"); }());
if(typeof root !== "undefined"){var previous_atat = root.atat; Atat.noConflict = function(){ root.atat = previous_atat; return Atat; }}
if(typeof module !== "undefined" && module.exports){ module.exports = Atat; }else if(typeof define === "function" && define.amd){ define(function() { return Atat; }); }else{ root.atat = Atat; }
}());