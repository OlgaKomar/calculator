     var calculatorContainerID = "calculator",
          clearButtonID = "clearID",
          screenID = "screenID",
          dotButtonID = "dotID",
          calculationButtonID = "calcID",
          numberButtonClass = "number",
          operatorButtonClass = "operator",
          calculatorContainer = document.getElementById(calculatorContainerID),
          screenContainer = calculatorContainer.querySelector("#" + screenID),
          clearButton = calculatorContainer.querySelector("#" + clearButtonID),
          dotButton = calculatorContainer.querySelector("#" + dotButtonID),
          calculationButton = calculatorContainer.querySelector("#" + calculationButtonID),
          arrNumberButtons = calculatorContainer.getElementsByClassName(numberButtonClass),
          arrOperatorButtons = calculatorContainer.getElementsByClassName(operatorButtonClass),
          val = "",
          op = "",
          arrValues = [];

      for ( var i = 0, l = arrNumberButtons.length; i < l; i++ ) {
        arrNumberButtons[i].addEventListener("click", addNumber);
      }

      for ( var i = 0, l = arrOperatorButtons.length; i < l; i++ ) {
        arrOperatorButtons[i].addEventListener("click", operarorHandler);
      }
      
      clearButton.addEventListener("click", clearScreen);
      dotButton.addEventListener("click", addDot);
      calculationButton.addEventListener("click", executeCalc);

      function executeCalc() {
        val = screenContainer.innerHTML;
        while(val){
          arrValues.push(parseFloat(val));
          val = val.slice(arrValues[arrValues.length-1].toString().length);
          if (val) {
            arrValues.push(val[0]);
            val = val.slice(1);
          }
        }
        for (var i = 0; i < arrValues.length - 1; i++) {
          if (arrValues[i] == "x") {
            arrValues[i-1] *= arrValues[i+1];
            arrValues.splice(i, 2);
            i--;
          }
          if (arrValues[i] == "/") {
            arrValues[i-1] /= arrValues[i+1];
            arrValues.splice(i, 2);
            i--;
          }
          if (arrValues[i] == "-") {
            arrValues[i+1] = "-" + arrValues[i+1];
            arrValues.splice(i, 1);
          }
          if (arrValues[i] == "+") {
            arrValues.splice(i, 1);
          }

        console.log(arrValues);
        };
        var sum = 0;
        for (var i = 0, l = arrValues.length; i < l; i++) {
          if (isNaN(arrValues[i])) {
            sum = "NaN";
            break;
          }
          sum += parseFloat(arrValues[i]);
        }
        screenContainer.innerHTML = sum;
        arrValues = [];
      }

      function clearScreen() {
        val = "";
        screenContainer.innerHTML = val;
      }

      function addDot() {
        if (val.indexOf(".") > 0) { alert("Number can't contain two dots"); return ; }
        if (val == "") { screenContainer.innerHTML = screenContainer.innerHTML + "0."; val += "0."; return; }
        if (parseInt(val) || parseInt(val) == 0) { screenContainer.innerHTML = screenContainer.innerHTML + "."; val +="."; }

        //screenContainer.innerHTML = val;
      }

      function operarorHandler() {
        if ( !(screenContainer.innerHTML) || op == this.innerHTML || screenContainer.innerHTML[screenContainer.innerHTML.length - 1] == "." ) return;
        val = "";
        if (screenContainer.innerHTML[screenContainer.innerHTML.length - 1] == op) {
          screenContainer.innerHTML = screenContainer.innerHTML.slice(0, -1) + this.innerHTML;
          op = this.innerHTML;
          return;
        };
        op = this.innerHTML;

        screenContainer.innerHTML = screenContainer.innerHTML + op;

      }

      function addNumber() {
        op = "";
        if(this.innerHTML == 0 && val == "0") return;
        val += this.innerHTML;
        screenContainer.innerHTML = screenContainer.innerHTML + this.innerHTML;
      }

    <!-- build:js scripts/main.js -->
    <!--<script src="scripts/main.js"></script>-->
