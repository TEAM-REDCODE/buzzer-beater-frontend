const Upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const Lower = Upper.toLowerCase();

const passowrdVerify = (pw, num) => {
  const specialCharacters = '!@#$%^&*()';

  if (num === 1) {
    return pw.length >= 8;
  } else if (num === 2) {
    for (const char of Array.from(pw)) {
      if (Array.from(Lower).includes(char)) {
        return true;
      }
    }
    return false;
  } else if (num === 3) {
    for (const char of Array.from(pw)) {
      if (Upper.includes(char)) {
        return true;
      }
    }
    return false;
  } else if (num === 4) {
    for (const char of Array.from(pw)) {
      if (specialCharacters.includes(char)) {
        return true;
      }
    }
    return false;
  }
};

export default passowrdVerify