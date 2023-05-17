// SHUNTING YARD ALGORITHM

import Stack from "./stack";
import InfixTokenizer from "@psse-cpu/tokenizer";
import readlineSync from "readline-sync";

const calculation = readlineSync.question("Enter your equation-> ");
const tokens = new InfixTokenizer(calculation);

// set objects for the operators
const powerOperator = {
  sign: "^",
  precedence: 4,
  associativity: "right",
};
const multiplicationOperator = {
  sign: "*",
  precedence: 3,
  associativity: "left",
};
const divisionOperator = {
  sign: "/",
  precedence: 3,
  associativity: "left",
};
const additionOperator = {
  sign: "+",
  precedence: 2,
  associativity: "left",
};
const subtractionOperator = {
  sign: "-",
  precedence: 2,
  associativity: "left",
};

const outputQueue = new Stack();
const operatorStack = new Stack();

// while there are tokens
while (tokens.hasMoreTokens()) {
  // read a token
  const token = tokens.readToken();
  // a number
  if (Number(token)) {
    outputQueue.push(token);
    // a function
  } else if (
    token === "sin" ||
    token === "cos" ||
    token === "tan" ||
    token === "arcsin" ||
    token === "arccos" ||
    token === "arctan" ||
    token === "log" ||
    token === "ln" ||
    token === "sqrt" ||
    token === "cbrt"
  ) {
    operatorStack.push(token);
    // an operator
  } else if (
    token === "*" ||
    token === "/" ||
    token === "+" ||
    token === "-" ||
    token === "^"
  ) {
    // set a variable
    let o2 = operatorStack.peek();

    // token precedence
    let tokenPrecedence: number = 0;
    // token associativity
    let tokenAssociativity: string = "left";
    // to let the computer know the operator sign, precedence and associativity
    if (powerOperator.sign === token) {
      // set token precedence using operator.precedence
      tokenPrecedence = powerOperator.precedence;
      // set token associativity using operator.associativity
      tokenAssociativity = powerOperator.associativity;
    } else if (multiplicationOperator.sign === token) {
      tokenPrecedence = multiplicationOperator.precedence;
      tokenAssociativity = multiplicationOperator.associativity;
    } else if (divisionOperator.sign === token) {
      tokenPrecedence = divisionOperator.precedence;
      tokenAssociativity = divisionOperator.associativity;
    } else if (additionOperator.sign === token) {
      tokenPrecedence = additionOperator.precedence;
      tokenAssociativity = additionOperator.associativity;
    } else if (subtractionOperator.sign === token) {
      tokenPrecedence = subtractionOperator.precedence;
      tokenAssociativity = subtractionOperator.associativity;
    }

    // top of operator stack
    // o2 precedence
    let o2Precedence: number = 0;
    // o2 associativity
    let o2Associativity: string = "left";

    if (powerOperator.sign === operatorStack.peek()) {
      // set o2 precedence using operator.precedence
      o2Precedence = powerOperator.precedence;
      o2Associativity = powerOperator.associativity;
    } else if (multiplicationOperator.sign === operatorStack.peek()) {
      o2Precedence = multiplicationOperator.precedence;
      o2Associativity = multiplicationOperator.associativity;
    } else if (divisionOperator.sign === operatorStack.peek()) {
      o2Precedence = divisionOperator.precedence;
      o2Associativity = divisionOperator.associativity;
    } else if (additionOperator.sign === operatorStack.peek()) {
      o2Precedence = additionOperator.precedence;
      o2Associativity = additionOperator.associativity;
    } else if (subtractionOperator.sign === operatorStack.peek()) {
      o2Precedence = subtractionOperator.precedence;
      o2Associativity = subtractionOperator.associativity;
    }

    if (
      token === "*" ||
      token === "/" ||
      token === "+" ||
      token === "-" ||
      token === "^"
    ) {
      if (
        o2Precedence > tokenPrecedence ||
        (o2Precedence === tokenPrecedence && tokenAssociativity === "left")
      ) {
        outputQueue.push(operatorStack.pop());
      }
    }
    operatorStack.push(token);
    // a left parenthesis
  } else if (token === "(") {
    operatorStack.push(token);
    // a right parenthesis
  } else if (token === ")") {
    let o2 = operatorStack.peek();

    if (o2 !== "(") {
      if (!operatorStack.isEmpty()) {
        outputQueue.push(operatorStack.pop());
      }
      // there is a function token
      if (
        o2 === "sin" ||
        o2 === "cos" ||
        o2 === "tan" ||
        o2 === "arcsin" ||
        o2 === "arccos" ||
        o2 === "arctan" ||
        o2 === "log" ||
        o2 === "ln" ||
        o2 === "sqrt" ||
        o2 === "cbrt"
      ) {
        outputQueue.push(operatorStack.pop());
      }
      o2 = operatorStack.peek;
    }
  }
}
// there are tokens in the operator stack
while (tokens.hasMoreTokens()) {
  let o2 = operatorStack.peek();
  if (o2 === "(") {
    operatorStack.pop();
  }
  // outputQueue.push(operatorStack.pop()) --> use to check the shunting yard
  // exchange to make the rpn read and solve the tokens in the operatorstack
  operatorStack.push(outputQueue.pop());
}

// console.log(outputQueue)

// evaluation of RPN using stack
const solver = new Stack<number>();

// operatorstack is not empty
while (!operatorStack.isEmpty()) {
  // token in the operatorstack
  const rpn = operatorStack.pop();

  // if number
  if (Number(rpn)) {
    solver.push(Number(rpn));
  }

  // if operator
  if (rpn === "*" || rpn === "/" || rpn === "+" || rpn === "-" || rpn === "^") {
    // set a variable to read a number
    let a = Number(solver.pop());
    let b = Number(solver.pop());

    if (rpn === "*") {
      solver.push(b * a);
    } else if (rpn === "/") {
      solver.push(b / a);
    } else if (rpn === "+") {
      solver.push(b + a);
    } else if (rpn === "-") {
      solver.push(b - a);
    } else if (rpn === "^") {
      solver.push(Math.pow(b, a));
    }
  }

  // if functions
  if (
    rpn === "sin" ||
    rpn === "cos" ||
    rpn === "tan" ||
    rpn === "arcsin" ||
    rpn === "arccos" ||
    rpn === "arctan" ||
    rpn === "log" ||
    rpn === "ln" ||
    rpn === "sqrt" ||
    rpn === "cbrt"
  ) {
    // set a variable to read a number
    let c = Number(solver.pop());

    if (rpn === "sin") {
      solver.push(Math.sin(c));
    } else if (rpn === "cos") {
      solver.push(Math.cos(c));
    } else if (rpn === "tan") {
      solver.push(Math.tan(c));
    } else if (rpn === "arcsin") {
      solver.push(Math.asin(c));
    } else if (rpn === "arccos") {
      solver.push(Math.acos(c));
    } else if (rpn === "arctan") {
      solver.push(Math.atan(c));
    } else if (rpn === "log" || rpn === "ln") {
      solver.push(Math.log(c));
    } else if (rpn === "sqrt") {
      solver.push(Math.sqrt(c));
    } else if (rpn === "cbrt") {
      solver.push(Math.cbrt(c));
    }
  }
}
console.log("The answer is: ", solver.peek());
