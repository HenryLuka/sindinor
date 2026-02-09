import{A as d}from"./api-BYJfvy6u.js";class g{static async init(){await this.renderPartners(),await this.renderNews(),await this.renderServices(),await this.renderDirectors(),await this.renderGeneral(),this.setupNavigation(),this.setupScrollHeader(),this.setupJoinForm()}static setupScrollHeader(){const t=document.getElementById("navbar");window.addEventListener("scroll",()=>{window.scrollY>50?(t.classList.add("bg-secondary-dark/95","shadow-lg"),t.classList.remove("bg-gradient-to-b","from-secondary-dark/90","to-transparent")):(t.classList.remove("bg-secondary-dark/95","shadow-lg"),t.classList.add("bg-gradient-to-b","from-secondary-dark/90","to-transparent"))})}static async renderDirectors(){const t=await d.getDirectors(),o=document.getElementById("directors-grid");if(o&&t.length>0){o.innerHTML="";const r={1:{name:"Antonio Henrique Sapori",role:"Presidente",company:"RODONASA CARGAS E ENCOMENDAS LTDA."},2:{name:"Lucio Bento Fagundes Junior",role:"Secretário",company:"RÁPIDO MONTES CLAROS E FERNANDO SOARES MOTA - ME."},3:{name:"Paulo Roberto de Almeida",role:"Tesoureiro",company:"TRANSPORTADORA JANUÁRIA"},4:{name:"Antonio Sapori",role:"Conselho Fiscal Efetivo",company:"TRANSNORTE CARGAS E ENCOMENDAS LTDA."},5:{name:"Jorge Antonio dos Santos",role:"Conselho Fiscal Efetivo",company:"JLSI Logística e Transportes Ltda.-ME"},6:{name:"Antonio Henrique Sapori Filho",role:"Conselho Fiscal Suplente",company:"PRAMINAS LOG TRANSPORTES LTDA."}},e=t.map(a=>{const s=r[a.id];return s?{...a,...s}:a});e.sort((a,s)=>parseInt(a.id)-parseInt(s.id)),e.forEach(a=>{const c=!a.image||a.image.includes("placeholder")?'<div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-3xl border-2 border-transparent group-hover:border-accent-cyan transition-colors"><i class="fas fa-user"></i></div>':`<img src="${a.image}" alt="${a.name}" class="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-accent-cyan transition-colors">`;o.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl flex items-center gap-4 hover:border-accent-cyan transition-colors group">
                        <div class="relative">
                            ${c}
                            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-cyan rounded-full flex items-center justify-center text-primary-dark text-xs font-bold">
                                <i class="fas fa-check"></i>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-heading font-bold text-white text-lg leading-tight mb-1">${a.name}</h4>
                            <p class="text-accent-cyan text-xs font-bold uppercase tracking-widest mb-1">${a.role}</p>
                            <p class="text-gray-500 text-xs">${a.company}</p>
                        </div>
                    </div>
                `})}}static async renderPartners(){const t=await d.getPartners(),o=document.getElementById("partners-grid");if(o&&t.length>0){const a=`<div class="flex gap-16 shrink-0 items-center px-8">${t.map(s=>`
                <a href="parceiro.html?id=${s.id}" class="flex items-center justify-center min-w-[200px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group">
                     ${s.logo?`<img src="${s.logo}" alt="${s.name}" class="h-24 w-auto object-contain">`:`<span class="text-4xl font-black text-gray-500 group-hover:text-white uppercase tracking-tighter transition-colors select-none">${s.name}</span>`}
                </a>
            `).join("")}</div>`;o.innerHTML=new Array(12).fill(a).join(""),o.className="flex items-center w-max animate-marquee md:animate-marquee-slow"}const r=document.querySelector("footer img");r&&(r.onerror=()=>{r.src="assets/favicon.png"},r.src="assets/favicon.png")}static formatDate(t){if(!t)return"RECENTE";if(t.match(/^\d{4}-\d{2}-\d{2}$/)){const[o,r,e]=t.split("-");return`${e}/${r}/${o}`}return t}static async renderNews(){const t=await d.getNews(),o=document.getElementById("news-grid");o&&t.length>0&&(o.innerHTML="",t.slice(0,3).forEach(e=>{o.innerHTML+=`
                    <a href="/noticia?id=${e.id}" class="block bg-primary-dark rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-glass-border">
                        <div class="h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 relative" style="background-image: url('${e.image_url||e.img||"assets/news-placeholder.jpg"}');">
                             <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded">Logística</span>
                                <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">${g.formatDate(e.news_date||e.date)}</span>
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-2">${e.title}</h3>
                            <div class="text-sm font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                                Ler Artigo <span class="text-accent-cyan">→</span>
                            </div>
                        </div>
                    </a>
                `}))}static async renderServices(){const t=await d.getServices(),o=document.getElementById("services-grid");if(o&&t.length>0){o.innerHTML="";const r={"Registro RNTRC (ANTT)":{description:"O Sindinor é credenciado junto à Agência Nacional de Transportes Terrestres (ANTT) para realização do Registro e Recadastramento Nacional de Transportador Rodoviário de Cargas (RNTRC).",contact_info:{title:"Mais informações:",phone:"(38) 3321-9110 / (38) 99985-3216",email:"ercadastro@gmail.com.br",contact:"Edson Ricardo"},logos:["/assets/antt-logo.jpg","/assets/rntrc-logo.jpg"]},"Programa Despoluir":{description:"O Despoluir é um Programa Ambiental de Transporte que objetiva a redução de emissões de poluentes. Gratuitamente, as empresas associadas Sindinor podem aferir sua frota.",extra_description:'Os veículos aprovados recebem o <strong class="text-white">Selo Verde Despoluir</strong> e empresas de destaque concorrem ao Prêmio Melhor Ar, promovido pelo Fetcemg.'},"Consultoria Técnica":{description:"O Sindinor oferece assessoria econômica para auxiliar na elaboração de planilhas de custos, formação de preços e fornecimento de indicadores econômicos atualizados.",extra_description:"Seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e Lotação, garantindo competitividade e sustentabilidade ao negócio."},"Consultoria Técnica e Econômica":{description:"O Sindinor oferece assessoria econômica para auxiliar na elaboração de planilhas de custos, formação de preços e fornecimento de indicadores econômicos atualizados.",extra_description:"Seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e Lotação, garantindo competitividade e sustentabilidade ao negócio."}};t.forEach(e=>{const a=r[e.title],s=a&&e.description.length<50?a.description:e.description,c=e.extra_description||(a?a.extra_description:""),i=e.contact_info||(a?a.contact_info:null),l=e.logos&&e.logos.length>0?e.logos:a?a.logos:[];let n="";l&&l.length>0?n=`
                        <div class="flex gap-4 items-center">
                            ${l.map(m=>`<img src="${m.startsWith("/")?m:`/${m}`}" alt="Logo" class="h-12 w-auto bg-white p-1 rounded shadow-sm">`).join("")}
                        </div>
                    `:e.icon?n=`<i class="fas ${e.icon} text-4xl text-accent-cyan group-hover:scale-110 transition-transform"></i>`:n=`<img src="${e.image}" alt="${e.title}" class="w-8 h-8 filter invert group-hover:invert-0 transition-all">`;let p="";i&&(p=`
                        <div class="bg-primary-dark/50 p-4 rounded border border-white/10 text-xs text-gray-400 space-y-2 mt-auto">
                            <p class="font-bold text-accent-cyan mb-1">${i.title}</p>
                            <p><i class="fas fa-phone mr-2 text-accent-cyan"></i>${i.phone}</p>
                            <p><i class="fas fa-envelope mr-2 text-accent-cyan"></i>${i.email}</p>
                            <p><i class="fas fa-user mr-2 text-accent-cyan"></i>${i.contact}</p>
                        </div>
                    `);const u=c?`<p class="text-gray-400 text-sm leading-relaxed mb-6">${c}</p>`:"",f=e.icon?`<i class="fas ${e.icon} text-9xl"></i>`:`<img src="${e.image}" class="w-24 h-24 filter invert opacity-50">`;o.innerHTML+=`
                    <a href="servico.html?id=${e.id}" class="bg-secondary-dark rounded-lg p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group shadow-lg border border-white/5 flex flex-col h-full block">
                         <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-white">
                            ${f}
                         </div>
                        
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="w-auto h-14 rounded-lg flex items-center mb-6">
                                ${n}
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4">${e.title}</h3>
                            <p class="text-gray-400 text-sm leading-relaxed mb-4">${s}</p>
                            ${u}
                            ${p}
                            
                            <div class="mt-8 inline-flex items-center text-accent-cyan font-bold text-sm group-hover:gap-2 transition-all">
                                Saiba Mais <span class="ml-1">→</span>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-transparent"></div>
                    </a>
                `})}}static async renderGeneral(){const t=await d.getGeneral();t&&t.hero}static setupNavigation(){const t=document.querySelectorAll("section"),o=document.querySelectorAll("nav a"),r=document.querySelectorAll("#mobile-menu a"),e=new IntersectionObserver(a=>{a.forEach(s=>{if(s.isIntersecting){const c=s.target.getAttribute("id");o.forEach(n=>{n.classList.remove("text-accent-cyan"),n.classList.add("text-white/90"),n.getAttribute("href")==="#associe-se"&&(n.classList.remove("text-accent-cyan"),n.classList.add("text-accent-cyan"))}),r.forEach(n=>{n.classList.remove("text-accent-cyan"),n.classList.add("text-white"),n.getAttribute("href")==="#associe-se"&&n.classList.add("text-accent-cyan")});const i=document.querySelector(`nav a[href="#${c}"]`);i&&(i.classList.remove("text-white/90"),i.classList.add("text-accent-cyan"));const l=document.querySelector(`#mobile-menu a[href="#${c}"]`);l&&(l.classList.remove("text-white"),l.classList.add("text-accent-cyan"))}})},{threshold:.2,rootMargin:"-10% 0px -50% 0px"});t.forEach(a=>e.observe(a))}static setupJoinForm(){const t=document.getElementById("join-form");t&&t.addEventListener("submit",async o=>{o.preventDefault();const r=t.querySelector('button[type="submit"]'),e=r.innerText,a={company:document.getElementById("join-company").value,cnpj:document.getElementById("join-cnpj").value,city:document.getElementById("join-city").value,name:document.getElementById("join-name").value,role:document.getElementById("join-role").value,phone:document.getElementById("join-phone").value,message:document.getElementById("join-message").value};try{r.innerText="Enviando...",r.disabled=!0,await d.addRequest(a),alert("Solicitação enviada com sucesso! Em breve entraremos em contato."),t.reset(),window.toggleJoinModal&&window.toggleJoinModal()}catch(s){console.error("Error submitting request:",s),alert("Erro ao enviar solicitação. Tente novamente.")}finally{r.innerText=e,r.disabled=!1}})}}document.addEventListener("DOMContentLoaded",()=>{g.init()});
