export async function GetLinkInfo(linkId) {
    const apiEndpoint = "https://bipulappstorage.table.core.windows.net/Links?sv=2019-02-02&si=LinksQuery&sig=1l%2B0sOqfUSiraMJeRJLeNfewKwqLO3v3Qn6eqDKr2dU%3D&tn=Links";
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            "Accept": "application/json;odata=nometadata"
        }
    };

    return fetch(apiEndpoint + "&$filter=RowKey%20eq%20'"+ linkId +"'", requestOptions)
        .then(response => response.json())
        .catch(error => console.log(error));
}