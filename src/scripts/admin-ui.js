/**
 * Admin UI Module
 * Handles CMS logic interactions using ApiService (MySQL).
 */
console.log("AdminUI Module: Loading imports...");
import { ApiService } from '../services/api.js';
import { auth } from '../services/firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

export class AdminUI {
    // Helper to read file
    static readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = event => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    // Compression Logic (Improved Quality)
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1920;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Return compressed JPEG (High Quality)
                    resolve(canvas.toDataURL('image/jpeg', 0.9));
                };
                img.onerror = err => reject(err);
            };
            reader.onerror = error => reject(error);
        });
    }

    static setupLivePreviews() {
        // Director Preview
        const dirInput = document.getElementById('director-img');
        const dirFile = document.getElementById('director-file');
        const dirPreview = document.getElementById('director-preview-img');

        if (dirInput && dirPreview) {
            dirInput.addEventListener('input', (e) => {
                if (!e.target.value) {
                    dirPreview.src = 'assets/avatar_placeholder.png';
                } else {
                    dirPreview.src = e.target.value;
                }
            });
        }

        if (dirFile && dirPreview) {
            dirFile.addEventListener('change', async (e) => {
                if (e.target.files && e.target.files[0]) {
                    try {
                        const base64 = await this.readFileAsBase64(e.target.files[0]);
                        dirPreview.src = base64;
                        // Also update text input to empty to avoid confusion? 
                        // Or keep as is. Best to clear text input if file used.
                        if (dirInput) dirInput.value = '';
                    } catch (err) {
                        console.error(err);
                    }
                }
            });
        }
    }

    static init() {
        console.log("AdminUI: Initializing...");
        // Initialize Global Editor (still used for other tabs if needed)
        this.globalEditor = new Quill('#global-editor', {
            theme: 'snow',
            placeholder: 'Escreva seu conteúdo aqui...',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'clean']
                ]
            }
        });

        // Initialize News Inline Editor (Admin 2.0)
        // Check if element exists first (it exists in our new HTML)
        if (document.getElementById('news-inline-editor')) {
            this.newsInlineEditor = new Quill('#news-inline-editor', {
                theme: 'snow',
                placeholder: 'Escreva o artigo completo...',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video', 'clean']
                    ]
                }
            });
        }

        // Auth Check
        window.checkAuth = () => this.checkAuth();
        window.logout = () => this.logout();

        // Editor Functions
        window.AdminUI = this; // Expose to window for HTML onclick

        this.setupLivePreviews();

        // Listen for Auth State
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.showAdminPanel();
            } else {
                this.showLogin();
            }
        });

        // Tab Switching
        window.switchTab = (tab) => this.switchTab(tab);

        // Delete Functions
        window.deleteNews = (id) => this.deleteNews(id);
        window.deletePartner = (id) => this.deletePartner(id);
        window.deleteService = (id) => this.deleteService(id);
        window.deleteDirector = (id) => this.deleteDirector(id);
        window.editService = (id) => this.editService(id);
        window.editDirector = (id) => this.editDirector(id);
        window.moveDirector = (id, direction) => this.moveDirector(id, direction);
        window.removeServiceGalleryItem = (idx) => this.removeServiceGalleryItem(idx);
        window.removeNewsGalleryItem = (idx) => this.removeNewsGalleryItem(idx);
        window.handleDeleteRequest = (id) => this.handleDeleteRequest(id);

        // Event Listeners
        document.getElementById('news-form')?.addEventListener('submit', (e) => this.handleAddNews(e));
        document.getElementById('partner-form')?.addEventListener('submit', (e) => this.handleAddPartner(e));
        document.getElementById('service-form')?.addEventListener('submit', (e) => this.handleAddService(e));
        document.getElementById('director-form')?.addEventListener('submit', (e) => this.handleAddDirector(e));

        // State for Editing
        this.editingNewsId = null;
        window.editNews = (id) => this.editNews(id);

        // Test Admin Creation
        window.createTestAdmin = () => this.createTestAdmin();
        window.updateDirectorOrder = (id, newOrder) => this.updateDirectorOrder(id, newOrder);
    }

    // View Toggling (Admin 2.0)
    static showNewsForm() {
        document.getElementById('view-news-list').classList.add('hidden');
        document.getElementById('view-news-form').classList.remove('hidden');

        // Update Title based on mode
        const title = this.editingNewsId ? 'Editar Notícia' : 'Nova Notícia';
        document.getElementById('news-form-title').innerText = title;

        // Reset form ONLY if NOT editing
        if (!this.editingNewsId) {
            document.getElementById('news-form').reset();
            if (this.newsInlineEditor) this.newsInlineEditor.setText('');
            this.editingNewsGallery = [];
            this.renderNewsGalleryPreview();
        }
    }

    static showNewsList() {
        document.getElementById('view-news-form').classList.add('hidden');
        document.getElementById('view-news-list').classList.remove('hidden');
        this.editingNewsId = null; // Reset editing state
    }

    // Modal Editor Logic
    static currentEditorTarget = null;
    static currentPreviewTarget = null;

    static openEditor(targetId, title, previewId) {
        this.currentEditorTarget = targetId;
        this.currentPreviewTarget = previewId;

        const existingContent = document.getElementById(targetId).value;
        this.globalEditor.clipboard.dangerouslyPasteHTML(existingContent || '');

        document.getElementById('editor-modal-title').innerText = title;
        document.getElementById('editor-modal').classList.remove('hidden');
    }

    static closeEditor() {
        document.getElementById('editor-modal').classList.add('hidden');
        this.currentEditorTarget = null;
        this.currentPreviewTarget = null;
    }

    static saveEditor() {
        if (!this.currentEditorTarget) return;

        const content = this.globalEditor.root.innerHTML;
        document.getElementById(this.currentEditorTarget).value = content;

        // Update preview
        if (this.currentPreviewTarget) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const textPreview = tempDiv.textContent || tempDiv.innerText || '';
            document.getElementById(this.currentPreviewTarget).innerText = textPreview.substring(0, 150) + (textPreview.length > 150 ? '...' : '');
            document.getElementById(this.currentPreviewTarget).classList.remove('opacity-70', 'italic');
        }

        this.closeEditor();
    }

    static async checkAuth() {
        console.log("AdminUI: checkAuth called");
        const email = document.getElementById('admin-email').value;
        const pass = document.getElementById('admin-pass').value;

        try {
            await signInWithEmailAndPassword(auth, email, pass);
            // onAuthStateChanged will handle the UI switch
        } catch (error) {
            console.error("Login Error:", error);
            alert('E-mail ou senha incorretos! (Erro: ' + error.code + ')');
        }
    }

    static async logout() {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    }

    static async createTestAdmin() {
        try {
            await createUserWithEmailAndPassword(auth, 'admin@sindinor.com', '123456');
            alert('Usuário admin@sindinor.com criado com sucesso! Senha: 123456');
            this.checkAuth(); // Auto login
        } catch (error) {
            console.error("Create Admin Error:", error);
            if (error.code === 'auth/email-already-in-use') {
                alert('O usuário admin@sindinor.com já existe. Tente fazer login com a senha 123456.');
            } else {
                alert('Erro ao criar admin: ' + error.message);
            }
        }
    }

    static showLogin() {
        document.getElementById('auth-overlay').style.display = 'flex';
        document.getElementById('admin-content').style.display = 'none';
    }

    static showAdminPanel() {
        document.getElementById('auth-overlay').style.display = 'none';
        document.getElementById('admin-content').style.display = 'flex';
        this.loadData();
        this.switchTab('news');
    }

    static switchTab(tab) {
        document.querySelectorAll('.tab-content').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('active');
        });
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

        document.getElementById(`tab-${tab}`).classList.remove('hidden');
        document.getElementById(`tab-${tab}`).classList.add('active');
        const btn = document.querySelector(`button[onclick="switchTab('${tab}')"]`);
        if (btn) btn.classList.add('active');
    }

    static async loadData() {
        // Parallel loading for better performance
        const [news, partners, services, directors, requests] = await Promise.all([
            ApiService.getNews(),
            ApiService.getPartners(),
            ApiService.getServices(),
            ApiService.getDirectors(),
            ApiService.getRequests()
        ]);

        // Render News
        const newsGrid = document.getElementById('news-grid');
        if (newsGrid) {
            newsGrid.innerHTML = '';
            if (news.length === 0) {
                newsGrid.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center text-text-muted py-20 border-2 border-dashed border-glass-border rounded-xl">
                    <i class="fas fa-newspaper text-6xl mb-4 opacity-50"></i>
                    <p class="uppercase tracking-widest font-bold">Nenhuma notícia publicada</p>
                </div>
            `;
            } else {
                news.forEach((item) => {
                    const date = new Date(item.news_date).toLocaleDateString();
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = item.content;
                    const summary = (tempDiv.textContent || tempDiv.innerText || '').substring(0, 150) + '...';

                    newsGrid.innerHTML += `
                    <div class="bg-secondary-dark border border-glass-border rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:border-accent-cyan group flex flex-col h-full animate-fade-in">
                        <div class="h-48 overflow-hidden relative">
                             <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                             <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                             <div class="absolute bottom-3 left-3">
                                 <span class="text-accent-cyan text-[10px] font-bold uppercase tracking-widest bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-glass-border">
                                    <i class="far fa-calendar-alt mr-1"></i> ${date}
                                 </span>
                             </div>
                        </div>
                        <div class="p-6 flex flex-col flex-grow">
                            <h4 class="font-heading font-bold text-white text-lg mb-3 line-clamp-2 leading-tight group-hover:text-accent-cyan transition-colors">${item.title}</h4>
                            <p class="text-text-muted text-sm line-clamp-3 mb-6 flex-grow font-light border-l-2 border-glass-border pl-3">
                               ${summary}
                            </p>
                            <div class="flex justify-between items-center pt-4 border-t border-glass-border mt-auto">
                                <button onclick="window.editNews('${item.id}')" 
                                    class="text-accent-cyan hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button onclick="window.deleteNews('${item.id}')" 
                                    class="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors">
                                    <i class="fas fa-trash"></i> Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                });
            }
        }

        // Render Partners
        const partnersGrid = document.getElementById('partners-grid');
        if (partnersGrid) {
            partnersGrid.innerHTML = '';
            if (partners.length === 0) {
                partnersGrid.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center text-text-muted py-20 border-2 border-dashed border-glass-border rounded-xl">
                        <i class="fas fa-handshake text-6xl mb-4 opacity-50"></i>
                        <p class="uppercase tracking-widest font-bold">Nenhum parceiro cadastrado</p>
                    </div>`;
            } else {
                partners.forEach((item) => {
                    partnersGrid.innerHTML += `
                        <div class="bg-secondary-dark border border-glass-border rounded-xl p-6 flex flex-col items-center text-center group hover:border-accent-cyan transition-colors shadow-lg hover:shadow-cyan-500/10">
                            <div class="w-24 h-24 mb-4 bg-white/5 rounded-full p-4 border border-glass-border flex items-center justify-center">
                                <img src="${item.logo || 'assets/logo_placeholder.png'}" alt="${item.name}" class="max-w-full max-h-full object-contain">
                            </div>
                            <h4 class="font-heading font-bold text-xl text-white mb-2 group-hover:text-accent-cyan transition-colors">${item.name}</h4>
                            <p class="text-text-muted text-sm line-clamp-2 mb-4 font-light">${item.description || 'Sem descrição'}</p>
                            
                            <div class="flex gap-2 w-full mt-auto pt-4 border-t border-glass-border justify-center">
                                <button class="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors" onclick="window.deletePartner('${item.id}')">
                                    <i class="fas fa-trash"></i> Excluir
                                </button>
                            </div>
                        </div>
                    `;
                });
            }
        }

        // Render Services
        const servicesGrid = document.getElementById('services-list');
        if (servicesGrid) {
            servicesGrid.innerHTML = '';
            if (services.length === 0) {
                servicesGrid.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center text-text-muted py-20 border-2 border-dashed border-glass-border rounded-xl">
                        <i class="fas fa-concierge-bell text-6xl mb-4 opacity-50"></i>
                        <p class="uppercase tracking-widest font-bold">Nenhum serviço cadastrado</p>
                    </div>`;
            } else {
                services.forEach((item) => {
                    servicesGrid.innerHTML += `
                        <div class="bg-secondary-dark border border-glass-border rounded-xl p-6 flex flex-col group hover:border-accent-cyan transition-colors shadow-lg hover:shadow-cyan-500/10 h-full">
                            <div class="w-16 h-16 mb-6 bg-white/5 rounded-lg p-3 border border-glass-border flex items-center justify-center self-start">
                                <img src="${item.image || 'assets/logo_placeholder.png'}" alt="${item.title}" class="w-full h-full object-contain">
                            </div>
                            <h4 class="font-heading font-bold text-xl text-white mb-3 group-hover:text-accent-cyan transition-colors">${item.title}</h4>
                            <p class="text-text-muted text-sm line-clamp-3 mb-6 font-light border-l-2 border-glass-border pl-4">${item.description}</p>
                            
                            <div class="flex gap-3 mt-auto pt-6 border-t border-glass-border">
                                 <button class="flex-1 text-accent-cyan hover:text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 px-4 py-3 rounded bg-accent-cyan/10 hover:bg-accent-cyan/20 transition-colors" onclick="window.editService('${item.id}')">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button class="flex-1 text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 px-4 py-3 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors" onclick="window.deleteService('${item.id}')">
                                    <i class="fas fa-trash"></i> Excluir
                                </button>
                            </div>
                        </div>
                    `;
                });
            }
        }

        // Render Directors
        const directorsGrid = document.getElementById('directors-list');
        if (directorsGrid) {
            directorsGrid.innerHTML = '';
            if (directors.length === 0) {
                directorsGrid.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center text-text-muted py-20 border-2 border-dashed border-glass-border rounded-xl">
                        <i class="fas fa-users text-6xl mb-4 opacity-50"></i>
                        <p class="uppercase tracking-widest font-bold">Nenhum diretor cadastrado</p>
                    </div>`;
            } else {
                directors.forEach((item) => {
                    directorsGrid.innerHTML += `
                        <div class="bg-secondary-dark border border-glass-border rounded-xl p-6 flex flex-col items-center text-center group hover:border-accent-cyan transition-colors shadow-lg hover:shadow-cyan-500/10 relative">
                            <div class="w-32 h-32 mb-4 relative">
                                <div class="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                <img src="${item.image || 'assets/avatar_placeholder.png'}" alt="${item.name}" class="w-full h-full rounded-full border-4 border-glass-border object-cover relative z-10 group-hover:border-accent-cyan transition-colors">
                            </div>
                            
                            <h4 class="font-heading font-bold text-xl text-white mb-1 group-hover:text-accent-cyan transition-colors">${item.name}</h4>
                            <p class="text-accent-cyan text-xs font-black uppercase tracking-widest mb-1">${item.role}</p>
                            <p class="text-text-muted text-xs font-medium mb-6">${item.company || ''}</p>
                            
                            <div class="w-full mt-auto pt-4 border-t border-glass-border flex flex-col gap-2">
                                <div class="flex items-center gap-2 mb-2 bg-glass-bg p-2 rounded">
                                    <label class="text-accent-cyan text-xs font-bold uppercase tracking-widest whitespace-nowrap">Ordem:</label>
                                    <input type="number" value="${item.order !== undefined ? item.order : 99}" 
                                        class="w-full bg-primary-dark border border-glass-border rounded px-2 py-1 text-white text-center font-bold focus:border-accent-cyan outline-none"
                                        onchange="window.updateDirectorOrder('${item.id}', this.value)">
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <button class="text-accent-cyan hover:text-white hover:bg-accent-cyan/10 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 px-4 py-2 rounded transition-all" onclick="window.editDirector('${item.id}')">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                    <button class="text-red-500 hover:text-white hover:bg-red-500/80 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 px-4 py-2 rounded transition-all" onclick="window.deleteDirector('${item.id}')">
                                        <i class="fas fa-trash"></i> Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
        }

        // Render Requests
        const requestsList = document.getElementById('requests-list');
        if (requestsList) {
            if (requests.length === 0) {
                requestsList.innerHTML = `
                        <div class="bg-secondary-dark/50 border border-dashed border-glass-border p-12 rounded-xl text-center col-span-full">
                            <i class="fas fa-inbox text-4xl text-text-muted mb-4"></i>
                            <p class="text-text-muted">Nenhuma solicitação encontrada.</p>
                        </div>
                    `;
            } else {
                requestsList.innerHTML = requests.map(r => `
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
                                    <a href="https://wa.me/55${r.phone.replace(/\D/g, '')}" target="_blank" 
                                        class="flex items-center gap-2 mt-2 text-green-400 hover:text-green-300 text-xs font-bold uppercase">
                                        <i class="fab fa-whatsapp"></i> Chamar
                                    </a>
                                </div>
                            </div>
                            <div class="bg-primary-dark/50 p-4 rounded-lg border border-glass-border mt-auto">
                                <span class="block text-accent-cyan text-[9px] uppercase font-black tracking-tighter mb-2 opacity-70">Mensagem</span>
                                <p class="text-text-muted text-sm italic leading-relaxed">"${r.message}"</p>
                            </div>
                        </div>
                    `).join('');
            }
        }
    }

    // --- PARTNERS VIEW TOGGLING ---
    static showPartnerForm() {
        document.getElementById('view-partners-list').classList.add('hidden');
        document.getElementById('view-partners-form').classList.remove('hidden');
        document.getElementById('partner-form-title').innerText = 'Novo Parceiro';
        document.getElementById('partner-form').reset();
    }

    static showPartnerList() {
        document.getElementById('view-partners-form').classList.add('hidden');
        document.getElementById('view-partners-list').classList.remove('hidden');
    }

    static showServiceForm(shouldReset = true) {
        document.getElementById('view-services-list').classList.add('hidden');
        document.getElementById('view-services-form').classList.remove('hidden');

        if (shouldReset) {
            document.getElementById('service-form-title').innerHTML = '<span class="w-1 h-8 bg-accent-cyan rounded-full"></span> Novo Serviço';
            document.getElementById('service-form').reset();
            document.getElementById('service-content-raw').value = '';
            document.getElementById('service-content-preview').innerText = '(O conteúdo aparecerá aqui após a edição...)';
            this.editingServiceId = null;
            this.editingGallery = [];
        }
    }

    static showServiceList() {
        document.getElementById('view-services-form').classList.add('hidden');
        document.getElementById('view-services-list').classList.remove('hidden');
    }

    static showDirectorForm(shouldReset = true) {
        document.getElementById('view-directors-list').classList.add('hidden');
        document.getElementById('view-directors-form').classList.remove('hidden');

        if (shouldReset) {
            document.getElementById('director-form-title').innerText = 'Novo Diretor';
            document.getElementById('director-form').reset();
            document.getElementById('director-preview-img').src = 'assets/avatar_placeholder.png';
            document.getElementById('director-img').value = '';
        }
    }

    static showDirectorList() {
        document.getElementById('view-directors-form').classList.add('hidden');
        document.getElementById('view-directors-list').classList.remove('hidden');
    }

    static async deleteNews(id) {
        if (confirm('Tem certeza que deseja excluir esta notícia?')) {
            await ApiService.deleteNews(id);
            this.loadData();
        }
    }

    static async deletePartner(id) {
        if (confirm('Tem certeza que deseja excluir este parceiro?')) {
            await ApiService.deletePartner(id);
            this.loadData();
        }
    }

    static async deleteService(id) {
        if (confirm('Tem certeza que deseja excluir este serviço?')) {
            await ApiService.deleteService(id);
            this.loadData();
        }
    }

    static async deleteDirector(id) {
        if (confirm('Tem certeza que deseja excluir este diretor?')) {
            await ApiService.deleteDirector(id);
            this.loadData();
        }
    }

    static editingNewsGallery = [];

    static async handleAddNews(e) {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
        button.disabled = true;

        try {
            const fileInput = document.getElementById('news-file');
            const urlInput = document.getElementById('news-img');
            let imageSrc = urlInput.value;

            // Read File if present
            if (fileInput.files && fileInput.files[0]) {
                try {
                    imageSrc = await this.readFileAsBase64(fileInput.files[0]);
                } catch (err) {
                    console.error('Error reading file', err);
                    alert('Erro ao ler arquivo de imagem.');
                    return;
                }
            } else if (!imageSrc && !this.editingNewsId) {
                imageSrc = 'assets/news-placeholder.jpg';
            }

            // Gallery processing
            let gallery = [...this.editingNewsGallery];

            // Add new URLs from input
            const galleryUrlsInput = document.getElementById('news-gallery-urls');
            if (galleryUrlsInput && galleryUrlsInput.value) {
                const newUrls = galleryUrlsInput.value.split(',').map(u => u.trim()).filter(u => u);
                gallery = [...gallery, ...newUrls];
            }

            // Add new files from input
            const galleryFiles = document.getElementById('news-gallery-files');
            if (galleryFiles && galleryFiles.files && galleryFiles.files.length > 0) {
                for (let i = 0; i < galleryFiles.files.length; i++) {
                    try {
                        const base64 = await this.readFileAsBase64(galleryFiles.files[i]);
                        gallery.push(base64);
                    } catch (err) {
                        console.error('Error reading gallery file', err);
                    }
                }
            }

            const content = this.newsInlineEditor ? this.newsInlineEditor.root.innerHTML : '';

            const newItem = {
                title: document.getElementById('news-title').value,
                news_date: document.getElementById('news-date').value,
                img: imageSrc,
                content: content,
                gallery: gallery
            };

            if (this.editingNewsId) {
                await ApiService.updateNews(this.editingNewsId, newItem);
                alert('Notícia Atualizada!');
            } else {
                await ApiService.addNews(newItem);
                alert('Notícia Publicada!');
            }

            this.loadData();
            this.showNewsList();

        } catch (error) {
            console.error(error);
            alert('Erro ao salvar notícia: ' + error.message);
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }

    static async handleAddPartner(e) {
        e.preventDefault();
        const newItem = {
            name: document.getElementById('partner-name').value,
            logo: document.getElementById('partner-logo-url').value, // Simplified
            description: document.getElementById('partner-desc').value,
            video_url: document.getElementById('partner-video').value
        };

        try {
            await ApiService.addPartner(newItem);
            this.loadData();
            this.showPartnerList();
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert('Erro: ' + error.message);
        }
    }

    static async editNews(id) {
        const news = await ApiService.getNews();
        const item = news.find(n => n.id === id);

        if (!item) {
            alert('Erro: Notícia não encontrada.');
            return;
        }

        this.editingNewsId = id;

        document.getElementById('news-title').value = item.title;
        document.getElementById('news-date').value = item.news_date;
        document.getElementById('news-img').value = item.img || '';

        if (this.newsInlineEditor) {
            this.newsInlineEditor.clipboard.dangerouslyPasteHTML(item.content || '');
        }

        this.editingNewsGallery = item.gallery || [];
        this.renderNewsGalleryPreview();

        this.showNewsForm();
    }

    static renderNewsGalleryPreview() {
        const preview = document.getElementById('news-gallery-preview');
        if (!preview) return;

        preview.innerHTML = this.editingNewsGallery.map((img, idx) => `
            <div class="relative w-16 h-16 rounded border border-glass-border overflow-hidden bg-white/5 group">
                <img src="${img}" class="w-full h-full object-cover">
                <button type="button" onclick="window.removeNewsGalleryItem(${idx})" class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        if (this.editingNewsGallery.length === 0) {
            preview.innerHTML = '<p class="text-text-muted text-[10px] uppercase tracking-widest italic">Nenhuma foto na galeria</p>';
        }
    }

    static removeNewsGalleryItem(idx) {
        this.editingNewsGallery.splice(idx, 1);
        this.renderNewsGalleryPreview();
    }

    static async handleAddPartner(e) {
        e.preventDefault();
        console.log('Adding partner...');

        const fileInput = document.getElementById('partner-file');
        const urlInput = document.getElementById('partner-logo');
        let logoSrc = urlInput.value;

        if (fileInput.files && fileInput.files[0]) {
            console.log('Reading file:', fileInput.files[0].name);
            try {
                logoSrc = await this.readFileAsBase64(fileInput.files[0]);
                console.log('File read success, base64 length:', logoSrc.length);
            } catch (err) {
                console.error('Error reading file', err);
                alert('Erro ao ler a imagem! Tente outro arquivo.');
                return;
            }
        }

        if (!logoSrc && !document.getElementById('partner-name').value) {
            alert('Preencha pelo menos o nome!');
            return;
        }

        const newItem = {
            name: document.getElementById('partner-name').value,
            description: document.getElementById('partner-desc').value,
            video_url: document.getElementById('partner-video').value,
            logo: logoSrc
        };

        try {
            await ApiService.addPartner(newItem);
            console.log('Partner added to storage');
            alert('Parceiro Adicionado com Sucesso!');
            this.loadData();
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar: ' + error.message);
        }
    }

    static editingGallery = [];

    static async handleAddService(e) {
        e.preventDefault();

        const editingId = document.getElementById('editing-service-id').value;
        const fileInput = document.getElementById('service-file');
        const urlInput = document.getElementById('service-img');
        let imageSrc = urlInput.value;

        if (fileInput.files && fileInput.files[0]) {
            try {
                imageSrc = await this.readFileAsBase64(fileInput.files[0]);
            } catch (err) {
                console.error('Error reading file', err);
                return;
            }
        }

        // Gallery processing: Start with existing images in preview
        let gallery = [...this.editingGallery];

        // Add new URLs from input
        const galleryUrlsInput = document.getElementById('service-gallery-urls');
        if (galleryUrlsInput.value) {
            const newUrls = galleryUrlsInput.value.split(',').map(u => u.trim()).filter(u => u);
            gallery = [...gallery, ...newUrls];
        }

        // Add new files from input
        const galleryFiles = document.getElementById('service-gallery-files');
        if (galleryFiles.files && galleryFiles.files.length > 0) {
            for (let i = 0; i < galleryFiles.files.length; i++) {
                try {
                    const base64 = await this.readFileAsBase64(galleryFiles.files[i]);
                    gallery.push(base64);
                } catch (err) {
                    console.error('Error reading gallery file', err);
                }
            }
        }

        const itemData = {
            title: document.getElementById('service-title').value,
            description: document.getElementById('service-desc').value,
            full_description: document.getElementById('service-content-raw').value,
            image: imageSrc,
            gallery: gallery
        };

        if (editingId) {
            await ApiService.updateService(editingId, itemData);
            alert('Serviço Atualizado!');
        } else {
            await ApiService.addService(itemData);
            alert('Serviço Adicionado!');
        }

        this.loadData();
        e.target.reset();
        document.getElementById('service-content-raw').value = '';
        document.getElementById('service-content-preview').innerText = '(O conteúdo aparecerá aqui após a edição...)';
        document.getElementById('service-content-preview').classList.add('opacity-70', 'italic');
        this.editingGallery = [];
        this.renderGalleryPreview();
        document.getElementById('editing-service-id').value = '';
        this.showServiceList();
    }

    static async editService(id) {
        const services = await ApiService.getServices();
        const item = services.find(s => s.id === id);
        if (!item) return;

        // Fill Form
        document.getElementById('editing-service-id').value = item.id;
        document.getElementById('service-title').value = item.title;
        document.getElementById('service-desc').value = item.description;

        // Load Content
        const content = item.full_description || '';
        document.getElementById('service-content-raw').value = content;

        // Update Preview
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const textPreview = tempDiv.textContent || tempDiv.innerText || '';
        document.getElementById('service-content-preview').innerText = textPreview.substring(0, 150) + (textPreview.length > 150 ? '...' : '');
        document.getElementById('service-content-preview').classList.remove('opacity-70', 'italic');

        document.getElementById('service-img').value = item.image.startsWith('data:') ? '' : item.image;
        document.getElementById('service-gallery-urls').value = ''; // Clean URL input on edit

        // Load Gallery into preview
        this.editingGallery = item.gallery ? [...item.gallery] : [];
        this.renderGalleryPreview();

        // Update Title UI
        document.getElementById('service-form-title').innerHTML = '<span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Editar Serviço';

        // Scroll to form
        // Scroll to form
        this.showServiceForm(false);
    }

    static renderGalleryPreview() {
        const preview = document.getElementById('service-gallery-preview');
        if (!preview) return;

        preview.innerHTML = this.editingGallery.map((img, idx) => `
            <div class="relative w-16 h-16 rounded border border-glass-border overflow-hidden bg-white/5 group">
                <img src="${img}" class="w-full h-full object-cover">
                <button type="button" onclick="window.removeServiceGalleryItem(${idx})" class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        if (this.editingGallery.length === 0) {
            preview.innerHTML = '<p class="text-text-muted text-[10px] uppercase tracking-widest italic">Nenhuma foto na galeria</p>';
        }
    }

    static removeServiceGalleryItem(idx) {
        this.editingGallery.splice(idx, 1);
        this.renderGalleryPreview();
    }

    static async handleAddDirector(e) {
        e.preventDefault();

        const fileInput = document.getElementById('director-file');
        const urlInput = document.getElementById('director-img');
        let imageSrc = urlInput ? urlInput.value : '';

        if (fileInput.files && fileInput.files[0]) {
            try {
                imageSrc = await this.readFileAsBase64(fileInput.files[0]);
            } catch (err) {
                console.error('Error reading file', err);
                return;
            }
        }

        // Check if editing
        const editingId = document.getElementById('editing-director-id').value;
        const newItem = {
            name: document.getElementById('director-name').value,
            role: document.getElementById('director-role').value,
            company: document.getElementById('director-company').value,
            image: imageSrc
        };

        try {
            if (editingId) {
                // UPDATE
                await ApiService.updateDirector(editingId, newItem);
                alert('Diretor Atualizado!');
            } else {
                // CREATE
                // Get max order
                const directors = await ApiService.getDirectors();
                const maxOrder = directors.reduce((max, d) => Math.max(max, d.order || 0), 0);
                newItem.order = maxOrder + 1;

                await ApiService.addDirector(newItem);
                alert('Diretor Adicionado!');
            }

            this.loadData();
            e.target.reset();
            document.getElementById('director-img').value = '';
            document.getElementById('editing-director-id').value = ''; // Clear ID
            this.showDirectorList();
        } catch (error) {
            console.error(error);
            alert('Erro: ' + error.message);
        }
    }

    static async editDirector(id) {
        const directors = await ApiService.getDirectors();
        const director = directors.find(d => d.id === id);
        if (!director) return;

        document.getElementById('editing-director-id').value = director.id;
        document.getElementById('director-name').value = director.name;
        document.getElementById('director-role').value = director.role;
        document.getElementById('director-company').value = director.company || '';
        document.getElementById('director-img').value = director.image || ''; // URL input

        document.getElementById('director-img').value = director.image || ''; // URL input

        const preview = document.getElementById('director-preview-img');
        if (preview) preview.src = director.image || 'assets/avatar_placeholder.png';

        // Switch to Form
        this.showDirectorForm(false);
        document.getElementById('director-form-title').innerText = 'Editar Membro';
    }
    static async updateDirectorOrder(id, newOrder) {
        const order = parseInt(newOrder);
        if (isNaN(order)) return;

        await ApiService.updateDirector(id, { order: order });
        // No full reload needed, maybe just toast?
        // But to re-sort visually we need reload
        this.loadData();
    }

    static async handleDeleteRequest(id) {
        if (confirm('Deseja excluir esta solicitação?')) {
            await ApiService.deleteRequest(id);
            this.loadData();
        }
    }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("AdminUI: Booting initialization...");
        console.log("AdminUI: Booting initialization...");
        // Initialize directly using the class from module scope
        AdminUI.init();
        console.log("AdminUI: Initialization complete.");
    } catch (e) {
        console.error("AdminUI: Fatal Init Error:", e);
        alert("Erro fatal ao iniciar AdminUI: " + e.message);
    }
});
