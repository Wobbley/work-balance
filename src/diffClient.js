export async function fetchDiff(diffRequest) {
    let diffResponse = await fetch('https://work-diff-function-20201213121219640.azurewebsites.net/api/diff', {
        method: 'POST',
        body: JSON.stringify(diffRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await diffResponse.json()
}
