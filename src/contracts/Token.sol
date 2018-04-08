pragma solidity ^0.4.11;

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

contract MyToken is Ownable {

    mapping (address => uint256) public balanceOf;
    address public appContract;
    bool public isActive;

    function MyToken() public {
        balanceOf[msg.sender] = 1000000;
        isActive = false;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }

    function setAppContract(address _app) onlyOwner public {
        require(_app != address(0));
        appContract = _app;
        if(!isActive) {
          isActive = true;
        }
    }

    function payment(address _from, uint _value) public returns (bool) {
        require(isActive);
        require(msg.sender == appContract);
        if (balanceOf[_from] >= _value) {
            balanceOf[appContract] += _value;
            balanceOf[_from] -= _value;
            return true;
        }
        else {
            return false;
        }

    }
}
//0x0cDDFD7f85894955D91E5EF7605aC794A7A944E1
