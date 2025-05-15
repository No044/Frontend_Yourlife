
function GetUrl(value){
    const params = new URLSearchParams(window.location.search)
    value = params.get(value)
    return value
}
export default GetUrl

