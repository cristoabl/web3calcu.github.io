/**
 *Submitted for verification at Etherscan.io on 2023-08-01
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator {
    //pure view default

    event OperationHappened(address indexed sender, uint num1, uint num2, uint indexed result);


    function adder(uint num1, uint num2) external returns(uint) {
        uint result = num1+num2;
        emit OperationHappened(msg.sender, num1, num2, result);
        return result;
    }
    function subtracter(uint num1, uint num2) external returns(uint) {
        uint result = num1-num2;
        emit OperationHappened(msg.sender, num1, num2, result);
        return result;
    }
    function multiplier(uint num1, uint num2) external returns(uint) {
        uint result = num1*num2;
        emit OperationHappened(msg.sender, num1, num2, result);
        return result;
    }
    function divider(uint num1, uint num2) external returns(uint) {
        uint result = num1/num2;
        emit OperationHappened(msg.sender, num1, num2, result);
        return result;
    }

}