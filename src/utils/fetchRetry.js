//https://blog.bearer.sh/add-retry-to-api-calls-javascript-node/

function fetchRetry(url, options = {}, retries = 5, backoff = 300) {
    /* 1 */
    
    return fetch(url, options)
        .then(res => {
            if (res.ok) return res.json()

            if (retries > 0) {
                setTimeout(() => {
                    /* 2 */
                    return fetchRetry(url, options, retries - 1, backoff * 2) /* 3 */
                }, backoff) /* 2 */
            } else {
                throw new Error(res)
            }
        })
        .catch((error) => {
            console.log(error, "inside the fetchRetry")
        })
}

export default fetchRetry;