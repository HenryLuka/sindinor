import{A as o}from"./api-vSn2zUNe.js";class g{static async init(){await this.renderPartners(),await this.renderNews(),await this.renderServices(),await this.renderDirectors(),await this.renderGeneral(),this.setupNavigation(),this.setupScrollHeader(),this.setupJoinForm()}static setupScrollHeader(){const t=document.getElementById("navbar");window.addEventListener("scroll",()=>{window.scrollY>50?(t.classList.add("bg-secondary-dark/95","shadow-lg"),t.classList.remove("bg-gradient-to-b","from-secondary-dark/90","to-transparent")):(t.classList.remove("bg-secondary-dark/95","shadow-lg"),t.classList.add("bg-gradient-to-b","from-secondary-dark/90","to-transparent"))})}static async renderDirectors(){const t=await o.getDirectors(),a=document.getElementById("directors-grid");a&&t.length>0&&(a.innerHTML="",t.forEach(e=>{const n=!e.image||e.image.includes("placeholder")?'<div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-3xl border-2 border-transparent group-hover:border-accent-cyan transition-colors"><i class="fas fa-user"></i></div>':`<img src="${e.image}" alt="${e.name}" class="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-accent-cyan transition-colors">`;a.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl flex items-center gap-4 hover:border-accent-cyan transition-colors group">
                        <div class="relative">
                            ${n}
                            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-cyan rounded-full flex items-center justify-center text-primary-dark text-xs font-bold">
                                <i class="fas fa-check"></i>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-heading font-bold text-white text-lg leading-tight mb-1">${e.name}</h4>
                            <p class="text-accent-cyan text-xs font-bold uppercase tracking-widest mb-1">${e.role}</p>
                            <p class="text-gray-500 text-xs">${e.company}</p>
                        </div>
                    </div>
                `}))}static async renderPartners(){const t=await o.getPartners(),a=document.getElementById("partners-grid");if(a&&t.length>0){const n=`<div class="flex gap-16 shrink-0 items-center px-8">${t.map(s=>`
                <a href="parceiro.html?id=${s.id}" class="flex items-center justify-center min-w-[200px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group">
                     ${s.logo?`<img src="${s.logo}" alt="${s.name}" class="h-24 w-auto object-contain">`:`<span class="text-4xl font-black text-gray-500 group-hover:text-white uppercase tracking-tighter transition-colors select-none">${s.name}</span>`}
                </a>
            `).join("")}</div>`;a.innerHTML=new Array(12).fill(n).join(""),a.className="flex items-center w-max animate-marquee md:animate-marquee-slow"}const e=document.querySelector("footer img");e&&(e.onerror=()=>{e.src="assets/favicon.png"},e.src="assets/favicon.png")}static async renderNews(){const t=await o.getNews(),a=document.getElementById("news-grid");a&&t.length>0&&(a.innerHTML="",t.slice(0,3).forEach(r=>{a.innerHTML+=`
                    <a href="/noticia?id=${r.id}" class="block bg-primary-dark rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-glass-border">
                        <div class="h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 relative" style="background-image: url('${r.image_url||r.img||"assets/news-placeholder.jpg"}');">
                             <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded">Logística</span>
                                <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">${r.news_date||r.date||"Recent"}</span>
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-2">${r.title}</h3>
                            <div class="text-sm font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                                Ler Artigo <span class="text-accent-cyan">→</span>
                            </div>
                        </div>
                    </a>
                `}))}static async renderServices(){const t=await o.getServices(),a=document.getElementById("services-grid");a&&t.length>0&&(a.innerHTML="",t.forEach(e=>{const r=e.icon?`<i class="fas ${e.icon} text-4xl text-accent-cyan group-hover:scale-110 transition-transform"></i>`:`<img src="${e.image}" alt="${e.title}" class="w-8 h-8 filter invert group-hover:invert-0 transition-all">`,n=e.icon?`<i class="fas ${e.icon} text-9xl"></i>`:`<img src="${e.image}" class="w-24 h-24 filter invert opacity-50">`;a.innerHTML+=`
                    <a href="servico.html?id=${e.id}" class="bg-secondary-dark rounded-lg p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group shadow-lg block">
                         <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-white">
                            ${n}
                         </div>
                        
                        <div class="relative z-10">
                            <div class="w-14 h-14 bg-accent-cyan/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-cyan/20 transition-colors">
                                ${r}
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4">${e.title}</h3>
                            <p class="text-gray-400 text-sm leading-relaxed mb-6">${e.description}</p>
                            <div class="inline-flex items-center text-accent-cyan font-bold text-sm group-hover:gap-2 transition-all">
                                Saiba Mais <span class="ml-1">→</span>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-transparent"></div>
                    </a>
                `}))}static async renderGeneral(){const t=await o.getGeneral();t&&t.hero}static setupNavigation(){const t=document.querySelectorAll("section"),a=document.querySelectorAll("nav a"),e=document.querySelectorAll("#mobile-menu a"),r=new IntersectionObserver(n=>{n.forEach(s=>{if(s.isIntersecting){const d=s.target.getAttribute("id");a.forEach(i=>{i.classList.remove("text-accent-cyan"),i.classList.add("text-white/90"),i.getAttribute("href")==="#associe-se"&&(i.classList.remove("text-accent-cyan"),i.classList.add("text-accent-cyan"))}),e.forEach(i=>{i.classList.remove("text-accent-cyan"),i.classList.add("text-white"),i.getAttribute("href")==="#associe-se"&&i.classList.add("text-accent-cyan")});const c=document.querySelector(`nav a[href="#${d}"]`);c&&(c.classList.remove("text-white/90"),c.classList.add("text-accent-cyan"));const l=document.querySelector(`#mobile-menu a[href="#${d}"]`);l&&(l.classList.remove("text-white"),l.classList.add("text-accent-cyan"))}})},{threshold:.2,rootMargin:"-10% 0px -50% 0px"});t.forEach(n=>r.observe(n))}static setupJoinForm(){const t=document.getElementById("join-form");t&&t.addEventListener("submit",async a=>{a.preventDefault();const e=t.querySelector('button[type="submit"]'),r=e.innerText,n={company:document.getElementById("join-company").value,cnpj:document.getElementById("join-cnpj").value,city:document.getElementById("join-city").value,name:document.getElementById("join-name").value,role:document.getElementById("join-role").value,phone:document.getElementById("join-phone").value};try{e.innerText="Enviando...",e.disabled=!0,await o.addRequest(n),alert("Solicitação enviada com sucesso! Em breve entraremos em contato."),t.reset(),window.toggleJoinModal&&window.toggleJoinModal()}catch(s){console.error("Error submitting request:",s),alert("Erro ao enviar solicitação. Tente novamente.")}finally{e.innerText=r,e.disabled=!1}})}}document.addEventListener("DOMContentLoaded",()=>{g.init()});
