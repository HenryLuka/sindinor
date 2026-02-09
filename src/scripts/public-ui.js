/**
 * Public UI Module
 * Renders dynamic content on the main page.
 */
import { ApiService } from '../services/api.js';

export class PublicUI {
    static async init() {
        await this.renderPartners();
        await this.renderNews();
        await this.renderServices();
        await this.renderDirectors();
        await this.renderGeneral();
        this.setupNavigation();
        this.setupScrollHeader();
        this.setupJoinForm();
    }

    static setupScrollHeader() {
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-secondary-dark/95', 'shadow-lg');
                navbar.classList.remove('bg-gradient-to-b', 'from-secondary-dark/90', 'to-transparent');
            } else {
                navbar.classList.remove('bg-secondary-dark/95', 'shadow-lg');
                navbar.classList.add('bg-gradient-to-b', 'from-secondary-dark/90', 'to-transparent');
            }
        });
    }

    static async renderDirectors() {
        const directors = await ApiService.getDirectors();
        const grid = document.getElementById('directors-grid');

        if (grid && directors.length > 0) {
            grid.innerHTML = '';

            // FALLBACKS FOR DIRECTORS (ID-based for maximum precision)
            const BOARD_FIXES = {
                '1': { name: 'Antonio Henrique Sapori', role: 'Presidente', company: 'RODONASA CARGAS E ENCOMENDAS LTDA.' },
                '2': { name: 'Lucio Bento Fagundes Junior', role: 'Secretário', company: 'RÁPIDO MONTES CLAROS E FERNANDO SOARES MOTA - ME.' },
                '3': { name: 'Paulo Roberto de Almeida', role: 'Tesoureiro', company: 'TRANSPORTADORA JANUÁRIA' },
                '4': { name: 'Antonio Sapori', role: 'Conselho Fiscal Efetivo', company: 'TRANSNORTE CARGAS E ENCOMENDAS LTDA.' },
                '5': { name: 'Jorge Antonio dos Santos', role: 'Conselho Fiscal Efetivo', company: 'JLSI Logística e Transportes Ltda.-ME' },
                '6': { name: 'Antonio Henrique Sapori Filho', role: 'Conselho Fiscal Suplente', company: 'PRAMINAS LOG TRANSPORTES LTDA.' }
            };

            const processedDirectors = directors.map(d => {
                const fix = BOARD_FIXES[d.id];
                if (fix) {
                    return { ...d, ...fix };
                }
                return d;
            });

            // Allow sorting by ID to ensure 1-6 order
            processedDirectors.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            processedDirectors.forEach(d => {
                const isPlaceholder = !d.image || d.image.includes('placeholder');
                const avatarHtml = isPlaceholder
                    ? `<div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-3xl border-2 border-transparent group-hover:border-accent-cyan transition-colors"><i class="fas fa-user"></i></div>`
                    : `<img src="${d.image}" alt="${d.name}" class="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-accent-cyan transition-colors">`;

                grid.innerHTML += `
                    <div class="bg-secondary-dark border border-glass-border p-6 rounded-xl flex items-center gap-4 hover:border-accent-cyan transition-colors group">
                        <div class="relative">
                            ${avatarHtml}
                            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-cyan rounded-full flex items-center justify-center text-primary-dark text-xs font-bold">
                                <i class="fas fa-check"></i>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-heading font-bold text-white text-lg leading-tight mb-1">${d.name}</h4>
                            <p class="text-accent-cyan text-xs font-bold uppercase tracking-widest mb-1">${d.role}</p>
                            <p class="text-gray-500 text-xs">${d.company}</p>
                        </div>
                    </div>
                `;
            });
        }
    }

    static async renderPartners() {
        const partners = await ApiService.getPartners();
        const grid = document.getElementById('partners-grid');

        if (grid && partners.length > 0) {
            // Create the HTML for one set of items
            const itemsHtml = partners.map(p => `
                <a href="parceiro.html?id=${p.id}" class="flex items-center justify-center min-w-[200px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group">
                     ${p.logo ?
                    `<img src="${p.logo}" alt="${p.name}" class="h-24 w-auto object-contain">` :
                    `<span class="text-4xl font-black text-gray-500 group-hover:text-white uppercase tracking-tighter transition-colors select-none">${p.name}</span>`
                }
                </a>
            `).join('');

            // Wrap in a set with gap
            const setHtml = `<div class="flex gap-16 shrink-0 items-center px-8">${itemsHtml}</div>`;

            // Inject 12 sets to ensure coverage and seamless loop with translateX(-50%)
            // More sets = longer distance = smoother loop that doesn't reset visibly on wide screens
            grid.innerHTML = new Array(12).fill(setHtml).join('');
            grid.className = 'flex items-center w-max animate-marquee md:animate-marquee-slow';
        }

        // Definitive Footer Logo Fix (Ensure it works in all environments)
        const footerLogo = document.querySelector('footer img');
        if (footerLogo) {
            footerLogo.onerror = () => {
                footerLogo.src = 'assets/favicon.png';
            };
            footerLogo.src = 'assets/favicon.png';
        }
    }


    static formatDate(dateString) {
        if (!dateString) return 'RECENTE';
        // Handle YYYY-MM-DD
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        }
        return dateString;
    }

    static async renderNews() {
        const news = await ApiService.getNews();
        const grid = document.getElementById('news-grid');

        if (grid && news.length > 0) {
            grid.innerHTML = '';
            // Show only the 3 most recent news on home page
            const latestNews = news.slice(0, 3);
            latestNews.forEach(n => {
                grid.innerHTML += `
                    <a href="/noticia?id=${n.id}" class="block bg-primary-dark rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-glass-border">
                        <div class="h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 relative" style="background-image: url('${n.image_url || n.img || 'assets/news-placeholder.jpg'}');">
                             <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded">Logística</span>
                                <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">${PublicUI.formatDate(n.news_date || n.date)}</span>
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-2">${n.title}</h3>
                            <div class="text-sm font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                                Ler Artigo <span class="text-accent-cyan">→</span>
                            </div>
                        </div>
                    </a>
                `;
            });
        }
    }

    static async renderServices() {
        const services = await ApiService.getServices();
        const grid = document.getElementById('services-grid');

        if (grid && services.length > 0) {
            grid.innerHTML = '';

            // HARDCODED FALLBACKS FOR CORE SERVICES (ensures premium content if DB is incomplete)
            const CORE_CONTENT = {
                'Registro RNTRC (ANTT)': {
                    description: 'O Sindinor é credenciado junto à Agência Nacional de Transportes Terrestres (ANTT) para realização do Registro e Recadastramento Nacional de Transportador Rodoviário de Cargas (RNTRC).',
                    contact_info: {
                        title: 'Mais informações:',
                        phone: '(38) 3321-9110 / (38) 99985-3216',
                        email: 'ercadastro@gmail.com.br',
                        contact: 'Edson Ricardo'
                    },
                    logos: ['/assets/antt-logo.jpg', '/assets/rntrc-logo.jpg']
                },
                'Programa Despoluir': {
                    description: 'O Despoluir é um Programa Ambiental de Transporte que objetiva a redução de emissões de poluentes. Gratuitamente, as empresas associadas Sindinor podem aferir sua frota.',
                    extra_description: 'Os veículos aprovados recebem o <strong class="text-white">Selo Verde Despoluir</strong> e empresas de destaque concorrem ao Prêmio Melhor Ar, promovido pelo Fetcemg.'
                },
                'Consultoria Técnica': {
                    description: 'O Sindinor oferece assessoria econômica para auxiliar na elaboração de planilhas de custos, formação de preços e fornecimento de indicadores econômicos atualizados.',
                    extra_description: 'Seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e Lotação, garantindo competitividade e sustentabilidade ao negócio.'
                },
                'Consultoria Técnica e Econômica': { // Handle both variations
                    description: 'O Sindinor oferece assessoria econômica para auxiliar na elaboração de planilhas de custos, formação de preços e fornecimento de indicadores econômicos atualizados.',
                    extra_description: 'Seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e Lotação, garantindo competitividade e sustentabilidade ao negócio.'
                }
            };

            services.forEach(s => {
                // Merge with fallback if available
                const fallback = CORE_CONTENT[s.title];
                const description = (fallback && s.description.length < 50) ? fallback.description : s.description;
                const extra_description = s.extra_description || (fallback ? fallback.extra_description : '');
                const contact_info = s.contact_info || (fallback ? fallback.contact_info : null);
                const logos = (s.logos && s.logos.length > 0) ? s.logos : (fallback ? fallback.logos : []);

                let iconOrImage = '';
                if (logos && logos.length > 0) {
                    iconOrImage = `
                        <div class="flex gap-4 items-center">
                            ${logos.map(logo => {
                        const cleanPath = logo.startsWith('/') ? logo : `/${logo}`;
                        return `<img src="${cleanPath}" alt="Logo" class="h-12 w-auto bg-white p-1 rounded shadow-sm">`;
                    }).join('')}
                        </div>
                    `;
                } else if (s.icon) {
                    iconOrImage = `<i class="fas ${s.icon} text-4xl text-accent-cyan group-hover:scale-110 transition-transform"></i>`;
                } else {
                    iconOrImage = `<img src="${s.image}" alt="${s.title}" class="w-8 h-8 filter invert group-hover:invert-0 transition-all">`;
                }

                let contactBox = '';
                if (contact_info) {
                    contactBox = `
                        <div class="bg-primary-dark/50 p-4 rounded border border-white/10 text-xs text-gray-400 space-y-2 mt-auto">
                            <p class="font-bold text-accent-cyan mb-1">${contact_info.title}</p>
                            <p><i class="fas fa-phone mr-2 text-accent-cyan"></i>${contact_info.phone}</p>
                            <p><i class="fas fa-envelope mr-2 text-accent-cyan"></i>${contact_info.email}</p>
                            <p><i class="fas fa-user mr-2 text-accent-cyan"></i>${contact_info.contact}</p>
                        </div>
                    `;
                }

                const extraDescHtml = extra_description
                    ? `<p class="text-gray-400 text-sm leading-relaxed mb-6">${extra_description}</p>`
                    : '';

                const backgroundIcon = s.icon
                    ? `<i class="fas ${s.icon} text-9xl"></i>`
                    : `<img src="${s.image}" class="w-24 h-24 filter invert opacity-50">`;

                grid.innerHTML += `
                    <a href="servico.html?id=${s.id}" class="bg-secondary-dark rounded-lg p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group shadow-lg border border-white/5 flex flex-col h-full block">
                         <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-white">
                            ${backgroundIcon}
                         </div>
                        
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="w-auto h-14 rounded-lg flex items-center mb-6">
                                ${iconOrImage}
                            </div>
                            <h3 class="font-heading text-xl font-bold text-white mb-4">${s.title}</h3>
                            <p class="text-gray-400 text-sm leading-relaxed mb-4">${description}</p>
                            ${extraDescHtml}
                            ${contactBox}
                            
                            <div class="mt-8 inline-flex items-center text-accent-cyan font-bold text-sm group-hover:gap-2 transition-all">
                                Saiba Mais <span class="ml-1">→</span>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-transparent"></div>
                    </a>
                `;
            });
        }
    }

    static async renderGeneral() {
        const data = await ApiService.getGeneral();
        if (!data) return;

        // Example: Updating Hero CTA if it exists
        if (data.hero) {
            // Already handled by static HTML for now
        }
    }

    static setupNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        const mobileLinks = document.querySelectorAll('#mobile-menu a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Reset all desktop links
                    navLinks.forEach(link => {
                        link.classList.remove('text-accent-cyan');
                        link.classList.add('text-white/90');
                        // Handle Associe-se special case (it has different base classes)
                        if (link.getAttribute('href') === '#associe-se') {
                            link.classList.remove('text-accent-cyan');
                            link.classList.add('text-accent-cyan'); // It's always accent-cyan base, maybe?
                            // wait, associe-se has "text-accent-cyan hover:text-white" base.
                            // active state should probably just stay accent-cyan or become white?
                            // User said "menu de cada secao fique azul".
                            // Let's stick to adding text-accent-cyan and removing others.
                        }
                    });

                    // Reset all mobile links
                    mobileLinks.forEach(link => {
                        link.classList.remove('text-accent-cyan');
                        link.classList.add('text-white');
                        if (link.getAttribute('href') === '#associe-se') {
                            link.classList.add('text-accent-cyan');
                        }
                    });

                    // Activate current desktop
                    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.remove('text-white/90');
                        activeLink.classList.add('text-accent-cyan');
                    }

                    // Activate current mobile
                    const activeMobile = document.querySelector(`#mobile-menu a[href="#${id}"]`);
                    if (activeMobile) {
                        activeMobile.classList.remove('text-white');
                        activeMobile.classList.add('text-accent-cyan');
                    }
                }
            });
        }, { threshold: 0.2, rootMargin: "-10% 0px -50% 0px" });

        sections.forEach(section => observer.observe(section));
    }

    static setupJoinForm() {
        const form = document.getElementById('join-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;

                const data = {
                    company: document.getElementById('join-company').value,
                    cnpj: document.getElementById('join-cnpj').value,
                    city: document.getElementById('join-city').value,
                    name: document.getElementById('join-name').value,
                    role: document.getElementById('join-role').value,
                    phone: document.getElementById('join-phone').value,
                    message: document.getElementById('join-message').value
                };

                try {
                    submitBtn.innerText = 'Enviando...';
                    submitBtn.disabled = true;

                    await ApiService.addRequest(data);

                    alert('Solicitação enviada com sucesso! Em breve entraremos em contato.');
                    form.reset();
                    // Close modal if toggleJoinModal is available globally
                    if (window.toggleJoinModal) window.toggleJoinModal();
                } catch (error) {
                    console.error('Error submitting request:', error);
                    alert('Erro ao enviar solicitação. Tente novamente.');
                } finally {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    PublicUI.init();
});
