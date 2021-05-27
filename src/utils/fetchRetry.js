//the purpose of fetchRetry is to handle how we deal with API call fails
//https://blog.bearer.sh/add-retry-to-api-calls-javascript-node/

/**
 * Retries fetch up to 3 times with delay doubling on each retry.
 * @param {string} url 
 * @param {function} failureCallback 
 * @param {number} retries default: 3
 * @param {number} backoff  default: 300ms
 * @returns 
 */
function fetchRetry(url, failureCallback, retries = 3, backoff = 300 ) {
            
    return fetch(url)
        .then(res => {
            if (res.ok) return res.json()

            if (retries > 0) {
                setTimeout(() => {
                    /* 2 */
                    return fetchRetry(url,failureCallback, retries - 1, backoff * 2) /* 3 */
                }, backoff) /* 2 */
            } else {
                throw new Error(res)
            }
        })
        .catch((error) => {            
            if (failureCallback) {                
                failureCallback();
            }            
        })
}

export default fetchRetry;