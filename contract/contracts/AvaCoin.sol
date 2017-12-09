pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract AvaCoin is MintableToken {
  string public name = "AVA COIN";
  string public symbol = "AVA";
  uint256 public decimals = 18;
}

