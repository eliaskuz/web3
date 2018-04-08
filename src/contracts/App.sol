pragma solidity ^0.4.11;

interface AppToken {
    function payment(address _from, uint value) public returns (bool);
}

contract Ownable {
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function Ownable() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract App is Ownable {

    string public message;
    address public lastDonator;
    AppToken public token;
    uint public price = 10;
    uint public likes = 0;

    function App(AppToken _token) {
        token = _token;
    }

    function setPrice(uint _price) onlyOwner public {
        price = _price;
    }

    function setMessage(string _message) public returns (bool) {
        if (token.payment(msg.sender, price)) {
            message = _message;
            likes += 1;
            lastDonator = msg.sender;
            return true;
        }
        else {
            return false;
        }
    }
}
//0xb1CC15c45d9b96B17a961BC364C8a5bc55fA2b29
