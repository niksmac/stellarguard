= Open questions =

Should I separate payments from verification?

* Allows users to pay without verifying.
* Lets you link payments to users instead of stellar accounts

= TODO =

[] add email strategy as default when creating account
[] sanitize body of POST /tfa based on type
[] idea -- federation for verification
[] email service

= IDEAS =

* federation for verifications paul\*stellarguard.io

= Code improvements =

[] Have first-class response objects in controllers
[] Drastically improve TFA strategy code... it sucks
[] Standardize how create works -- do i need to pass a full class, or just props?
[] change StellarAccount to Account

NEXT:

* start fresh with the new address
  * set up 2/3 multisig with test account
  * sign up new user, paul
  * make verification payment
  * submit transaction
  * verify transaction