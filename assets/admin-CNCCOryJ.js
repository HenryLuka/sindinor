import{A as i}from"./api-q9fuA95L.js";class m{static readFileAsBase64(t){return new Promise((a,o)=>{const n=new FileReader;n.readAsDataURL(t),n.onload=r=>{const s=new Image;s.src=r.target.result,s.onload=()=>{let l=s.width,d=s.height;l>d?l>800&&(d*=800/l,l=800):d>800&&(l*=800/d,d=800);const e=document.createElement("canvas");e.width=l,e.height=d,e.getContext("2d").drawImage(s,0,0,l,d),a(e.toDataURL("image/jpeg",.7))},s.onerror=c=>o(c)},n.onerror=r=>o(r)})}static init(){var t,a,o,n;window.checkAuth=()=>this.checkAuth(),window.logout=()=>this.logout(),localStorage.getItem("sindinor_admin_logged")==="true"&&this.showAdminPanel(),window.switchTab=r=>this.switchTab(r),window.deleteNews=r=>this.deleteNews(r),window.deletePartner=r=>this.deletePartner(r),window.deleteService=r=>this.deleteService(r),window.deleteDirector=r=>this.deleteDirector(r),(t=document.getElementById("news-form"))==null||t.addEventListener("submit",r=>this.handleAddNews(r)),(a=document.getElementById("partner-form"))==null||a.addEventListener("submit",r=>this.handleAddPartner(r)),(o=document.getElementById("service-form"))==null||o.addEventListener("submit",r=>this.handleAddService(r)),(n=document.getElementById("director-form"))==null||n.addEventListener("submit",r=>this.handleAddDirector(r)),window.handleDeleteRequest=r=>this.handleDeleteRequest(r)}static checkAuth(){document.getElementById("admin-pass").value==="admin123"?(localStorage.setItem("sindinor_admin_logged","true"),this.showAdminPanel()):alert("Senha incorreta!")}static showAdminPanel(){document.getElementById("auth-overlay").style.display="none",document.getElementById("admin-content").style.display="flex",this.loadData()}static logout(){localStorage.removeItem("sindinor_admin_logged"),location.reload()}static switchTab(t){document.querySelectorAll(".tab-content").forEach(o=>{o.classList.add("hidden"),o.classList.remove("active")}),document.querySelectorAll(".nav-btn").forEach(o=>o.classList.remove("active")),document.getElementById(`tab-${t}`).classList.remove("hidden"),document.getElementById(`tab-${t}`).classList.add("active");const a=document.querySelector(`button[onclick="switchTab('${t}')"]`);a&&a.classList.add("active")}static async loadData(){const t=await i.getNews(),a=document.getElementById("news-list");a&&(a.innerHTML="",t.forEach(e=>{a.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${e.title}</h4>
                            <small class="text-text-muted text-xs">${e.news_date}</small>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteNews('${e.id}')">Excluir</button>
                    </div>
                `}));const o=await i.getPartners(),n=document.getElementById("partners-list");n&&(n.innerHTML="",o.forEach(e=>{n.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${e.name}</h4>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deletePartner('${e.id}')">Excluir</button>
                    </div>
                `}));const r=await i.getServices(),s=document.getElementById("services-list");s&&(s.innerHTML="",r.forEach(e=>{s.innerHTML+=`
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${e.image}" alt="${e.title}" class="w-16 h-16 object-cover rounded border border-glass-border">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${e.title}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${e.description}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteService('${e.id}')">Excluir</button>
                    </div>
                `}));const c=await i.getDirectors(),u=document.getElementById("directors-list");u&&(u.innerHTML="",c.forEach(e=>{u.innerHTML+=`
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
                `}));const l=await i.getRequests(),d=document.getElementById("requests-list");d&&(l.length===0?d.innerHTML=`
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
                `).join(""))}static async deleteNews(t){confirm("Tem certeza que deseja excluir esta notícia?")&&(await i.deleteNews(t),this.loadData())}static async deletePartner(t){confirm("Tem certeza que deseja excluir este parceiro?")&&(await i.deletePartner(t),this.loadData())}static async deleteService(t){confirm("Tem certeza que deseja excluir este serviço?")&&(await i.deleteService(t),this.loadData())}static async deleteDirector(t){confirm("Tem certeza que deseja excluir este diretor?")&&(await i.deleteDirector(t),this.loadData())}static async handleAddNews(t){t.preventDefault();const a=document.getElementById("news-file");let n=document.getElementById("news-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(s){console.error("Error reading file",s),alert("Erro ao ler arquivo de imagem.");return}else n||(n="assets/news-placeholder.jpg");const r={title:document.getElementById("news-title").value,date:document.getElementById("news-date").value,img:n,link:document.getElementById("news-link").value};await i.addNews(r),alert("Notícia Publicada!"),this.loadData(),t.target.reset()}static async handleAddPartner(t){t.preventDefault(),console.log("Adding partner...");const a=document.getElementById("partner-file");let n=document.getElementById("partner-logo").value;if(a.files&&a.files[0]){console.log("Reading file:",a.files[0].name);try{n=await this.readFileAsBase64(a.files[0]),console.log("File read success, base64 length:",n.length)}catch(s){console.error("Error reading file",s),alert("Erro ao ler a imagem! Tente outro arquivo.");return}}if(!n&&!document.getElementById("partner-name").value){alert("Preencha pelo menos o nome!");return}const r={name:document.getElementById("partner-name").value,video:document.getElementById("partner-video").value,logo:n};try{await i.addPartner(r),console.log("Partner added to storage"),alert("Parceiro Adicionado com Sucesso!"),this.loadData(),t.target.reset()}catch(s){console.error(s),alert("Erro ao salvar: "+s.message)}}static async handleAddService(t){t.preventDefault();const a=document.getElementById("service-file");let n=document.getElementById("service-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(s){console.error("Error reading file",s);return}const r={title:document.getElementById("service-title").value,description:document.getElementById("service-desc").value,image:n};await i.addService(r),alert("Serviço Adicionado!"),this.loadData(),t.target.reset()}static async handleAddDirector(t){t.preventDefault();const a=document.getElementById("director-file");let n=document.getElementById("director-img").value;if(a.files&&a.files[0])try{n=await this.readFileAsBase64(a.files[0])}catch(s){console.error("Error reading file",s);return}const r={name:document.getElementById("director-name").value,role:document.getElementById("director-role").value,company:document.getElementById("director-company").value,image:n};await i.addDirector(r),alert("Diretor Adicionado!"),this.loadData(),t.target.reset()}static async handleDeleteRequest(t){confirm("Deseja excluir esta solicitação?")&&(await i.deleteRequest(t),this.loadData())}}m.init();
