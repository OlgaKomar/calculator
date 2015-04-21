define(['app/controller/inputValidator',
        'app/controller/calculationResult',
        ], function(Validator, CalcResult) {
  var App = function ( containerID, clearButtonID, screenID, dotButtonID, calculationButtonID, numberButtonClass, operatorButtonClass ) {
    this.calculatorContainer = document.getElementById(containerID);
    this.screenContainer = this.calculatorContainer.querySelector("#" + screenID);
    this.clearButton = this.calculatorContainer.querySelector("#" + clearButtonID);
    this.dotButton = this.calculatorContainer.querySelector("#" + dotButtonID);
    this.calculationButton = this.calculatorContainer.querySelector("#" + calculationButtonID);
    this.arrNumberButtons = this.calculatorContainer.getElementsByClassName(numberButtonClass);
    this.arrOperatorButtons = this.calculatorContainer.getElementsByClassName(operatorButtonClass);
    this.screenResultEvaluated = false;

    this.init = function(){
      var self = this;
      for ( var i = 0, l = this.arrNumberButtons.length; i < l; i++ ) {
        this.arrNumberButtons[i].addEventListener("click", function(){
          if(self.screenResultEvaluated) { self.screenContainer.value = ""; self.screenResultEvaluated = false; }
          var numberValue = Validator.addNumber(this.innerHTML, self.screenContainer.value);
          if (numberValue) {self.screenContainer.value = numberValue;}
        });
      }

      for ( var i = 0, l = this.arrOperatorButtons.length; i < l; i++ ) {
        this.arrOperatorButtons[i].addEventListener("click", function(){
          if(self.screenResultEvaluated) { self.screenResultEvaluated = false; }
          var screenText = Validator.addOperator(this.innerHTML, self.screenContainer.value);
          if (screenText) {self.screenContainer.value = screenText;}
        });          
      }
      
      this.clearButton.addEventListener("click", function(){
        self.screenContainer.value = Validator.clearScreen();
        self.screenResultEvaluated = false;
      });
      this.dotButton.addEventListener("click", function(){
        if(self.screenResultEvaluated) { self.screenContainer.value = ""; self.screenResultEvaluated = false; }
        var dot = Validator.addDot(self.screenContainer.value);
        if (dot) { self.screenContainer.value += dot; }
      });
      this.calculationButton.addEventListener("click", function(){
        self.screenContainer.value = CalcResult.executeCalc(self.screenContainer.value);
        self.screenResultEvaluated = true;
      });
    };
  };

  return App;
});