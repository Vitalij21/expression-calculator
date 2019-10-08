function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here

    const operatorParser = (exp, operator) => {
        let array = [];
        let braces = 0;
        let resultString = "";
        for (let i = 0; i < exp.length; ++i) {
            const chunk = exp[i];
            if (chunk === '(') {
                braces++;
            } else if (chunk === ')') {
                braces--;
            }
            if (braces === 0 && operator === chunk) {
                array.push(resultString);
                resultString = "";
            } else resultString += chunk;
        }
        if (resultString !== "") {
            array.push(resultString);
        }
        return array;
    };
    
    
    const devisionParser = (expression) => {
        let array = operatorParser(expression, '/');
        let numbersArray = array.map(noStr => {
            if (noStr[0] === '(') {
                const expr = noStr.substr(1, noStr.length - 2);
                return plusParser(expr);
            }
            return +noStr;
        });
    
        return numbersArray.reduce((acc, no) => {
    
            if(no!==0){
                return acc / no;
            }
            else throw new TypeError("Division by zero.");
        });
    };
    
    
    const multiplicationParser = (expression) => {
        let array = operatorParser(expression, "*");
        let numbersArray = array.map(noStr => devisionParser(noStr));
        let initialValue = 1.0;
        return numbersArray.reduce((acc, no) => acc * no, initialValue);
    };
    
    
    const minusParser = (exp) => {
        let array = operatorParser(exp, '-');
        let numbersArray = array.map(arrayElement => multiplicationParser(arrayElement));
        let initialValue = numbersArray[0];
        return numbersArray.slice(1).reduce((acc, no) => acc - no, initialValue);
    };
    
    
    const plusParser = (exp) => {
        let array = operatorParser(exp, '+');
        let numbersArray = array.map(arrayElement => minusParser(arrayElement));
        let initialValue = 0.0;
        return  numbersArray.reduce((acc, no) => acc + no, initialValue);
    };

    return plusParser(expr.replace(/\s/g, ''));

}

module.exports = {
    expressionCalculator
}