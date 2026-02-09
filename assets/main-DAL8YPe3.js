import{A as d}from"./api-C4wM4lTA.js";class g{static async init(){await this.renderPartners(),await this.renderNews(),await this.renderServices(),await this.renderDirectors(),await this.renderGeneral(),this.setupNavigation(),this.setupScrollHeader(),this.setupJoinForm()}static setupScrollHeader(){const a=document.getElementById("navbar");window.addEventListener("scroll",()=>{window.scrollY>50?(a.classList.add("bg-secondary-dark/95","shadow-lg"),a.classList.remove("bg-gradient-to-b","from-secondary-dark/90","to-transparent")):(a.classList.remove("bg-secondary-dark/95","shadow-lg"),a.classList.add("bg-gradient-to-b","from-secondary-dark/90","to-transparent"))})}static async renderDirectors(){const a=await d.getDirectors(),r=document.getElementById("directors-grid");if(r&&a.length>0){r.innerHTML="";const n={1:{name:"Antonio Henrique Sapori",role:"Presidente",company:"RODONASA CARGAS E ENCOMENDAS LTDA."},2:{name:"Lucio Bento Fagundes Junior",role:"Secretário",company:"RÁPIDO MONTES CLAROS E FERNANDO SOARES MOTA - ME."},3:{name:"Paulo Roberto de Almeida",role:"Tesoureiro",company:"TRANSPORTADORA JANUÁRIA"},4:{name:"Antonio Sapori",role:"Conselho Fiscal Efetivo",company:"TRANSNORTE CARGAS E ENCOMENDAS LTDA."},5:{name:"Jorge Antonio dos Santos",role:"Conselho Fiscal Efetivo",company:"JLSI Logística e Transportes Ltda.-ME"},6:{name:"Antonio Henrique Sapori Filho",role:"Conselho Fiscal Suplente",company:"PRAMINAS LOG TRANSPORTES LTDA."}},t=a.map(e=>{const o=n[e.id];return o?{...e,...o}:e});t.sort((e,o)=>{const c=e.order!==void 0?e.order:parseInt(e.id)||9999,i=o.order!==void 0?o.order:parseInt(o.id)||9999;return c-i}),t.forEach(e=>{const c=!e.image||e.image.includes("placeholder")?'<div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-3xl border-2 border-transparent group-hover:border-accent-cyan transition-colors"><i class="fas fa-user"></i></div>':`<img src="${e.image}" alt="${e.name}" class="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-accent-cyan transition-colors">`;r.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl flex items-center gap-4 hover:border-accent-cyan transition-colors group">
                        <div class="relative">
                            ${c}
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
                `})}}static async renderPartners(){const a=await d.getPartners(),r=document.getElementById("partners-grid");if(r&&a.length>0){const e=`<div class="flex gap-16 shrink-0 items-center px-8">${a.map(o=>`
                <a href="#" class="flex items-center justify-center min-w-[200px] opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer group">
                     ${o.logo?`<img src="${o.logo}" alt="${o.name}" class="h-24 w-auto object-contain">`:`<span class="text-4xl font-black text-white uppercase tracking-tighter transition-colors select-none">${o.name}</span>`}
                </a>
            `).join("")}</div>`;r.innerHTML=new Array(12).fill(e).join(""),r.className="flex items-center w-max animate-marquee md:animate-marquee-slow"}const n=document.querySelector("footer img");n&&(n.onerror=()=>{n.src="assets/favicon.png"},n.src="assets/favicon.png")}static formatDate(a){if(!a)return"RECENTE";if(a.match(/^\d{4}-\d{2}-\d{2}$/)){const[r,n,t]=a.split("-");return`${t}/${n}/${r}`}return a}static async renderNews(){const a=await d.getNews(),r=document.getElementById("news-grid");r&&a.length>0&&(r.innerHTML="",a.slice(0,3).forEach(t=>{r.innerHTML+=`
                    <a href="/noticia?id=${t.id}" class="block bg-primary-dark rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-glass-border">
                        <div class="h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 relative" style="background-image: url('${t.image_url||t.img||"assets/news-placeholder.jpg"}');">
                             <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded">Logística</span>
                                <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">${g.formatDate(t.news_date||t.date)}</span>
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-2">${t.title}</h3>
                            <div class="text-sm font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                                Ler Artigo <span class="text-accent-cyan">→</span>
                            </div>
                        </div>
                    </a>
                `}))}static async renderServices(){const a=await d.getServices(),r=document.getElementById("services-grid");if(r&&a.length>0){r.innerHTML="";const n={"Registro RNTRC (ANTT)":{description:"O Sindinor é credenciado junto à Agência Nacional de Transportes Terrestres (ANTT) para realização do Registro e Recadastramento Nacional de Transportador Rodoviário de Cargas (RNTRC).",contact_info:{title:"Mais informações:",phone:"(38) 3321-9110 / (38) 99985-3216",email:"ercadastro@gmail.com.br",contact:"Edson Ricardo"},logos:["/assets/antt-logo.jpg","/assets/rntrc-logo.jpg"]},"Programa Despoluir":{description:"O Despoluir é um Programa Ambiental de Transporte que objetiva a redução de emissões de poluentes. Gratuitamente, as empresas associadas Sindinor podem aferir sua frota.",extra_description:'Os veículos aprovados recebem o <strong class="text-white">Selo Verde Despoluir</strong> e empresas de destaque concorrem ao Prêmio Melhor Ar, promovido pelo Fetcemg.'},"Consultoria Técnica":{description:"O Sindinor oferece assessoria econômica para auxiliar na elaboração de planilhas de custos, formação de preços e fornecimento de indicadores econômicos atualizados.",extra_description:"Seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e Lotação, garantindo competitividade e sustentabilidade ao negócio."},"Consultoria Técnica e Econômica":{description:"O Sindinor oferece assessoria econômica para auxiliar na elaboração de planilhas de custos, formação de preços e fornecimento de indicadores econômicos atualizados.",extra_description:"Seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e Lotação, garantindo competitividade e sustentabilidade ao negócio."}};a.forEach(t=>{const e=n[t.title],o=e&&t.description.length<50?e.description:t.description,c=t.extra_description||(e?e.extra_description:""),i=t.contact_info||(e?e.contact_info:null),l=t.logos&&t.logos.length>0?t.logos:e?e.logos:[];let s="";l&&l.length>0?s=`
                        <div class="flex gap-4 items-center">
                            ${l.map(m=>`<img src="${m.startsWith("/")?m:`/${m}`}" alt="Logo" class="h-12 w-auto bg-white p-1 rounded shadow-sm">`).join("")}
                        </div>
                    `:t.icon?s=`<i class="fas ${t.icon} text-4xl text-accent-cyan group-hover:scale-110 transition-transform"></i>`:s=`<img src="${t.image}" alt="${t.title}" class="w-8 h-8 filter invert group-hover:invert-0 transition-all">`;let p="";i&&(p=`
                        <div class="bg-primary-dark/50 p-4 rounded border border-white/10 text-xs text-gray-400 space-y-2 mt-auto">
                            <p class="font-bold text-accent-cyan mb-1">${i.title}</p>
                            <p><i class="fas fa-phone mr-2 text-accent-cyan"></i>${i.phone}</p>
                            <p><i class="fas fa-envelope mr-2 text-accent-cyan"></i>${i.email}</p>
                            <p><i class="fas fa-user mr-2 text-accent-cyan"></i>${i.contact}</p>
                        </div>
                    `);const u=c?`<p class="text-gray-400 text-sm leading-relaxed mb-6">${c}</p>`:"",f=t.icon?`<i class="fas ${t.icon} text-9xl"></i>`:`<img src="${t.image}" class="w-24 h-24 filter invert opacity-50">`;r.innerHTML+=`
                    <a href="servico.html?id=${t.id}" class="bg-secondary-dark rounded-lg p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group shadow-lg border border-white/5 flex flex-col h-full block">
                         <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-white">
                            ${f}
                         </div>
                        
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="w-auto h-14 rounded-lg flex items-center mb-6">
                                ${s}
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4">${t.title}</h3>
                            <p class="text-gray-400 text-sm leading-relaxed mb-4">${o}</p>
                            ${u}
                            ${p}
                            
                            <div class="mt-8 inline-flex items-center text-accent-cyan font-bold text-sm group-hover:gap-2 transition-all">
                                Saiba Mais <span class="ml-1">→</span>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-transparent"></div>
                    </a>
                `})}}static async renderGeneral(){const a=await d.getGeneral();a&&a.hero}static setupNavigation(){const a=document.querySelectorAll("section"),r=document.querySelectorAll("nav a"),n=document.querySelectorAll("#mobile-menu a"),t=new IntersectionObserver(e=>{e.forEach(o=>{if(o.isIntersecting){const c=o.target.getAttribute("id");r.forEach(s=>{s.classList.remove("text-accent-cyan"),s.classList.add("text-white/90"),s.getAttribute("href")==="#associe-se"&&(s.classList.remove("text-accent-cyan"),s.classList.add("text-accent-cyan"))}),n.forEach(s=>{s.classList.remove("text-accent-cyan"),s.classList.add("text-white"),s.getAttribute("href")==="#associe-se"&&s.classList.add("text-accent-cyan")});const i=document.querySelector(`nav a[href="#${c}"]`);i&&(i.classList.remove("text-white/90"),i.classList.add("text-accent-cyan"));const l=document.querySelector(`#mobile-menu a[href="#${c}"]`);l&&(l.classList.remove("text-white"),l.classList.add("text-accent-cyan"))}})},{threshold:.2,rootMargin:"-10% 0px -50% 0px"});a.forEach(e=>t.observe(e))}static setupJoinForm(){const a=document.getElementById("join-form");a&&a.addEventListener("submit",async r=>{r.preventDefault();const n=a.querySelector('button[type="submit"]'),t=n.innerText,e={company:document.getElementById("join-company").value,cnpj:document.getElementById("join-cnpj").value,city:document.getElementById("join-city").value,name:document.getElementById("join-name").value,role:document.getElementById("join-role").value,phone:document.getElementById("join-phone").value,message:document.getElementById("join-message").value};try{n.innerText="Enviando...",n.disabled=!0,await d.addRequest(e);try{const o=await d.getGeneral();if(o&&o.notificationEmail){const c=encodeURIComponent("Nova Solicitação de Filiação - SINDINOR"),i=encodeURIComponent(`
Nova solicitação de filiação recebida pelo site:

Empresa: ${e.company}
CNPJ: ${e.cnpj}
Cidade: ${e.city}
Contato: ${e.name}
Cargo: ${e.role}
Telefone: ${e.phone}

Mensagem:
${e.message}
`);window.location.href=`mailto:${o.notificationEmail}?subject=${c}&body=${i}`}}catch(o){console.error("Error opening email client:",o)}alert("Solicitação enviada com sucesso! Em breve entraremos em contato."),a.reset(),window.toggleJoinModal&&window.toggleJoinModal()}catch(o){console.error("Error submitting request:",o),alert("Erro ao enviar solicitação. Tente novamente.")}finally{n.innerText=t,n.disabled=!1}})}}document.addEventListener("DOMContentLoaded",()=>{g.init()});
