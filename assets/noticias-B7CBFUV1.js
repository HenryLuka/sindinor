import{A as r}from"./api-CnxUr71a.js";class s{static async init(){await this.renderAllNews()}static async renderAllNews(){const a=await r.getNews(),t=document.getElementById("news-grid-full");if(t){if(a.length===0){t.innerHTML=`
                    <div class="col-span-full py-20 text-center">
                        <p class="text-gray-500 uppercase tracking-widest text-xs">Nenhuma notícia encontrada.</p>
                    </div>
                `;return}t.innerHTML="",a.forEach(e=>{t.innerHTML+=`
                    <article class="bg-secondary-dark rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-2xl border border-glass-border">
                        <div class="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 relative" style="background-image: url('${e.image_url||e.img||"assets/news-placeholder.jpg"}');">
                             <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                             <div class="absolute top-4 left-4">
                                <span class="bg-accent-cyan text-primary-dark text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded shadow-lg">Setor Logístico</span>
                             </div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-accent-cyan text-xs font-bold uppercase tracking-widest"><i class="far fa-calendar-alt mr-1"></i> ${e.news_date||e.date||"Recente"}</span>
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-6 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-3">${e.title}</h3>
                            <a href="${e.external_link||e.link||"#"}" target="_blank" class="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-accent-cyan transition-colors border-b-2 border-accent-cyan/20 pb-1 hover:border-accent-cyan">
                                Ler Matéria Completa <i class="fas fa-arrow-right text-xs"></i>
                            </a>
                        </div>
                    </article>
                `})}}}document.addEventListener("DOMContentLoaded",()=>{s.init()});
