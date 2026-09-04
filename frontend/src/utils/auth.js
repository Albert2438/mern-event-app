// JWTs are three base64 chunks separated by dots: header.payload.signature
// We only need the middle chunk (payload) - it contains the `exp` claim,
// which is a Unix timestamp (seconds) for when the token expires.
export function isTokenExpired(token) {
  try {
    // atob() decodes base64 -> JSON string; JSON.parse turns it into an object
    const payload = JSON.parse(atob(token.split('.')[1]));

    // exp is in SECONDS, Date.now() is in MILLISECONDS - must multiply by 1000
    return Date.now() >= payload.exp * 1000;
  } catch (err) {
    // if the token is malformed/missing, treat it as expired -> forces logout
    return true;
  }
}