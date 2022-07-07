module.exports = {
  // 2xx
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  // 3xx
  NOT_MODIFIED: 304,

  // 4xx
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  UNPROCESSABLE_ENTITY: 422,
  UPGRADE_REQUIRED: 426,
  RATE_LIMITE: 429, // https://documentation.mailgun.com/en/latest/api-sending.html#error-codes

  // 5xx
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
};

// 200 - OK -> Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action
// 201 - Created -> The request has been fulfilled, resulting in the creation of a new resource
// 202 - Accepted -> The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs

// 400 - Bad Request -> The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)
// 401 - Unauthorized -> Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided
// 402 - Payment Required -> Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed, for example, by GNU Taler,[34] but that has not yet happened, and this code is not widely used. Google Developers API uses this status if a particular developer has exceeded the daily limit on requests
// 403 - Forbidden -> The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed)
// 404 - Not Found -> The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible
// 422 - Unprocessable Entity -> status code means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions. For example, this error condition may occur if an XML request body contains well-formed (i.e., syntactically correct), but semantically erroneous, XML instructions

// 500 - Internal Server Error -> A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
// 501 - Not Implemented -> The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API)
// 503 - Service Unavailable -> The best HTTP status code for your maintenance page is "503 Service Unavailable": The server is currently unable to handle the request due to a temporary overloading or maintenance of the server. The implication is that this is a temporary condition which will be alleviated after some delay.
