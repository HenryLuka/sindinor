var h=Object.defineProperty;var f=(g,e,a)=>e in g?h(g,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):g[e]=a;var v=(g,e,a)=>f(g,typeof e!="symbol"?e+"":e,a);import{A as l}from"./api-CKDjTlUL.js";class p{static readFileAsBase64(e){return new Promise((a,i)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=r=>{const s=new Image;s.src=r.target.result,s.onload=()=>{let d=s.width,o=s.height;d>o?d>800&&(o*=800/d,d=800):o>800&&(d*=800/o,o=800);const t=document.createElement("canvas");t.width=d,t.height=o,t.getContext("2d").drawImage(s,0,0,d,o),a(t.toDataURL("image/jpeg",.7))},s.onerror=m=>i(m)},n.onerror=r=>i(r)})}static init(){var e,a,i,n;window.checkAuth=()=>this.checkAuth(),window.logout=()=>this.logout(),localStorage.getItem("sindinor_admin_logged")==="true"&&this.showAdminPanel(),window.switchTab=r=>this.switchTab(r),window.deleteNews=r=>this.deleteNews(r),window.deletePartner=r=>this.deletePartner(r),window.deleteService=r=>this.deleteService(r),window.deleteDirector=r=>this.deleteDirector(r),window.editService=r=>this.editService(r),window.removeServiceGalleryItem=r=>this.removeServiceGalleryItem(r),window.handleDeleteRequest=r=>this.handleDeleteRequest(r),(e=document.getElementById("news-form"))==null||e.addEventListener("submit",r=>this.handleAddNews(r)),(a=document.getElementById("partner-form"))==null||a.addEventListener("submit",r=>this.handleAddPartner(r)),(i=document.getElementById("service-form"))==null||i.addEventListener("submit",r=>this.handleAddService(r)),(n=document.getElementById("director-form"))==null||n.addEventListener("submit",r=>this.handleAddDirector(r)),window.handleDeleteRequest=r=>this.handleDeleteRequest(r)}static checkAuth(){const e=document.getElementById("admin-email").value,a=document.getElementById("admin-pass").value;e==="administrativo@sindinor.org.br"&&a==="Sindi#2025"?(localStorage.setItem("sindinor_admin_logged","true"),this.showAdminPanel()):alert("E-mail ou senha incorretos!")}static showAdminPanel(){document.getElementById("auth-overlay").style.display="none",document.getElementById("admin-content").style.display="flex",this.loadData()}static logout(){localStorage.removeItem("sindinor_admin_logged"),location.reload()}static switchTab(e){document.querySelectorAll(".tab-content").forEach(i=>{i.classList.add("hidden"),i.classList.remove("active")}),document.querySelectorAll(".nav-btn").forEach(i=>i.classList.remove("active")),document.getElementById(`tab-${e}`).classList.remove("hidden"),document.getElementById(`tab-${e}`).classList.add("active");const a=document.querySelector(`button[onclick="switchTab('${e}')"]`);a&&a.classList.add("active")}static async loadData(){const e=await l.getNews(),a=document.getElementById("news-list");a&&(a.innerHTML="",e.forEach(t=>{a.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${t.title}</h4>
                            <small class="text-text-muted text-xs">${t.news_date}</small>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteNews('${t.id}')">Excluir</button>
                    </div>
                `}));const i=await l.getPartners(),n=document.getElementById("partners-list");n&&(n.innerHTML="",i.forEach(t=>{n.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${t.logo||"../assets/favicon.png"}" alt="${t.name}" class="w-16 h-16 object-contain rounded bg-white/5 border border-glass-border p-2">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${t.name}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${t.description||"Sem descrição"}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deletePartner('${t.id}')">Excluir</button>
                    </div>
                `}));const r=await l.getServices(),s=document.getElementById("services-list");s&&(s.innerHTML="",r.forEach(t=>{s.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${t.image}" alt="${t.title}" class="w-16 h-16 object-cover rounded border border-glass-border">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${t.title}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${t.description}</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="bg-accent-cyan/20 text-accent-cyan px-3 py-1 rounded text-sm hover:bg-accent-cyan hover:text-primary-dark transition" onclick="editService('${t.id}')">Editar</button>
                            <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteService('${t.id}')">Excluir</button>
                        </div>
                    </div>
                `}));const m=await l.getDirectors(),c=document.getElementById("directors-list");c&&(c.innerHTML="",m.forEach(t=>{c.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${t.image}" alt="${t.name}" class="w-12 h-12 rounded-full border-2 border-glass-border object-cover">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${t.name}</h4>
                            <div class="flex gap-2 text-xs">
                                <span class="text-accent-cyan font-bold uppercase">${t.role}</span>
                                <span class="text-text-muted">| ${t.company}</span>
                            </div>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteDirector('${t.id}')">Excluir</button>
                    </div>
                `}));const d=await l.getRequests(),o=document.getElementById("requests-list");o&&(d.length===0?o.innerHTML=`
                    <div class="bg-secondary-dark/50 border border-dashed border-glass-border p-12 rounded-xl text-center col-span-full">
                        <i class="fas fa-inbox text-4xl text-text-muted mb-4"></i>
                        <p class="text-text-muted">Nenhuma solicitação encontrada.</p>
                    </div>
                `:o.innerHTML=d.map(t=>`
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl relative hover:border-accent-cyan transition-colors group">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-heading font-bold text-xl text-white underline underline-offset-4 decoration-accent-cyan/30">${t.company}</h3>
                                <p class="text-accent-cyan text-[10px] font-black uppercase tracking-widest mt-2 bg-accent-cyan/10 inline-block px-2 py-0.5 rounded">${t.cnpj}</p>
                            </div>
                            <button onclick="handleDeleteRequest('${t.id}')" class="text-text-muted hover:text-red-500 transition-colors p-2 bg-glass-bg rounded-lg">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                            <div class="bg-primary-dark/50 p-3 rounded-lg border border-glass-border">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-1 opacity-70">Responsável</span>
                                <p class="text-white font-bold">${t.name}</p>
                                <p class="text-text-muted text-xs font-medium">${t.role}</p>
                            </div>
                            <div class="bg-primary-dark/50 p-3 rounded-lg border border-glass-border">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-1 opacity-70">Contato</span>
                                <p class="text-white font-bold">${t.phone}</p>
                                <p class="text-text-muted text-xs font-medium">${t.city}</p>
                            </div>
                        </div>

                        <div class="flex items-center justify-between border-t border-glass-border pt-4">
                            <span class="text-text-muted text-[10px] font-bold uppercase tracking-widest">
                                <i class="far fa-calendar-alt mr-1"></i> ${new Date(t.date).toLocaleDateString("pt-BR")}
                            </span>
                            <a href="https://wa.me/55${t.phone.replace(/\D/g,"")}" target="_blank" 
                               class="flex items-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full transition-all duration-300">
                                <i class="fab fa-whatsapp"></i> Contatar
                            </a>
                        </div>
                    </div>
                `).join(""))}static async deleteNews(e){confirm("Tem certeza que deseja excluir esta notícia?")&&(await l.deleteNews(e),this.loadData())}static async deletePartner(e){confirm("Tem certeza que deseja excluir este parceiro?")&&(await l.deletePartner(e),this.loadData())}static async deleteService(e){confirm("Tem certeza que deseja excluir este serviço?")&&(await l.deleteService(e),this.loadData())}static async deleteDirector(e){confirm("Tem certeza que deseja excluir este diretor?")&&(await l.deleteDirector(e),this.loadData())}static async handleAddNews(e){e.preventDefault();const a=document.getElementById("news-file");let n=document.getElementById("news-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(s){console.error("Error reading file",s),alert("Erro ao ler arquivo de imagem.");return}else n||(n="assets/news-placeholder.jpg");const r={title:document.getElementById("news-title").value,date:document.getElementById("news-date").value,img:n,link:document.getElementById("news-link").value};await l.addNews(r),alert("Notícia Publicada!"),this.loadData(),e.target.reset()}static async handleAddPartner(e){e.preventDefault(),console.log("Adding partner...");const a=document.getElementById("partner-file");let n=document.getElementById("partner-logo").value;if(a.files&&a.files[0]){console.log("Reading file:",a.files[0].name);try{n=await this.readFileAsBase64(a.files[0]),console.log("File read success, base64 length:",n.length)}catch(s){console.error("Error reading file",s),alert("Erro ao ler a imagem! Tente outro arquivo.");return}}if(!n&&!document.getElementById("partner-name").value){alert("Preencha pelo menos o nome!");return}const r={name:document.getElementById("partner-name").value,description:document.getElementById("partner-desc").value,video_url:document.getElementById("partner-video").value,logo:n};try{await l.addPartner(r),console.log("Partner added to storage"),alert("Parceiro Adicionado com Sucesso!"),this.loadData(),e.target.reset()}catch(s){console.error(s),alert("Erro ao salvar: "+s.message)}}static async handleAddService(e){e.preventDefault();const a=document.getElementById("editing-service-id").value,i=document.getElementById("service-file");let r=document.getElementById("service-img").value;if(i.files&&i.files[0])try{r=await this.readFileAsBase64(i.files[0])}catch(t){console.error("Error reading file",t);return}let s=[...this.editingGallery];const m=document.getElementById("service-gallery-urls");if(m.value){const t=m.value.split(",").map(u=>u.trim()).filter(u=>u);s=[...s,...t]}const c=document.getElementById("service-gallery-files");if(c.files&&c.files.length>0)for(let t=0;t<c.files.length;t++)try{const u=await this.readFileAsBase64(c.files[t]);s.push(u)}catch(u){console.error("Error reading gallery file",u)}const d={title:document.getElementById("service-title").value,description:document.getElementById("service-desc").value,full_description:document.getElementById("service-full-desc").value,image:r,gallery:s};a?(await l.updateService(a,d),alert("Serviço Atualizado!")):(await l.addService(d),alert("Serviço Adicionado!")),this.loadData(),e.target.reset(),this.editingGallery=[],this.renderGalleryPreview(),document.getElementById("editing-service-id").value="";const o=document.querySelector("#tab-services h3");o&&(o.innerHTML='<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Novo Serviço')}static async editService(e){const i=(await l.getServices()).find(r=>r.id===e);if(!i)return;document.getElementById("editing-service-id").value=i.id,document.getElementById("service-title").value=i.title,document.getElementById("service-desc").value=i.description,document.getElementById("service-full-desc").value=i.full_description||"",document.getElementById("service-img").value=i.image.startsWith("data:")?"":i.image,document.getElementById("service-gallery-urls").value="",this.editingGallery=i.gallery?[...i.gallery]:[],this.renderGalleryPreview();const n=document.querySelector("#tab-services h3");n&&(n.innerHTML='<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Editar Serviço'),document.getElementById("service-form").scrollIntoView({behavior:"smooth"})}static renderGalleryPreview(){const e=document.getElementById("service-gallery-preview");e&&(e.innerHTML=this.editingGallery.map((a,i)=>`
            <div class="relative w-16 h-16 rounded border border-glass-border overflow-hidden bg-white/5 group">
                <img src="${a}" class="w-full h-full object-cover">
                <button type="button" onclick="removeServiceGalleryItem(${i})" class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join(""),this.editingGallery.length===0&&(e.innerHTML='<p class="text-text-muted text-[10px] uppercase tracking-widest italic">Nenhuma foto na galeria</p>'))}static removeServiceGalleryItem(e){this.editingGallery.splice(e,1),this.renderGalleryPreview()}static async handleAddDirector(e){e.preventDefault();const a=document.getElementById("director-file");let n=document.getElementById("director-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(s){console.error("Error reading file",s);return}const r={name:document.getElementById("director-name").value,role:document.getElementById("director-role").value,company:document.getElementById("director-company").value,image:n};await l.addDirector(r),alert("Diretor Adicionado!"),this.loadData(),e.target.reset()}static async handleDeleteRequest(e){confirm("Deseja excluir esta solicitação?")&&(await l.deleteRequest(e),this.loadData())}}v(p,"editingGallery",[]);p.init();
