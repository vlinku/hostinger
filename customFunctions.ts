function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 11); 
    const emailDomain = "hostinger.com";
    return `${randomString}@${emailDomain}`;
  }

  function accountPassword () {
    'Candidate22!'
  }


module.exports = {
    generateRandomEmail,

  };