const bcrypt = require('bcrypt');

const password ="qwerty";

let encryptedPassword = "initial"; // the value will eventually be replaced with the encryption of "qwerty"

// hashing can either be made with callbacks, or with a chain of .then-s
// 1. Encryption using a chain of .then-s
bcrypt.hash(password, 10)
.then( hash => {
  try {
    encryptedPassword = hash;
  }
  catch (err) { throw err }
})

// encryption is done above. Below we are performing a comparison. It is usually made when a user tries to sign in
// the sole reason of chaining .then-s below to the encryption above is to make sure the passwords are not compared BEFORE an encrypted password is actually generated. That's due to the async nature of bcrypt operations

.then( () => {
  return bcrypt.compare(password, encryptedPassword)
})

.then (function(same) {  
  try {    
    if (same === true) console.log(true);
    else console.log(false);
  }
  catch (err) { throw err }
})


// 2.  Encryption using callback functions
/*
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  encryptedPassword = hash;
  console.log(encryptedPassword);
  return(encryptedPassword);
});
}

bcrypt.compare(password, encryptedPassword, (err, same) => {
  if (err) throw err;
  if (same === true) console.log(true);
  else console.log(false);
});

*/