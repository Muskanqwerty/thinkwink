const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'musk123';


bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        return hash;
    });
});

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    return hash;
});