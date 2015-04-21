define([], function() {
  var CalcResult = (function(){
    // "arrValues" contains numbers and operators after papsing the result string
    var arrValues = [];
    return {
      executeCalc : function(stringExpression) {
        var val = stringExpression;
        while(val){
          arrValues.push(parseFloat(val));
          val = val.slice(arrValues[arrValues.length-1].toString().length);
          if (val) {
            arrValues.push(val[0]);
            val = val.slice(1);
          }
        }
        for (var i = 0; i < arrValues.length; i++) {

          if (arrValues[i] == "x" || arrValues[i] == "*" || arrValues[i] == "/") {
            (arrValues[i] == "/") ? arrValues[i-1] /= arrValues[i+1] : arrValues[i-1] *= arrValues[i+1];
            arrValues.splice(i, 2);
            i--;
            continue;
          }
          if (arrValues[i] == "-") {
            arrValues[i+1] = parseFloat("-" + arrValues[i+1]);
            arrValues.splice(i, 1);
          }
          if (arrValues[i] == "+" || arrValues[i] == ".") {
            arrValues.splice(i, 1);
          }

        console.log(arrValues);
        };
        var sum = 0;
        for (var i = 0, l = arrValues.length; i < l; i++) {
          if (!(typeof arrValues[i] === "number") || isNaN(arrValues[i])) {
            sum = "NaN";
            break;
          }
          sum += arrValues[i];
        }
        arrValues = [];
        return (!(typeof sum === "number") || isNaN(sum)) ? "NaN" : sum;
      }
    };
  })();

  return CalcResult;
});