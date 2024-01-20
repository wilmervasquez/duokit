import { fetchJSON } from "../dist/request/index.js";

(async function(){
  const {data,error} = await fetchJSON("https://api.github.com/search/repositories?q=javascript")
  console.log(data)
})();