import { ApiService } from '../services/api.js';

export class ServicoUI {
    static async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceId = urlParams.get('id');

        if (!serviceId) {
            window.location.href = 'index.html';
            return;
        }

        await this.renderServiceDetails(serviceId);
    }

    static async renderServiceDetails(id) {
        const services = await ApiService.getServices();
        const service = services.find(s => s.id === id);
        const container = document.getElementById('service-content');

        if (!service || !container) {
            container.innerHTML = `
                <div class="text-center py-20">
                    <h2 class="text-3xl font-bold text-white mb-4">Serviço não encontrado</h2>
                    <a href="index.html" class="text-accent-cyan hover:underline">Voltar para a Home</a>
                </div>
            `;
            return;
        }

        const galleryHtml = service.gallery && service.gallery.length > 0
            ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                ${service.gallery.map((img, idx) => `
                    <div class="group relative overflow-hidden rounded-2xl bg-secondary-dark border border-glass-border aspect-video shadow-2xl">
                        <img src="${img}" alt="Execução ${idx + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                             <span class="text-white font-bold text-sm">Registro de Execução</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            `
            : `
            <div class="bg-glass-bg border border-glass-border rounded-2xl p-12 flex flex-col items-center justify-center text-text-muted gap-4">
                <i class="fas fa-images text-5xl opacity-20"></i>
                <p class="font-bold uppercase tracking-widest text-xs">Galeria em breve</p>
            </div>
            `;

        container.innerHTML = `
            <div class="flex flex-col gap-12 animate-fade-in-up">
                <!-- Service Header -->
                <div class="bg-secondary-dark border border-glass-border p-10 rounded-3xl relative overflow-hidden group shadow-2xl">
                    <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-white">
                        <i class="fas ${service.icon || 'fa-cogs'} text-[12rem]"></i>
                    </div>
                    
                    <div class="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6">
                        <div class="w-20 h-20 bg-accent-cyan/10 rounded-2xl flex items-center justify-center border border-accent-cyan/30 shadow-lg shadow-accent-cyan/10">
                             <i class="fas ${service.icon || 'fa-cogs'} text-4xl text-accent-cyan"></i>
                        </div>
                        <div>
                            <span class="text-accent-cyan font-bold uppercase tracking-widest text-xs mb-3 block">Nossos Serviços</span>
                            <h1 class="font-heading font-black text-4xl md:text-6xl text-white tracking-tighter">${service.title}</h1>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <!-- Description Column -->
                    <div class="space-y-10">
                        <div class="prose prose-invert max-w-none">
                            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Sobre o Serviço
                            </h2>
                            <p class="text-gray-400 leading-relaxed text-lg">
                                ${service.full_description || service.description || 'Estamos preparando uma descrição detalhada para este serviço.'}
                            </p>
                        </div>

                        <div class="bg-glass-bg border border-glass-border p-8 rounded-2xl space-y-6">
                            <h3 class="text-xl font-bold text-white">Precisa deste serviço?</h3>
                            <p class="text-text-muted text-sm">Fale diretamente com nossa equipe técnica para mais informações e suporte imediato.</p>
                            <div class="flex flex-wrap gap-4">
                                <a href="https://wa.me/5538999853216" target="_blank" class="flex-grow flex items-center justify-center gap-3 bg-green-500 text-white font-black py-4 px-6 rounded-xl hover:bg-green-600 transition-all hover:scale-[1.02]">
                                    <i class="fab fa-whatsapp text-xl"></i> WhatsApp
                                </a>
                                <a href="tel:3833219110" class="flex-grow flex items-center justify-center gap-3 bg-white text-primary-dark font-black py-4 px-6 rounded-xl hover:bg-gray-100 transition-all hover:scale-[1.02]">
                                    <i class="fas fa-phone-alt"></i> (38) 3321-9110
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Gallery Column -->
                    <div class="space-y-10 sticky top-24">
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span class="w-1 h-6 bg-accent-cyan rounded-full"></span> Galeria de Execução
                        </h2>
                        ${galleryHtml}
                    </div>
                </div>
            </div>
        `;
    }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    ServicoUI.init();
});
