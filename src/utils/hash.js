const bcrypt = require('bcryptjs');

const password = 'pruebaweb1'; // Cambia esto por la contraseña que quieras hashear

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash generado:', hash);
});