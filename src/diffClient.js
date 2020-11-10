export async function fetchDiff(diffRequest) {
    let diffResponse = await fetch('https://work-diff.azurewebsites.net/diff', {
        method: 'POST',
        body: JSON.stringify(diffRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await diffResponse.json()
}
