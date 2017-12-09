pragma solidity ^0.4.13;

import './AvaCoin.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract AvaCoinCrowdsale is Crowdsale, Ownable {

  function AvaCoinCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet) Crowdsale(_startTime, _endTime, _rate, _wallet) {
  }

  function createTokenContract() internal returns (MintableToken) {
    return new AvaCoin();
  }
  
  function reclaim() public {
    require(msg.sender == owner);
    token.transferOwnership(owner);
  }
}
