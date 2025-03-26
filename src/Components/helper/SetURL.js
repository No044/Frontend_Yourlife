
function Seturl(type){
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set(`${type.title}`, type.value); 
    window.history.pushState({}, '', currentUrl);
}
export default Seturl

