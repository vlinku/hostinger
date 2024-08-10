function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 11); 
    const emailDomain = "hostinger.com";
    return `${randomString}@${emailDomain}`;
  }


module.exports = {
    generateRandomEmail,

  };