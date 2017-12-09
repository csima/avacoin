# Ava Coin
ICO for Ava Coin

This entire project started out as a way to learn more about blockchain and in turn crypto currencies. Everybody has an ICO these days my new daughter might as well have one too! Thus Ava Coin was born! Hey what other newborn has their own crypto currency? Plus you can trade avacoin in for great photos and videos of her.. that is very much worth it.

Although the code is not much (please no comments, it is ugly) what I did learn is that understanding the intricacies of building an app and deploying it can be quite complicated. Nothing works as it should and doing a straight deploy from a testnet to other testnets do not work. Also to be blunt, blockchain sucks for app development. It's buggy, slow, not scaleable and is hard as hell to debug. I digress, here are my pointers for figuring this stuff out to do it yourself.

- Auth0 has the best written introduction to ethereum and blockchain I have found: https://auth0.com/blog/an-introduction-to-ethereum-and-smart-contracts/
- Go code some tutorials - here is the list of the most helpful https://groups.diigo.com/group/cryptodev
- This code uses truffle framework for development (http://truffleframework.com/) but I ended up deploying to main net with Parity
- Gas is a PIA. Read this (https://hudsonjameson.com/2017-06-27-accounts-transactions-gas-ethereum/)
- This guy has started a great walkthru on low level networking - I'm going to do this next (https://ocalog.com/post/10/)

# Code
The code is pretty simple. 
/contract - is the truffle deployment folder. All contracts, migrations etc 
/website - is the avacoin crowdsale website. The frontend.

## Important Files
