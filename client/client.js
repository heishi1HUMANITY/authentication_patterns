import fetch from 'node-fetch';

// FIRST: sign in as a test user(username: test, password: test)
// You can get a session id in a cookie
console.log(`// FIRST: sign in as a test user(username: test, password: test)
// You can get a session id in a cookied`)
const testUserFetchResult = await fetch('http://localhost:8000/signin', {
  method: 'post',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'administer',
  })
});
const testUserSessionID = testUserFetchResult.headers.get('set-cookie').split(';')[0];
console.log(testUserFetchResult.status);
console.log(`Your session id is: ${testUserSessionID}`);

// SECOND: access application server with your session id
console.log(`
// SECOND: access application server with your session id`)
const applicationFetchResultwithAuthorizedSessionID = await fetch('http://localhost:9000', {
  method: 'get',
  headers: {
    cookie: testUserSessionID,
  },
});
const applicationServerResponseTextWithAuthorizedSessionID = await applicationFetchResultwithAuthorizedSessionID.text();
console.log(`Response: ${applicationServerResponseTextWithAuthorizedSessionID}`);

// THIRD: sign out and access application server
console.log(`
// THIRD: sign out and access application server`)
const signoutResult = await fetch('http://localhost:8000/signout', {
  method: 'get',
  headers: {
    cookie: testUserSessionID,
  },
});
console.log(signoutResult.status);
const applicationFetchResultAfterSignOut = await fetch('http://localhost:9000', {
  method: 'get',
  headers: {
    cookie: testUserSessionID,
  },
});
console.log(`Application Server Status Code: ${applicationFetchResultAfterSignOut.status}`);
