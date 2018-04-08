pragma solidity ^0.4.11;

interface MyFirstERC20ICO {
    function transfer (address _receiver, uint256 _amount) public;
}
contract MyFirstSafeICO {

    uint public buyPrice;
    MyFirstERC20ICO public token;

    function MyFirstSafeICO(MyFirstERC20ICO _token) public {
        token = _token;
        buyPrice = 1 finney;
    }

    function () payable {
        _buy(msg.sender, msg.value);
    }

    function buy() public payable returns (uint) {
        uint tokens = _buy(msg.sender, msg.value);
        return tokens;
    }

    function _buy(address _sender, uint256 _amount) internal returns (uint) {
        uint tokens = _amount / buyPrice;
        token.transfer(_sender, tokens);
        return tokens;
    }
}
//0x8B167AC7Dcf109355cf48eA4F1567aC8ADDCB9e2
