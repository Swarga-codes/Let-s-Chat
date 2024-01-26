async function fetchSearchResults(query:string){
    if(!query) return []
    const response=await fetch(`http://localhost:3000/api/search/users/${query}`)
    const data=await response.json()
    return data
}


export {fetchSearchResults}