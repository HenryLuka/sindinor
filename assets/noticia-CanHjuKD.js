import{A as l}from"./api-DjC5NM_p.js";class d{static async init(){const a=new URLSearchParams(window.location.search).get("id");if(!a){window.location.href="noticias.html";return}this.showLoading(),await this.loadNews(a),await this.loadSidebar(a)}static showLoading(){document.getElementById("loading").classList.remove("hidden"),document.getElementById("news-content").classList.add("hidden"),document.getElementById("not-found").classList.add("hidden")}static async loadNews(n){const e=(await l.getNews()).find(o=>o.id===n);if(document.getElementById("loading").classList.add("hidden"),!e){document.getElementById("not-found").classList.remove("hidden");return}document.getElementById("news-content").classList.remove("hidden"),document.getElementById("news-title").innerText=e.title,document.getElementById("news-date").innerHTML=`<i class="far fa-calendar mr-2"></i> ${this.formatDate(e.news_date||e.date)}`;const s=document.getElementById("news-image");e.image_url||e.img?s.src=e.image_url||e.img:(s.classList.add("hidden"),s.parentElement.classList.add("hidden"));const i=document.getElementById("news-body");e.content?i.innerHTML=e.content:(i.innerHTML="<p><em>Esta notícia não possui conteúdo textual adicional.</em></p>",e.external_link&&e.external_link!=="#"&&(i.innerHTML+=`
                    <div class="mt-6">
                        <a href="${e.external_link}" target="_blank" class="inline-flex items-center gap-2 text-accent-cyan font-bold hover:underline">
                            Ler na íntegra em fonte externa <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                `));const t=document.getElementById("news-gallery-section"),r=document.getElementById("news-gallery-grid");e.gallery&&e.gallery.length>0?(t.classList.remove("hidden"),t.classList.add("animate-fade-in-up"),r.innerHTML=e.gallery.map(o=>`
                <div class="group relative aspect-square overflow-hidden rounded-xl border border-glass-border cursor-pointer" onclick="window.open('${o}', '_blank')">
                    <img src="${o}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <i class="fas fa-search-plus text-white text-2xl"></i>
                    </div>
                </div>
            `).join("")):t.classList.add("hidden")}static async loadSidebar(n){const a=await l.getNews(),e=document.getElementById("sidebar-news"),s=a.filter(t=>t.id!==n).slice(0,6);if(s.length===0){e.innerHTML='<p class="text-gray-500 text-sm">Nenhuma outra notícia recente.</p>';return}const i=s.map(t=>`
            <a href="noticia.html?id=${t.id}" class="group flex gap-4 items-start block p-2 hover:bg-glass-bg rounded-lg transition-colors">
                <div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-glass-border">
                    <img src="${t.image_url||t.img||"assets/news-placeholder.jpg"}" alt="${t.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div>
                    <span class="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-1 block">
                        ${this.formatDate(t.news_date||t.date)}
                    </span>
                    <h4 class="text-white font-bold text-sm leading-tight group-hover:text-accent-cyan transition-colors line-clamp-3">
                        ${t.title}
                    </h4>
                </div>
            </a>
        `).join("");e.classList.remove("space-y-6"),e.classList.add("h-[400px]","overflow-hidden","relative"),e.innerHTML=`
            <div class="animate-marquee-vertical space-y-6">
                ${i}
                ${i} <!-- Duplicate for seamless loop -->
            </div>
        `}static formatDate(n){if(!n)return"";const a={year:"numeric",month:"long",day:"numeric"};try{const e=new Date(n),s=e.getTimezoneOffset()*6e4;return new Date(e.getTime()+s).toLocaleDateString("pt-BR",a)}catch{return n}}}document.addEventListener("DOMContentLoaded",()=>{d.init()});
