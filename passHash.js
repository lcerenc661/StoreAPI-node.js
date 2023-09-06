const bcrypt = require('bcrypt');

async function hashPass() {
  const myPassword = 'admin123secured';
  // const hash = await bcrypt.hash(myPassword, 10);
  const passHashed = "$2b$10$MAA3Y5id36EEZZcrNVK/hOHxw7dWNDdDHe5mpEF60FOto7P35xXUK";
  const isMatch = await bcrypt.compare(myPassword, passHashed)
  console.log(isMatch);
}

hashPass();
