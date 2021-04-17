export async function fetchDiff(diffRequest) {
    let diffResponse = await fetch('https://wd.lozo.no/work-diff', {
        method: 'POST',
        body: JSON.stringify(diffRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await diffResponse.json()
}
