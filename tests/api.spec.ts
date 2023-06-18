import { request, APIRequestContext, test, expect } from '@playwright/test';

// these need to be stored in an .env file
const baseUrl = "https://restcountries.com";
const apiVersion = "/v3.1";
const apiPathParam = "/name";

test('get info for valid country returns 200', async ({ request }) => {
    const response = await request.get(
        `${baseUrl}${apiVersion}${apiPathParam}/romania`
    )
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(body[0].name.common).toBe("Romania");
});

test('get info for invalid country returns 404', async ({ request }) => {
    const response = await request.get(
        `${baseUrl}${apiVersion}${apiPathParam}/romania-invalid`
    )
    expect(response.status()).toBe(404);
    const body = await response.json();
    console.log(JSON.stringify(body));
    expect(body.message).toBe("Not Found");
});
