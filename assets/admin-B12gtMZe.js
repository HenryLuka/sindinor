var y=Object.defineProperty;var f=(m,e,a)=>e in m?y(m,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):m[e]=a;var h=(m,e,a)=>f(m,typeof e!="symbol"?e+"":e,a);import{o as w,s as b,a as v,b as x,A as d}from"./api-DjC5NM_p.js";class p{static readFileAsBase64(e){return new Promise((a,i)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=t=>{const s=new Image;s.src=t.target.result,s.onload=()=>{let l=s.width,o=s.height;l>o?l>800&&(o*=800/l,l=800):o>800&&(l*=800/o,o=800);const r=document.createElement("canvas");r.width=l,r.height=o,r.getContext("2d").drawImage(s,0,0,l,o),a(r.toDataURL("image/jpeg",.7))},s.onerror=c=>i(c)},n.onerror=t=>i(t)})}static init(){var e,a,i,n;window.checkAuth=()=>this.checkAuth(),window.logout=()=>this.logout(),w(v,t=>{t?this.showAdminPanel():this.showLogin()}),window.switchTab=t=>this.switchTab(t),window.deleteNews=t=>this.deleteNews(t),window.deletePartner=t=>this.deletePartner(t),window.deleteService=t=>this.deleteService(t),window.deleteDirector=t=>this.deleteDirector(t),window.editService=t=>this.editService(t),window.removeServiceGalleryItem=t=>this.removeServiceGalleryItem(t),window.removeNewsGalleryItem=t=>this.removeNewsGalleryItem(t),window.handleDeleteRequest=t=>this.handleDeleteRequest(t),(e=document.getElementById("news-form"))==null||e.addEventListener("submit",t=>this.handleAddNews(t)),(a=document.getElementById("partner-form"))==null||a.addEventListener("submit",t=>this.handleAddPartner(t)),(i=document.getElementById("service-form"))==null||i.addEventListener("submit",t=>this.handleAddService(t)),(n=document.getElementById("director-form"))==null||n.addEventListener("submit",t=>this.handleAddDirector(t)),window.handleDeleteRequest=t=>this.handleDeleteRequest(t)}static async checkAuth(){const e=document.getElementById("admin-email").value,a=document.getElementById("admin-pass").value;try{await b(v,e,a)}catch(i){console.error("Login Error:",i),alert("E-mail ou senha incorretos! (Erro: "+i.code+")")}}static async logout(){try{await x(v),window.location.reload()}catch(e){console.error("Logout Error:",e)}}static showLogin(){document.getElementById("auth-overlay").style.display="flex",document.getElementById("admin-content").style.display="none"}static showAdminPanel(){document.getElementById("auth-overlay").style.display="none",document.getElementById("admin-content").style.display="flex",this.loadData(),this.switchTab("news")}static logout(){localStorage.removeItem("sindinor_admin_logged"),location.reload()}static switchTab(e){document.querySelectorAll(".tab-content").forEach(i=>{i.classList.add("hidden"),i.classList.remove("active")}),document.querySelectorAll(".nav-btn").forEach(i=>i.classList.remove("active")),document.getElementById(`tab-${e}`).classList.remove("hidden"),document.getElementById(`tab-${e}`).classList.add("active");const a=document.querySelector(`button[onclick="switchTab('${e}')"]`);a&&a.classList.add("active")}static async loadData(){const[e,a,i,n,t]=await Promise.all([d.getNews(),d.getPartners(),d.getServices(),d.getDirectors(),d.getRequests()]),s=document.getElementById("news-list");s&&(s.innerHTML="",e.forEach(r=>{s.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${r.title}</h4>
                            <small class="text-text-muted text-xs">${r.news_date}</small>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteNews('${r.id}')">Excluir</button>
                    </div>
                `}));const c=document.getElementById("partners-list");c&&(c.innerHTML="",a.forEach(r=>{c.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${r.logo||"../assets/favicon.png"}" alt="${r.name}" class="w-16 h-16 object-contain rounded bg-white/5 border border-glass-border p-2">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${r.name}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${r.description||"Sem descrição"}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deletePartner('${r.id}')">Excluir</button>
                    </div>
                `}));const u=document.getElementById("services-list");u&&(u.innerHTML="",i.forEach(r=>{u.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${r.image}" alt="${r.title}" class="w-16 h-16 object-cover rounded border border-glass-border">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${r.title}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${r.description}</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="bg-accent-cyan/20 text-accent-cyan px-3 py-1 rounded text-sm hover:bg-accent-cyan hover:text-primary-dark transition" onclick="editService('${r.id}')">Editar</button>
                            <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteService('${r.id}')">Excluir</button>
                        </div>
                    </div>
                `}));const l=document.getElementById("directors-list");l&&(l.innerHTML="",n.forEach(r=>{l.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${r.image}" alt="${r.name}" class="w-12 h-12 rounded-full border-2 border-glass-border object-cover">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${r.name}</h4>
                            <div class="flex gap-2 text-xs">
                                <span class="text-accent-cyan font-bold uppercase">${r.role}</span>
                                <span class="text-text-muted">| ${r.company}</span>
                            </div>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteDirector('${r.id}')">Excluir</button>
                    </div>
                `}));const o=document.getElementById("requests-list");o&&(t.length===0?o.innerHTML=`
                    <div class="bg-secondary-dark/50 border border-dashed border-glass-border p-12 rounded-xl text-center col-span-full">
                        <i class="fas fa-inbox text-4xl text-text-muted mb-4"></i>
                        <p class="text-text-muted">Nenhuma solicitação encontrada.</p>
                    </div>
                `:o.innerHTML=t.map(r=>`
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl relative hover:border-accent-cyan transition-colors group">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-heading font-bold text-xl text-white underline underline-offset-4 decoration-accent-cyan/30">${r.company}</h3>
                                <p class="text-accent-cyan text-[10px] font-black uppercase tracking-widest mt-2 bg-accent-cyan/10 inline-block px-2 py-0.5 rounded">${r.cnpj}</p>
                            </div>
                            <button onclick="handleDeleteRequest('${r.id}')" class="text-text-muted hover:text-red-500 transition-colors p-2 bg-glass-bg rounded-lg">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                            <div class="bg-primary-dark/50 p-3 rounded-lg border border-glass-border">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-1 opacity-70">Responsável</span>
                                <p class="text-white font-bold">${r.name}</p>
                                <p class="text-text-muted text-xs font-medium">${r.role}</p>
                            </div>
                            <div class="bg-primary-dark/50 p-3 rounded-lg border border-glass-border">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-1 opacity-70">Contato</span>
                                <p class="text-white font-bold">${r.phone}</p>
                                <p class="text-text-muted text-xs font-medium">${r.city}</p>
                            </div>
                        </div>

                        <div class="flex items-center justify-between border-t border-glass-border pt-4">
                            <span class="text-text-muted text-[10px] font-bold uppercase tracking-widest">
                                <i class="far fa-calendar-alt mr-1"></i> ${new Date(r.date).toLocaleDateString("pt-BR")}
                            </span>
                            <a href="https://wa.me/55${r.phone.replace(/\D/g,"")}" target="_blank" 
                               class="flex items-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full transition-all duration-300">
                                <i class="fab fa-whatsapp"></i> Contatar
                            </a>
                        </div>
                    </div>
                `).join(""))}static async deleteNews(e){confirm("Tem certeza que deseja excluir esta notícia?")&&(await d.deleteNews(e),this.loadData())}static async deletePartner(e){confirm("Tem certeza que deseja excluir este parceiro?")&&(await d.deletePartner(e),this.loadData())}static async deleteService(e){confirm("Tem certeza que deseja excluir este serviço?")&&(await d.deleteService(e),this.loadData())}static async deleteDirector(e){confirm("Tem certeza que deseja excluir este diretor?")&&(await d.deleteDirector(e),this.loadData())}static async handleAddNews(e){e.preventDefault();const a=document.getElementById("news-file");let n=document.getElementById("news-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(l){console.error("Error reading file",l),alert("Erro ao ler arquivo de imagem.");return}else n||(n="assets/news-placeholder.jpg");let t=[...this.editingNewsGallery];const s=document.getElementById("news-gallery-urls");if(s&&s.value){const l=s.value.split(",").map(o=>o.trim()).filter(o=>o);t=[...t,...l]}const c=document.getElementById("news-gallery-files");if(c&&c.files&&c.files.length>0)for(let l=0;l<c.files.length;l++)try{const o=await this.readFileAsBase64(c.files[l]);t.push(o)}catch(o){console.error("Error reading gallery file",o)}const u={title:document.getElementById("news-title").value,news_date:document.getElementById("news-date").value,img:n,content:document.getElementById("news-content").value,gallery:t};await d.addNews(u),alert("Notícia Publicada!"),this.loadData(),e.target.reset(),this.editingNewsGallery=[],this.renderNewsGalleryPreview()}static renderNewsGalleryPreview(){const e=document.getElementById("news-gallery-preview");e&&(e.innerHTML=this.editingNewsGallery.map((a,i)=>`
            <div class="relative w-16 h-16 rounded border border-glass-border overflow-hidden bg-white/5 group">
                <img src="${a}" class="w-full h-full object-cover">
                <button type="button" onclick="removeNewsGalleryItem(${i})" class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join(""),this.editingNewsGallery.length===0&&(e.innerHTML='<p class="text-text-muted text-[10px] uppercase tracking-widest italic">Nenhuma foto na galeria</p>'))}static removeNewsGalleryItem(e){this.editingNewsGallery.splice(e,1),this.renderNewsGalleryPreview()}static async handleAddPartner(e){e.preventDefault(),console.log("Adding partner...");const a=document.getElementById("partner-file");let n=document.getElementById("partner-logo").value;if(a.files&&a.files[0]){console.log("Reading file:",a.files[0].name);try{n=await this.readFileAsBase64(a.files[0]),console.log("File read success, base64 length:",n.length)}catch(s){console.error("Error reading file",s),alert("Erro ao ler a imagem! Tente outro arquivo.");return}}if(!n&&!document.getElementById("partner-name").value){alert("Preencha pelo menos o nome!");return}const t={name:document.getElementById("partner-name").value,description:document.getElementById("partner-desc").value,video_url:document.getElementById("partner-video").value,logo:n};try{await d.addPartner(t),console.log("Partner added to storage"),alert("Parceiro Adicionado com Sucesso!"),this.loadData(),e.target.reset()}catch(s){console.error(s),alert("Erro ao salvar: "+s.message)}}static async handleAddService(e){e.preventDefault();const a=document.getElementById("editing-service-id").value,i=document.getElementById("service-file");let t=document.getElementById("service-img").value;if(i.files&&i.files[0])try{t=await this.readFileAsBase64(i.files[0])}catch(r){console.error("Error reading file",r);return}let s=[...this.editingGallery];const c=document.getElementById("service-gallery-urls");if(c.value){const r=c.value.split(",").map(g=>g.trim()).filter(g=>g);s=[...s,...r]}const u=document.getElementById("service-gallery-files");if(u.files&&u.files.length>0)for(let r=0;r<u.files.length;r++)try{const g=await this.readFileAsBase64(u.files[r]);s.push(g)}catch(g){console.error("Error reading gallery file",g)}const l={title:document.getElementById("service-title").value,description:document.getElementById("service-desc").value,full_description:document.getElementById("service-full-desc").value,image:t,gallery:s};a?(await d.updateService(a,l),alert("Serviço Atualizado!")):(await d.addService(l),alert("Serviço Adicionado!")),this.loadData(),e.target.reset(),this.editingGallery=[],this.renderGalleryPreview(),document.getElementById("editing-service-id").value="";const o=document.querySelector("#tab-services h3");o&&(o.innerHTML='<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Novo Serviço')}static async editService(e){const i=(await d.getServices()).find(t=>t.id===e);if(!i)return;document.getElementById("editing-service-id").value=i.id,document.getElementById("service-title").value=i.title,document.getElementById("service-desc").value=i.description,document.getElementById("service-full-desc").value=i.full_description||"",document.getElementById("service-img").value=i.image.startsWith("data:")?"":i.image,document.getElementById("service-gallery-urls").value="",this.editingGallery=i.gallery?[...i.gallery]:[],this.renderGalleryPreview();const n=document.querySelector("#tab-services h3");n&&(n.innerHTML='<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Editar Serviço'),document.getElementById("service-form").scrollIntoView({behavior:"smooth"})}static renderGalleryPreview(){const e=document.getElementById("service-gallery-preview");e&&(e.innerHTML=this.editingGallery.map((a,i)=>`
            <div class="relative w-16 h-16 rounded border border-glass-border overflow-hidden bg-white/5 group">
                <img src="${a}" class="w-full h-full object-cover">
                <button type="button" onclick="removeServiceGalleryItem(${i})" class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join(""),this.editingGallery.length===0&&(e.innerHTML='<p class="text-text-muted text-[10px] uppercase tracking-widest italic">Nenhuma foto na galeria</p>'))}static removeServiceGalleryItem(e){this.editingGallery.splice(e,1),this.renderGalleryPreview()}static async handleAddDirector(e){e.preventDefault();const a=document.getElementById("director-file");let n=document.getElementById("director-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(s){console.error("Error reading file",s);return}const t={name:document.getElementById("director-name").value,role:document.getElementById("director-role").value,company:document.getElementById("director-company").value,image:n};await d.addDirector(t),alert("Diretor Adicionado!"),this.loadData(),e.target.reset()}static async handleDeleteRequest(e){confirm("Deseja excluir esta solicitação?")&&(await d.deleteRequest(e),this.loadData())}}h(p,"editingNewsGallery",[]),h(p,"editingGallery",[]);p.init();
