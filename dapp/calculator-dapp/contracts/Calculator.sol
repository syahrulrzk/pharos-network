pragma solidity ^0.8.0;

contract Calculator {
    uint[] private results;
    event EventResult(uint indexed result);

    function add(uint a, uint b) public returns (uint) {
        uint result = a + b;
        results.push(result);
        emit EventResult(result);
        return result;
    }

    function subtract(uint a, uint b) public returns (uint) {
        uint result = a - b;
        results.push(result);
        emit EventResult(result);
        return result;
    }

    function multiply(uint a, uint b) public returns (uint) {
        uint result = a * b;
        results.push(result);
        emit EventResult(result);
        return result;
    }

    function divide(uint a, uint b) public returns (uint) {
        require(b != 0, "Cannot divide by zero");
        uint result = a / b;
        results.push(result);
        emit EventResult(result);
        return result;
    }

    function getResults() public view returns (uint[] memory) {
        return results;
    }
}
