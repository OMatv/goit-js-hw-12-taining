(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function d(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=d(e);fetch(e.href,r)}})();const u=" https://api.themoviedb.org/3",f="trending/movie/week",p="345007f9ab440e5b86cef51be6397df1";let s=1;const o={container:document.querySelector(".js-movie-list"),loadBtn:document.querySelector(".js-load-more")};o.loadBtn.addEventListener("click",m);c(s).then(t=>{o.container.insertAdjacentHTML("beforeend",l(t.results)),t.page<500&&o.loadBtn.classList.replace("load-more-hidden","load-more")}).catch(t=>alert(t.message));async function c(t=1){const{data:a}=await axios(`${u}${f}`,{params:{api_key:p,page:t}});return a}function l(t){return t.map({id,poster_path,original_title,release_date,vote_average})(`
    <li class="movie-card" data-id="${id}" >
            <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}>
            <div class="movie-info">
            <h2>${original_title}</h2>
            <p>Release Date: ${release_date}</p>
            <p>Vote Average: ${vote_average}</p>
            </div>
        `).join("")}async function m(){s+=1,o.loadBtn.disabled=!0;try{const t=await c(s);o.container.insertAdjacentHTML("beforeend",l(t.results)),o.loadBtn.disabled=!1,t.page>=500&&o.loadBtn.classList.replace("load-more","load-more-hidden")}catch(t){alert(t.message)}}
//# sourceMappingURL=commonHelpers.js.map
