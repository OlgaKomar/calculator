define([], function() {
  var Validator = (function(){
    // "val" contains current number, "op" contains the last added operator
    var val = "",
        op  = "";
    return {
        clearScreen : function() {
            val = "";
            return val;
        },

        addDot: function(screenValue) {
            if(!screenValue) val = "";
            if (val.indexOf(".") > 0) { alert("Number can't contain two dots"); return; }
            if (val == "") { val = "0."; return val; }
            if (parseInt(val) || parseInt(val) === 0) { val += "."; return "."; }            
        },

        addNumber: function (numberVal, screenValue) {
          op = "";
          if(numberVal == 0 && val == "0") return;
          if(val == "0") { val = numberVal; return (screenValue || screenValue === 0 ) ? screenValue.slice(0, -1) + numberVal : numberVal ; }
          val += numberVal;
          return (screenValue) ? screenValue + numberVal : numberVal;
        },

        addOperator: function (operatorValue, screenValue) {
          var lastChar = screenValue[screenValue.length - 1];
          if ( !(screenValue) || op == operatorValue ) return;
          val = "";
          if (lastChar == op || lastChar == "." ) {
            op = operatorValue;
            return screenValue.slice(0, -1) + operatorValue;
          };
          op = operatorValue;

          return screenValue + op;
        }
      };
  })();

  return Validator;
});