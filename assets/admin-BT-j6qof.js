import{A as o}from"./api-CnxUr71a.js";class g{static readFileAsBase64(r){return new Promise((a,n)=>{const s=new FileReader;s.readAsDataURL(r),s.onload=t=>{const i=new Image;i.src=t.target.result,i.onload=()=>{let l=i.width,d=i.height;l>d?l>800&&(d*=800/l,l=800):d>800&&(l*=800/d,d=800);const e=document.createElement("canvas");e.width=l,e.height=d,e.getContext("2d").drawImage(i,0,0,l,d),a(e.toDataURL("image/jpeg",.7))},i.onerror=c=>n(c)},s.onerror=t=>n(t)})}static init(){var r,a,n,s;window.checkAuth=()=>this.checkAuth(),window.logout=()=>this.logout(),localStorage.getItem("sindinor_admin_logged")==="true"&&this.showAdminPanel(),window.switchTab=t=>this.switchTab(t),window.deleteNews=t=>this.deleteNews(t),window.deletePartner=t=>this.deletePartner(t),window.deleteService=t=>this.deleteService(t),window.deleteDirector=t=>this.deleteDirector(t),window.editService=t=>this.editService(t),window.handleDeleteRequest=t=>this.handleDeleteRequest(t),(r=document.getElementById("news-form"))==null||r.addEventListener("submit",t=>this.handleAddNews(t)),(a=document.getElementById("partner-form"))==null||a.addEventListener("submit",t=>this.handleAddPartner(t)),(n=document.getElementById("service-form"))==null||n.addEventListener("submit",t=>this.handleAddService(t)),(s=document.getElementById("director-form"))==null||s.addEventListener("submit",t=>this.handleAddDirector(t)),window.handleDeleteRequest=t=>this.handleDeleteRequest(t)}static checkAuth(){const r=document.getElementById("admin-email").value,a=document.getElementById("admin-pass").value;r==="administrativo@sindinor.org.br"&&a==="Sindi#2025"?(localStorage.setItem("sindinor_admin_logged","true"),this.showAdminPanel()):alert("E-mail ou senha incorretos!")}static showAdminPanel(){document.getElementById("auth-overlay").style.display="none",document.getElementById("admin-content").style.display="flex",this.loadData()}static logout(){localStorage.removeItem("sindinor_admin_logged"),location.reload()}static switchTab(r){document.querySelectorAll(".tab-content").forEach(n=>{n.classList.add("hidden"),n.classList.remove("active")}),document.querySelectorAll(".nav-btn").forEach(n=>n.classList.remove("active")),document.getElementById(`tab-${r}`).classList.remove("hidden"),document.getElementById(`tab-${r}`).classList.add("active");const a=document.querySelector(`button[onclick="switchTab('${r}')"]`);a&&a.classList.add("active")}static async loadData(){const r=await o.getNews(),a=document.getElementById("news-list");a&&(a.innerHTML="",r.forEach(e=>{a.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${e.title}</h4>
                            <small class="text-text-muted text-xs">${e.news_date}</small>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteNews('${e.id}')">Excluir</button>
                    </div>
                `}));const n=await o.getPartners(),s=document.getElementById("partners-list");s&&(s.innerHTML="",n.forEach(e=>{s.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${e.logo||"../assets/favicon.png"}" alt="${e.name}" class="w-16 h-16 object-contain rounded bg-white/5 border border-glass-border p-2">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${e.name}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${e.description||"Sem descrição"}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deletePartner('${e.id}')">Excluir</button>
                    </div>
                `}));const t=await o.getServices(),i=document.getElementById("services-list");i&&(i.innerHTML="",t.forEach(e=>{i.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${e.image}" alt="${e.title}" class="w-16 h-16 object-cover rounded border border-glass-border">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${e.title}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${e.description}</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="bg-accent-cyan/20 text-accent-cyan px-3 py-1 rounded text-sm hover:bg-accent-cyan hover:text-primary-dark transition" onclick="editService('${e.id}')">Editar</button>
                            <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteService('${e.id}')">Excluir</button>
                        </div>
                    </div>
                `}));const c=await o.getDirectors(),u=document.getElementById("directors-list");u&&(u.innerHTML="",c.forEach(e=>{u.innerHTML+=`
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
                `}));const l=await o.getRequests(),d=document.getElementById("requests-list");d&&(l.length===0?d.innerHTML=`
                    <div class="bg-secondary-dark/50 border border-dashed border-glass-border p-12 rounded-xl text-center col-span-full">
                        <i class="fas fa-inbox text-4xl text-text-muted mb-4"></i>
                        <p class="text-text-muted">Nenhuma solicitação encontrada.</p>
                    </div>
                `:d.innerHTML=l.map(e=>`
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
                `).join(""))}static async deleteNews(r){confirm("Tem certeza que deseja excluir esta notícia?")&&(await o.deleteNews(r),this.loadData())}static async deletePartner(r){confirm("Tem certeza que deseja excluir este parceiro?")&&(await o.deletePartner(r),this.loadData())}static async deleteService(r){confirm("Tem certeza que deseja excluir este serviço?")&&(await o.deleteService(r),this.loadData())}static async deleteDirector(r){confirm("Tem certeza que deseja excluir este diretor?")&&(await o.deleteDirector(r),this.loadData())}static async handleAddNews(r){r.preventDefault();const a=document.getElementById("news-file");let s=document.getElementById("news-img").value;if(a.files&&a.files[0])try{s=await this.readFileAsBase64(a.files[0])}catch(i){console.error("Error reading file",i),alert("Erro ao ler arquivo de imagem.");return}else s||(s="assets/news-placeholder.jpg");const t={title:document.getElementById("news-title").value,date:document.getElementById("news-date").value,img:s,link:document.getElementById("news-link").value};await o.addNews(t),alert("Notícia Publicada!"),this.loadData(),r.target.reset()}static async handleAddPartner(r){r.preventDefault(),console.log("Adding partner...");const a=document.getElementById("partner-file");let s=document.getElementById("partner-logo").value;if(a.files&&a.files[0]){console.log("Reading file:",a.files[0].name);try{s=await this.readFileAsBase64(a.files[0]),console.log("File read success, base64 length:",s.length)}catch(i){console.error("Error reading file",i),alert("Erro ao ler a imagem! Tente outro arquivo.");return}}if(!s&&!document.getElementById("partner-name").value){alert("Preencha pelo menos o nome!");return}const t={name:document.getElementById("partner-name").value,description:document.getElementById("partner-desc").value,video_url:document.getElementById("partner-video").value,logo:s};try{await o.addPartner(t),console.log("Partner added to storage"),alert("Parceiro Adicionado com Sucesso!"),this.loadData(),r.target.reset()}catch(i){console.error(i),alert("Erro ao salvar: "+i.message)}}static async handleAddService(r){r.preventDefault();const a=document.getElementById("editing-service-id").value,n=document.getElementById("service-file");let t=document.getElementById("service-img").value;if(n.files&&n.files[0])try{t=await this.readFileAsBase64(n.files[0])}catch(e){console.error("Error reading file",e);return}const i=document.getElementById("service-gallery-files"),c=document.getElementById("service-gallery-urls");let u=c.value?c.value.split(",").map(e=>e.trim()).filter(e=>e):[];if(i.files&&i.files.length>0)for(let e=0;e<i.files.length;e++)try{const m=await this.readFileAsBase64(i.files[e]);u.push(m)}catch(m){console.error("Error reading gallery file",m)}const l={title:document.getElementById("service-title").value,description:document.getElementById("service-desc").value,full_description:document.getElementById("service-full-desc").value,image:t,gallery:u};a?(await o.updateService(a,l),alert("Serviço Atualizado!")):(await o.addService(l),alert("Serviço Adicionado!")),this.loadData(),r.target.reset(),document.getElementById("editing-service-id").value="";const d=document.querySelector("#tab-services h3");d&&(d.innerHTML='<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Novo Serviço')}static async editService(r){const n=(await o.getServices()).find(t=>t.id===r);if(!n)return;document.getElementById("editing-service-id").value=n.id,document.getElementById("service-title").value=n.title,document.getElementById("service-desc").value=n.description,document.getElementById("service-full-desc").value=n.full_description||"",document.getElementById("service-img").value=n.image.startsWith("data:")?"":n.image,document.getElementById("service-gallery-urls").value=(n.gallery||[]).filter(t=>!t.startsWith("data:")).join(", ");const s=document.querySelector("#tab-services h3");s&&(s.innerHTML='<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Editar Serviço'),document.getElementById("service-form").scrollIntoView({behavior:"smooth"})}static async handleAddDirector(r){r.preventDefault();const a=document.getElementById("director-file");let s=document.getElementById("director-img").value;if(a.files&&a.files[0])try{s=await this.readFileAsBase64(a.files[0])}catch(i){console.error("Error reading file",i);return}const t={name:document.getElementById("director-name").value,role:document.getElementById("director-role").value,company:document.getElementById("director-company").value,image:s};await o.addDirector(t),alert("Diretor Adicionado!"),this.loadData(),r.target.reset()}static async handleDeleteRequest(r){confirm("Deseja excluir esta solicitação?")&&(await o.deleteRequest(r),this.loadData())}}g.init();
