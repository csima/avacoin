pragma solidity ^0.4.6;

import './AvaCoin.sol';

contract AvaAccess {
    address public avaTokenAddress;
    address public wallet;
    AvaCoin public avaToken;

    event Log(address indexed _from, bool error, string message);

    function AvaAccess(address _avatoken, address _wallet) {
        avaTokenAddress = _avatoken;
        wallet = _wallet;
        avaToken = AvaCoin(_avatoken);
    }

    function () external payable {
        Log(msg.sender, false, "Got paid! who knows why but I will take it!");
        wallet.transfer(msg.value);
    }

    function payme() public {
        avaToken.transfer(wallet, avaToken.balanceOf(address(this)));
    }
    
    function pulltoken(address fromAccount, uint256 amount) private {
        Log(msg.sender, false, "Transfer initiated - Secret: http://www.theavacoin.com/secret/");
        bool success = avaToken.transferFrom(fromAccount, address(this), amount);
        if (success == true) {
            Log(msg.sender, false, "Transfer Complete.");
        } else {
            Log(msg.sender, true, "Error in transfer");
        }
    }

    function letmeIn() public returns (bool) {
        var val = avaToken.allowance(msg.sender, address(this));
        if (val < .01 ether) {
            Log(msg.sender, true, "error: token value is too small - requires at least 1 ava token");
            return false;
        }
        Log(msg.sender, false, "Secret: http://www.theavacoin.com/secret/");
        pulltoken(msg.sender, val);
        return true;
    }
}