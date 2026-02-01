/**
 * Noticias UI Module
 * Renders all news items on the dedicated news page.
 */
import { ApiService } from '../services/api.js';

export class NoticiasUI {
    static async init() {
        await this.renderAllNews();
    }

    static async renderAllNews() {
        const news = await ApiService.getNews();
        const grid = document.getElementById('news-grid-full');

        if (grid) {
            if (news.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full py-20 text-center">
                        <p class="text-gray-500 uppercase tracking-widest text-xs">Nenhuma notícia encontrada.</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = '';
            news.forEach(n => {
                grid.innerHTML += `
                    <article class="bg-secondary-dark rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-2xl border border-glass-border">
                        <div class="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 relative" style="background-image: url('${n.image_url || n.img || 'assets/news-placeholder.jpg'}');">
                             <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                             <div class="absolute top-4 left-4">
                                <span class="bg-accent-cyan text-primary-dark text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded shadow-lg">Setor Logístico</span>
                             </div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-accent-cyan text-xs font-bold uppercase tracking-widest"><i class="far fa-calendar-alt mr-1"></i> ${n.news_date || n.date || 'Recente'}</span>
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-6 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-3">${n.title}</h3>
                            <a href="noticia.html?id=${n.id}" class="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-accent-cyan transition-colors border-b-2 border-accent-cyan/20 pb-1 hover:border-accent-cyan">
                                Ler Matéria Completa <i class="fas fa-arrow-right text-xs"></i>
                            </a>
                        </div>
                    </article>
                `;
            });
        }
    }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    NoticiasUI.init();
});
