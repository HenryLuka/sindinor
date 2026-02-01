import { ApiService } from '../services/api.js';

export class NewsDetailUI {
    static async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            window.location.href = 'noticias.html';
            return;
        }

        this.showLoading();
        await this.loadNews(id);
        await this.loadSidebar(id);
    }

    static showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('news-content').classList.add('hidden');
        document.getElementById('not-found').classList.add('hidden');
    }

    static async loadNews(id) {
        const allNews = await ApiService.getNews();
        const newsItem = allNews.find(n => n.id === id);

        document.getElementById('loading').classList.add('hidden');

        if (!newsItem) {
            document.getElementById('not-found').classList.remove('hidden');
            return;
        }

        // Render Content
        document.getElementById('news-content').classList.remove('hidden');
        document.getElementById('news-title').innerText = newsItem.title;
        document.getElementById('news-date').innerHTML = `<i class="far fa-calendar mr-2"></i> ${this.formatDate(newsItem.news_date || newsItem.date)}`;

        const img = document.getElementById('news-image');
        if (newsItem.image_url || newsItem.img) {
            img.src = newsItem.image_url || newsItem.img;
        } else {
            img.classList.add('hidden');
            img.parentElement.classList.add('hidden');
        }

        // Render Body (HTML)
        const bodyContainer = document.getElementById('news-body');
        if (newsItem.content) {
            bodyContainer.innerHTML = newsItem.content;
        } else {
            // Fallback for old items without content
            bodyContainer.innerHTML = `<p><em>Esta notícia não possui conteúdo textual adicional.</em></p>`;
            if (newsItem.external_link && newsItem.external_link !== '#') {
                bodyContainer.innerHTML += `
                    <div class="mt-6">
                        <a href="${newsItem.external_link}" target="_blank" class="inline-flex items-center gap-2 text-accent-cyan font-bold hover:underline">
                            Ler na íntegra em fonte externa <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                `;
            }
        }
        // Render Gallery
        const gallerySection = document.getElementById('news-gallery-section');
        const galleryGrid = document.getElementById('news-gallery-grid');

        if (newsItem.gallery && newsItem.gallery.length > 0) {
            gallerySection.classList.remove('hidden');
            gallerySection.classList.add('animate-fade-in-up');

            galleryGrid.innerHTML = newsItem.gallery.map(img => `
                <div class="group relative aspect-square overflow-hidden rounded-xl border border-glass-border cursor-pointer" onclick="window.open('${img}', '_blank')">
                    <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <i class="fas fa-search-plus text-white text-2xl"></i>
                    </div>
                </div>
            `).join('');
        } else {
            gallerySection.classList.add('hidden');
        }
    }

    static async loadSidebar(currentId) {
        const allNews = await ApiService.getNews();
        const sidebarContainer = document.getElementById('sidebar-news');

        // Filter out current news and take latest 6
        const otherNews = allNews
            .filter(n => n.id !== currentId)
            .slice(0, 6);

        if (otherNews.length === 0) {
            sidebarContainer.innerHTML = '<p class="text-gray-500 text-sm">Nenhuma outra notícia recente.</p>';
            return;
        }

        const itemsHtml = otherNews.map(n => `
            <a href="noticia.html?id=${n.id}" class="group flex gap-4 items-start block p-2 hover:bg-glass-bg rounded-lg transition-colors">
                <div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-glass-border">
                    <img src="${n.image_url || n.img || 'assets/news-placeholder.jpg'}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div>
                    <span class="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-1 block">
                        ${this.formatDate(n.news_date || n.date)}
                    </span>
                    <h4 class="text-white font-bold text-sm leading-tight group-hover:text-accent-cyan transition-colors line-clamp-3">
                        ${n.title}
                    </h4>
                </div>
            </a>
        `).join('');

        // Apply Vertical Marquee Structure
        // Remove space-y-6 from container to avoid double spacing issues
        sidebarContainer.classList.remove('space-y-6');
        sidebarContainer.classList.add('h-[400px]', 'overflow-hidden', 'relative');

        // Inject duplicated content for seamless loop
        sidebarContainer.innerHTML = `
            <div class="animate-marquee-vertical space-y-6">
                ${itemsHtml}
                ${itemsHtml} <!-- Duplicate for seamless loop -->
            </div>
        `;
    }

    static formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        try {
            // Fix timezone offset issue manually or use UTC
            const date = new Date(dateString);
            // Add timezone offset to display correctly in local time if came from YYYY-MM-DD
            const userTimezoneOffset = date.getTimezoneOffset() * 60000;
            const correctedDate = new Date(date.getTime() + userTimezoneOffset);
            return correctedDate.toLocaleDateString('pt-BR', options);
        } catch (e) {
            return dateString;
        }
    }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    NewsDetailUI.init();
});
