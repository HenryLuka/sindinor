/**
 * Admin UI Module
 * Handles CMS logic interactions using ApiService (MySQL).
 */
import { ApiService } from '../services/api.js';

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
                    // Compression Logic
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
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

                    // Return compressed JPEG
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = err => reject(err);
            };
            reader.onerror = error => reject(error);
        });
    }

    static init() {
        // Auth Check
        window.checkAuth = () => this.checkAuth();
        window.logout = () => this.logout();

        // Check for existing session
        if (localStorage.getItem('sindinor_admin_logged') === 'true') {
            this.showAdminPanel();
        }

        // Tab Switching
        window.switchTab = (tab) => this.switchTab(tab);

        // Delete Functions
        window.deleteNews = (id) => this.deleteNews(id);
        window.deletePartner = (id) => this.deletePartner(id);
        window.deleteService = (id) => this.deleteService(id);
        window.deleteDirector = (id) => this.deleteDirector(id);

        // Event Listeners
        document.getElementById('news-form')?.addEventListener('submit', (e) => this.handleAddNews(e));
        document.getElementById('partner-form')?.addEventListener('submit', (e) => this.handleAddPartner(e));
        document.getElementById('service-form')?.addEventListener('submit', (e) => this.handleAddService(e));
        document.getElementById('director-form')?.addEventListener('submit', (e) => this.handleAddDirector(e));
        window.handleDeleteRequest = (id) => this.handleDeleteRequest(id);
    }

    static checkAuth() {
        const pass = document.getElementById('admin-pass').value;
        if (pass === 'admin123') {
            localStorage.setItem('sindinor_admin_logged', 'true');
            this.showAdminPanel();
        } else {
            alert('Senha incorreta!');
        }
    }

    static showAdminPanel() {
        document.getElementById('auth-overlay').style.display = 'none';
        document.getElementById('admin-content').style.display = 'flex';
        this.loadData();
    }

    static logout() {
        localStorage.removeItem('sindinor_admin_logged');
        location.reload();
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
        // News
        const news = await ApiService.getNews();
        const newsList = document.getElementById('news-list');
        if (newsList) {
            newsList.innerHTML = '';
            news.forEach((item) => {
                newsList.innerHTML += `
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${item.title}</h4>
                            <small class="text-text-muted text-xs">${item.news_date}</small>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteNews('${item.id}')">Excluir</button>
                    </div>
                `;
            });
        }

        // Partners
        const partners = await ApiService.getPartners();
        const partnerList = document.getElementById('partners-list');
        if (partnerList) {
            partnerList.innerHTML = '';
            partners.forEach((item) => {
                partnerList.innerHTML += `
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex justify-between items-center group hover:border-accent-cyan transition-colors">
                        <div>
                            <h4 class="font-bold text-white">${item.name}</h4>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deletePartner('${item.id}')">Excluir</button>
                    </div>
                `;
            });
        }

        // Services
        const services = await ApiService.getServices();
        const servicesList = document.getElementById('services-list');
        if (servicesList) {
            servicesList.innerHTML = '';
            services.forEach((item) => {
                servicesList.innerHTML += `
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded border border-glass-border">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${item.title}</h4>
                            <p class="text-text-muted text-xs line-clamp-1">${item.description}</p>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteService('${item.id}')">Excluir</button>
                    </div>
                `;
            });
        }

        // Directors
        const directors = await ApiService.getDirectors();
        const directorsList = document.getElementById('directors-list');
        if (directorsList) {
            directorsList.innerHTML = '';
            directors.forEach((item) => {
                directorsList.innerHTML += `
                    <div class="bg-secondary-dark border border-glass-border p-4 rounded-lg flex gap-4 items-center group hover:border-accent-cyan transition-colors">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-full border-2 border-glass-border object-cover">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${item.name}</h4>
                            <div class="flex gap-2 text-xs">
                                <span class="text-accent-cyan font-bold uppercase">${item.role}</span>
                                <span class="text-text-muted">| ${item.company}</span>
                            </div>
                        </div>
                        <button class="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition" onclick="deleteDirector('${item.id}')">Excluir</button>
                    </div>
                `;
            });
        }

        // Requests
        const requests = await ApiService.getRequests();
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
                                <p class="text-text-muted text-xs font-medium">${r.city}</p>
                            </div>
                        </div>

                        <div class="flex items-center justify-between border-t border-glass-border pt-4">
                            <span class="text-text-muted text-[10px] font-bold uppercase tracking-widest">
                                <i class="far fa-calendar-alt mr-1"></i> ${new Date(r.date).toLocaleDateString('pt-BR')}
                            </span>
                            <a href="https://wa.me/55${r.phone.replace(/\D/g, '')}" target="_blank" 
                               class="flex items-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full transition-all duration-300">
                                <i class="fab fa-whatsapp"></i> Contatar
                            </a>
                        </div>
                    </div>
                `).join('');
            }
        }
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

    static async handleAddNews(e) {
        e.preventDefault();

        const fileInput = document.getElementById('news-file');
        const urlInput = document.getElementById('news-img');
        let imageSrc = urlInput.value;

        if (fileInput.files && fileInput.files[0]) {
            try {
                imageSrc = await this.readFileAsBase64(fileInput.files[0]);
            } catch (err) {
                console.error('Error reading file', err);
                alert('Erro ao ler arquivo de imagem.');
                return;
            }
        } else if (!imageSrc) {
            // Fallback handling or empty allowed? Let's check require
            imageSrc = 'assets/news-placeholder.jpg';
        }

        const newItem = {
            title: document.getElementById('news-title').value,
            date: document.getElementById('news-date').value,
            img: imageSrc,
            link: document.getElementById('news-link').value
        };

        await ApiService.addNews(newItem);
        alert('Notícia Publicada!');
        this.loadData();
        e.target.reset();
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
            video: document.getElementById('partner-video').value,
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

    static async handleAddService(e) {
        e.preventDefault();

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

        const newItem = {
            title: document.getElementById('service-title').value,
            description: document.getElementById('service-desc').value,
            image: imageSrc
        };

        await ApiService.addService(newItem);
        alert('Serviço Adicionado!');
        this.loadData();
        e.target.reset();
    }

    static async handleAddDirector(e) {
        e.preventDefault();

        const fileInput = document.getElementById('director-file');
        const urlInput = document.getElementById('director-img');
        let imageSrc = urlInput.value;

        if (fileInput.files && fileInput.files[0]) {
            try {
                imageSrc = await this.readFileAsBase64(fileInput.files[0]);
            } catch (err) {
                console.error('Error reading file', err);
                return;
            }
        }

        const newItem = {
            name: document.getElementById('director-name').value,
            role: document.getElementById('director-role').value,
            company: document.getElementById('director-company').value,
            image: imageSrc
        };

        await ApiService.addDirector(newItem);
        alert('Diretor Adicionado!');
        this.loadData();
        e.target.reset();
    }

    static async handleDeleteRequest(id) {
        if (confirm('Deseja excluir esta solicitação?')) {
            await ApiService.deleteRequest(id);
            this.loadData();
        }
    }

}

// Initial Boot
AdminUI.init();
