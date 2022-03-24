import fetch from 'node-fetch';

// FIRST: sign in as a test user(username: test, password: test)
// You can get a JWT
console.log(`// FIRST: sign in as a test user(username: test, password: test)
// You can get a JWT`)
const testUserFetchResult = await fetch('http://localhost:8000/signin', {
  method: 'post',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username: 'test',
    password: 'test',
  })
});
const testUserJWT = (await testUserFetchResult.json()).token;
console.log(testUserFetchResult.status);
console.log(`Your JWT is: ${testUserJWT}`);

// SECOND: access application server with JWT
console.log(`
// SECOND: access application server with JWT`)
const applicationFetchResultWithJWT = await fetch('http://localhost:9000', {
  method: 'get',
  headers: {
    authorization: `Bearer ${testUserJWT}`
  },
});
const applicationServerResponseTextWithJWT = await applicationFetchResultWithJWT.text();
console.log(applicationFetchResultWithJWT.status);
console.log(`Response: ${applicationServerResponseTextWithJWT}`);

// THIRD: access application server without JWT
console.log(`
// THIRD: access application server without JWT`)
const applicationFetchResultWithoutJWT = await fetch('http://localhost:9000', {
  method: 'get',
});
console.log(`Application Server Status Code: ${applicationFetchResultWithoutJWT.status}`);
