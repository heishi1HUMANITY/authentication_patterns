import fetch from 'node-fetch';

// FIRST: sign in as a test user(username: test, password: test)
// You can get a session id in a cookie
console.log(`// FIRST: sign in as a test user(username: test, password: test)
// You can get a session id in a cookied`)
const testUserFetchResult = await fetch('http://localhost:8000/authenticator/signin', {
  method: 'post',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username: 'test',
    password: 'test',
  })
});
const testUserSessionID = testUserFetchResult.headers.get('set-cookie').split(';')[0];
console.log(testUserFetchResult.status);
console.log(`Your session id is: ${testUserSessionID}`);

// SECOND: access application server with your session id
console.log(`
// SECOND: access application server with your session id`)
const applicationFetchResultwithAuthorizedSessionID = await fetch('http://localhost:8000/app', {
  method: 'get',
  headers: {
    cookie: testUserSessionID,
  },
});
const applicationServerResponseTextWithAuthorizedSessionID = await applicationFetchResultwithAuthorizedSessionID.text();
console.log(`Response: ${applicationServerResponseTextWithAuthorizedSessionID}`);

// THIRD: access application server without session id
console.log(`
// THIRD: access application server without session id`)
const applicationFetchResultAfterSignOut = await fetch('http://localhost:8000/app');
console.log(`Application Server Status Code: ${applicationFetchResultAfterSignOut.status}`);