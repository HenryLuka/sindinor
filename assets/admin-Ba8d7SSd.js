import{A as d}from"./api-DYqFOZE5.js";class m{static readFileAsBase64(r){return new Promise((a,o)=>{const s=new FileReader;s.readAsDataURL(r),s.onload=t=>{const n=new Image;n.src=t.target.result,n.onload=()=>{let i=n.width,l=n.height;i>l?i>800&&(l*=800/i,i=800):l>800&&(i*=800/l,l=800);const e=document.createElement("canvas");e.width=i,e.height=l,e.getContext("2d").drawImage(n,0,0,i,l),a(e.toDataURL("image/jpeg",.7))},n.onerror=c=>o(c)},s.onerror=t=>o(t)})}static init(){var r,a,o,s;window.checkAuth=()=>this.checkAuth(),window.logout=()=>this.logout(),localStorage.getItem("sindinor_admin_logged")==="true"&&this.showAdminPanel(),window.switchTab=t=>this.switchTab(t),window.deleteNews=t=>this.deleteNews(t),window.deletePartner=t=>this.deletePartner(t),window.deleteService=t=>this.deleteService(t),window.deleteDirector=t=>this.deleteDirector(t),(r=document.getElementById("news-form"))==null||r.addEventListener("submit",t=>this.handleAddNews(t)),(a=document.getElementById("partner-form"))==null||a.addEventListener("submit",t=>this.handleAddPartner(t)),(o=document.getElementById("service-form"))==null||o.addEventListener("submit",t=>this.handleAddService(t)),(s=document.getElementById("director-form"))==null||s.addEventListener("submit",t=>this.handleAddDirector(t)),window.handleDeleteRequest=t=>this.handleDeleteRequest(t)}static checkAuth(){const r=document.getElementById("admin-email").value,a=document.getElementById("admin-pass").value;r==="administrativo@sindinor.org.br"&&a==="Sindi#2025"?(localStorage.setItem("sindinor_admin_logged","true"),this.showAdminPanel()):alert("E-mail ou senha incorretos!")}static showAdminPanel(){document.getElementById("auth-overlay").style.display="none",document.getElementById("admin-content").style.display="flex",this.loadData()}static logout(){localStorage.removeItem("sindinor_admin_logged"),location.reload()}static switchTab(r){document.querySelectorAll(".tab-content").forEach(o=>{o.classList.add("hidden"),o.classList.remove("active")}),document.querySelectorAll(".nav-btn").forEach(o=>o.classList.remove("active")),document.getElementById(`tab-${r}`).classList.remove("hidden"),document.getElementById(`tab-${r}`).classList.add("active");const a=document.querySelector(`button[onclick="switchTab('${r}')"]`);a&&a.classList.add("active")}static async loadData(){const r=await d.getNews(),a=document.getElementById("news-list");a&&(a.innerHTML="",r.forEach(e=>{a.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${e.title}</h4>
                            <small class="text-text-muted text-xs">${e.news_date}</small>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteNews('${e.id}')">Excluir</button>
                    </div>
                `}));const o=await d.getPartners(),s=document.getElementById("partners-list");s&&(s.innerHTML="",o.forEach(e=>{s.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${e.logo||"../assets/favicon.png"}" alt="${e.name}" class="w-16 h-16 object-contain rounded bg-white/5 border border-glass-border p-2">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${e.name}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${e.description||"Sem descrição"}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deletePartner('${e.id}')">Excluir</button>
                    </div>
                `}));const t=await d.getServices(),n=document.getElementById("services-list");n&&(n.innerHTML="",t.forEach(e=>{n.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${e.image}" alt="${e.title}" class="w-16 h-16 object-cover rounded border border-glass-border">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${e.title}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${e.description}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteService('${e.id}')">Excluir</button>
                    </div>
                `}));const c=await d.getDirectors(),u=document.getElementById("directors-list");u&&(u.innerHTML="",c.forEach(e=>{u.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${e.image}" alt="${e.name}" class="w-12 h-12 rounded-full border-2 border-glass-border object-cover">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${e.name}</h4>
                            <div class="flex gap-2 text-xs">
                                <span class="text-accent-cyan font-bold uppercase">${e.role}</span>
                                <span class="text-text-muted">| ${e.company}</span>
                            </div>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteDirector('${e.id}')">Excluir</button>
                    </div>
                `}));const i=await d.getRequests(),l=document.getElementById("requests-list");l&&(i.length===0?l.innerHTML=`
                    <div class="bg-secondary-dark/50 border border-dashed border-glass-border p-12 rounded-xl text-center col-span-full">
                        <i class="fas fa-inbox text-4xl text-text-muted mb-4"></i>
                        <p class="text-text-muted">Nenhuma solicitação encontrada.</p>
                    </div>
                `:l.innerHTML=i.map(e=>`
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl relative hover:border-accent-cyan transition-colors group">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-heading font-bold text-xl text-white underline underline-offset-4 decoration-accent-cyan/30">${e.company}</h3>
                                <p class="text-accent-cyan text-[10px] font-black uppercase tracking-widest mt-2 bg-accent-cyan/10 inline-block px-2 py-0.5 rounded">${e.cnpj}</p>
                            </div>
                            <button onclick="handleDeleteRequest('${e.id}')" class="text-text-muted hover:text-red-500 transition-colors p-2 bg-glass-bg rounded-lg">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                            <div class="bg-primary-dark/50 p-3 rounded-lg border border-glass-border">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-1 opacity-70">Responsável</span>
                                <p class="text-white font-bold">${e.name}</p>
                                <p class="text-text-muted text-xs font-medium">${e.role}</p>
                            </div>
                            <div class="bg-primary-dark/50 p-3 rounded-lg border border-glass-border">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-1 opacity-70">Contato</span>
                                <p class="text-white font-bold">${e.phone}</p>
                                <p class="text-text-muted text-xs font-medium">${e.city}</p>
                            </div>
                        </div>

                        <div class="flex items-center justify-between border-t border-glass-border pt-4">
                            <span class="text-text-muted text-[10px] font-bold uppercase tracking-widest">
                                <i class="far fa-calendar-alt mr-1"></i> ${new Date(e.date).toLocaleDateString("pt-BR")}
                            </span>
                            <a href="https://wa.me/55${e.phone.replace(/\D/g,"")}" target="_blank" 
                               class="flex items-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full transition-all duration-300">
                                <i class="fab fa-whatsapp"></i> Contatar
                            </a>
                        </div>
                    </div>
                `).join(""))}static async deleteNews(r){confirm("Tem certeza que deseja excluir esta notícia?")&&(await d.deleteNews(r),this.loadData())}static async deletePartner(r){confirm("Tem certeza que deseja excluir este parceiro?")&&(await d.deletePartner(r),this.loadData())}static async deleteService(r){confirm("Tem certeza que deseja excluir este serviço?")&&(await d.deleteService(r),this.loadData())}static async deleteDirector(r){confirm("Tem certeza que deseja excluir este diretor?")&&(await d.deleteDirector(r),this.loadData())}static async handleAddNews(r){r.preventDefault();const a=document.getElementById("news-file");let s=document.getElementById("news-img").value;if(a.files&&a.files[0])try{s=await this.readFileAsBase64(a.files[0])}catch(n){console.error("Error reading file",n),alert("Erro ao ler arquivo de imagem.");return}else s||(s="assets/news-placeholder.jpg");const t={title:document.getElementById("news-title").value,date:document.getElementById("news-date").value,img:s,link:document.getElementById("news-link").value};await d.addNews(t),alert("Notícia Publicada!"),this.loadData(),r.target.reset()}static async handleAddPartner(r){r.preventDefault(),console.log("Adding partner...");const a=document.getElementById("partner-file");let s=document.getElementById("partner-logo").value;if(a.files&&a.files[0]){console.log("Reading file:",a.files[0].name);try{s=await this.readFileAsBase64(a.files[0]),console.log("File read success, base64 length:",s.length)}catch(n){console.error("Error reading file",n),alert("Erro ao ler a imagem! Tente outro arquivo.");return}}if(!s&&!document.getElementById("partner-name").value){alert("Preencha pelo menos o nome!");return}const t={name:document.getElementById("partner-name").value,description:document.getElementById("partner-desc").value,video_url:document.getElementById("partner-video").value,logo:s};try{await d.addPartner(t),console.log("Partner added to storage"),alert("Parceiro Adicionado com Sucesso!"),this.loadData(),r.target.reset()}catch(n){console.error(n),alert("Erro ao salvar: "+n.message)}}static async handleAddService(r){r.preventDefault();const a=document.getElementById("service-file");let s=document.getElementById("service-img").value;if(a.files&&a.files[0])try{s=await this.readFileAsBase64(a.files[0])}catch(i){console.error("Error reading file",i);return}const t=document.getElementById("service-gallery-files"),n=document.getElementById("service-gallery-urls");let c=n.value?n.value.split(",").map(i=>i.trim()).filter(i=>i):[];if(t.files&&t.files.length>0)for(let i=0;i<t.files.length;i++)try{const l=await this.readFileAsBase64(t.files[i]);c.push(l)}catch(l){console.error("Error reading gallery file",l)}const u={title:document.getElementById("service-title").value,description:document.getElementById("service-desc").value,full_description:document.getElementById("service-full-desc").value,image:s,gallery:c};await d.addService(u),alert("Serviço Adicionado!"),this.loadData(),r.target.reset()}static async handleAddDirector(r){r.preventDefault();const a=document.getElementById("director-file");let s=document.getElementById("director-img").value;if(a.files&&a.files[0])try{s=await this.readFileAsBase64(a.files[0])}catch(n){console.error("Error reading file",n);return}const t={name:document.getElementById("director-name").value,role:document.getElementById("director-role").value,company:document.getElementById("director-company").value,image:s};await d.addDirector(t),alert("Diretor Adicionado!"),this.loadData(),r.target.reset()}static async handleDeleteRequest(r){confirm("Deseja excluir esta solicitação?")&&(await d.deleteRequest(r),this.loadData())}}m.init();
