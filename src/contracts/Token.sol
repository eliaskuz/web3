// Указываем версию солидити для компилятора
pragma solidity ^0.4.11;

// Interface
// [{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"value","type":"uint256"}],"name":"payment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_app","type":"address"}],"name":"setAppContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"appContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]

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

    // Создаем mapping - ассоциативный массив, в котором ключом будет адрес, а значением - баланс
    mapping (address => uint256) public balanceOf;
    address public appContract;
    bool internal isActive;

    // Функция для инициализации контракта
    function MyToken() public {

        // Создаем все токены на кошельке того, кто создал токен
        balanceOf[msg.sender] = 1000000;
    }

    // Функция для отправки токенов
    // Фукнция принимает адрес того, кому нужно отправить токены
    // и число токенов, которое мы хотим отправить
    function transfer(address _to, uint256 _value) public {
        // Проверяем хватает ли токенов у того, кто хочет их отправить
        require(balanceOf[msg.sender] >= _value);
        // Проверяем, не произошло ли переполнение
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        // Забираем токены у того, кто их отправил
        balanceOf[msg.sender] -= _value;
        // Передаем токены тому, кому мы их отправили
        balanceOf[_to] += _value;
    }

    function setAppContract(address _app) onlyOwner public {
        require(_app != address(0));
        appContract = _app;
        if(!isActive) {
          isActive = true;
        }
    }

    function payment(address _from, uint value) public returns (bool) {
        require(isActive);
        require(msg.sender == appContract);
        if (balanceOf[_from] >= value) {
            balanceOf[appContract] += value;
            balanceOf[_from] -= value;
            return true;
        }
        else {
            return false;
        }

    }
}