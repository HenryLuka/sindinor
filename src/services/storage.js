/**
 * Storage Service
 * Replaces PHP Backend with LocalStorage for persistence.
 */

const KEYS = {
    NEWS: 'sindinor_news',
    PARTNERS: 'sindinor_partners',
    SERVICES: 'sindinor_services',
    DIRECTORS: 'sindinor_directors',
    GENERAL: 'sindinor_general',
    REQUESTS: 'sindinor_requests'
};

const SEED_GENERAL = {
    stats: {
        y1: { val: '35+', label: 'Anos de História' },
        y2: { val: '100%', label: 'Representatividade' },
        y3: { val: 'MG', label: 'Norte de Minas' }
    },
    about: {
        history: 'O SINDINOR - Sindicato das Empresas de Transportes de Carga, Logística, Movimentação e Armazenamento de Mercadorias do Norte de Minas foi fundado em 04 de outubro de 1988.',
        vision: 'Buscamos ser a referência absoluta em credibilidade e inovação no transporte rodoviário.'
    },
    contact: {
        address: 'Avenida Doutor João Luiz de Almeida, 881 - Sala 102 - Centro - Montes Claros – MG',
        phone: '38 3321-9110 | 38 99985-3216',
        email: 'ercadastro@gmail.com.br'
    },
    hero: {
        ctaText: 'Conheça Nossos Serviços',
        ctaLink: '#servicos'
    },
    mvv: {
        mission: 'Defender os interesses do transporte de carga com ética e responsabilidade.',
        vision: 'Ser referência de credibilidade e liderança no setor logístico regional.',
        values: 'Ética, Transparência, Inovação e Responsabilidade Social.'
    }
};

// Seed Data
const SEED_NEWS = [
    {
        id: '1',
        title: 'SINDINOR promove encontro sobre RNTRC',
        news_date: '2025-10-24',
        image_url: 'assets/uploaded_media_1769708685255.png',
        external_link: '#'
    },
    {
        id: '2',
        title: 'Nova frota sustentável com Selo Verde',
        news_date: '2025-09-15',
        image_url: 'assets/hero_truck_clean_hd_1769714783769.png',
        external_link: '#'
    }
];

const SEED_PARTNERS = [
    {
        id: '1',
        name: 'Mercedes-Benz',
        logo: '',
        description: 'Líder em tecnologia para transporte de carga pesada, a Mercedes-Benz oferece soluções integradas para o transportador.',
        video_url: 'https://www.youtube.com/embed/example1'
    },
    {
        id: '2',
        name: 'Scania',
        logo: '',
        description: 'Referência em sustentabilidade e eficiência, a Scania transforma o transporte com veículos de alta performance.',
        video_url: 'https://www.youtube.com/embed/example2'
    },
    {
        id: '3',
        name: 'Volvo',
        logo: '',
        description: 'Segurança e inovação são os pilares da Volvo, garantindo produtividade e proteção para o setor logístico.',
        video_url: 'https://www.youtube.com/embed/example3'
    }
];

const SEED_SERVICES = [
    {
        id: '1',
        title: 'Registro RNTRC',
        description: 'Credenciado ANTT para realização do Registro e Recadastramento Nacional (RNTRC) com agilidade.',
        full_description: 'O SINDINOR é um posto avançado e credenciado pela ANTT para a realização do Registro Nacional de Transportadores Rodoviários de Carga. Oferecemos suporte completo para empresas e transportadores autônomos, garantindo que toda a documentação esteja em conformidade com as normas vigentes. Nosso processo é ágil e focado na regularização imediata do seu negócio.',
        image: 'assets/service_rntrc_1769715933142.png',
        icon: 'fa-id-card',
        gallery: []
    },
    {
        id: '2',
        title: 'Programa Despoluir',
        description: 'Aferição de frota gratuita e Programa Ambiental para redução de emissões com Selo Verde.',
        full_description: 'O Programa Despoluir é uma iniciativa que visa reduzir a emissão de poluentes por veículos de carga. O SINDINOR realiza a aferição gratuita da frota dos seus associados, emitindo o Selo Verde para aqueles que estão dentro dos padrões ambientais. Além de contribuir para a sustentabilidade, o programa ajuda a otimizar o consumo de combustível e a manutenção dos veículos.',
        image: 'assets/service_despoluir_1769715948131.png',
        icon: 'fa-leaf',
        gallery: []
    },
    {
        id: '3',
        title: 'Consultoria Técnica',
        description: 'Assessoria econômica especializada para planilhas de custos e formação de preços no transporte.',
        full_description: 'Nossa consultoria técnica oferece suporte especializado na elaboração de planilhas de custos operacionais e na formação de preços de frete. Com base em dados atualizados do mercado e legislação vigente, ajudamos sua empresa a manter a competitividade e a rentabilidade, fornecendo análises precisas e orientações estratégicas para o seu negócio.',
        image: 'assets/service_consultoria_1769715961860.png',
        icon: 'fa-chart-line',
        gallery: []
    }
];

const SEED_DIRECTORS = [
    { id: '1', name: 'Antônio Henrique Sapori', role: 'Presidente', company: 'Rodonasa Cargas', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '2', name: 'Lucio Bento Fagundes Junior', role: 'Secretário', company: 'Rápido Montes Claros', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '3', name: 'Paulo Roberto de Almeida', role: 'Tesoureiro', company: 'Transportadora Januária', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '4', name: 'Antônio Sapori', role: 'Conselho Fiscal Efetivo', company: 'Transnorte Cargas', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '5', name: 'Jorge Antônio dos Santos', role: 'Conselho Fiscal Efetivo', company: 'JLSI Logística', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '6', name: 'Antônio Henrique Sapori Filho', role: 'Conselho Fiscal Suplente', company: 'PraMinas Log', image: 'assets/member_placeholder_1769715974165.png' }
];

export class StorageService {
    // Helpers
    static _get(key, seed = []) {
        const data = localStorage.getItem(key);
        if (!data) {
            localStorage.setItem(key, JSON.stringify(seed));
            return seed;
        }
        return JSON.parse(data);
    }

    static _set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- NEWS ---
    static getNews() {
        return this._get(KEYS.NEWS, SEED_NEWS);
    }

    static addNews(item) {
        const list = this.getNews();
        item.id = Date.now().toString(); // Simple ID
        list.unshift(item); // Add to top
        this._set(KEYS.NEWS, list);
        return item;
    }

    static deleteNews(id) {
        let list = this.getNews();
        list = list.filter(i => i.id !== id);
        this._set(KEYS.NEWS, list);
    }

    // --- PARTNERS ---
    static getPartners() {
        return this._get(KEYS.PARTNERS, SEED_PARTNERS);
    }

    static addPartner(item) {
        const list = this.getPartners();
        item.id = Date.now().toString();
        list.unshift(item);
        this._set(KEYS.PARTNERS, list);
        return item;
    }

    static deletePartner(id) {
        let list = this.getPartners();
        list = list.filter(i => i.id !== id);
        this._set(KEYS.PARTNERS, list);
    }

    // --- SERVICES ---
    static getServices() {
        let services = this._get(KEYS.SERVICES, SEED_SERVICES);
        // Auto-fix: Ensure default services have correct images AND icons
        let changed = false;
        services = services.map(s => {
            const seed = SEED_SERVICES.find(seedItem => seedItem.id === s.id);
            if (seed) {
                if (s.image !== seed.image) {
                    s.image = seed.image;
                    changed = true;
                }
                if (s.icon !== seed.icon) {
                    s.icon = seed.icon;
                    changed = true;
                }
            }
            return s;
        });
        if (changed) {
            this._set(KEYS.SERVICES, services);
        }
        return services;
    }

    // --- DIRECTORS ---
    static getDirectors() {
        let directors = this._get(KEYS.DIRECTORS, SEED_DIRECTORS);
        // Auto-fix: Ensure default directors have correct images
        let changed = false;
        directors = directors.map(d => {
            const seed = SEED_DIRECTORS.find(seedItem => seedItem.id === d.id);
            if (seed && d.image !== seed.image) {
                d.image = seed.image;
                changed = true;
            }
            return d;
        });
        if (changed) {
            this._set(KEYS.DIRECTORS, directors);
        }
        return directors;
    }

    static addService(item) {
        const list = this.getServices();
        item.id = Date.now().toString();
        list.push(item);
        this._set(KEYS.SERVICES, list);
        return item;
    }

    static deleteService(id) {
        let list = this.getServices();
        list = list.filter(i => i.id !== id);
        this._set(KEYS.SERVICES, list);
    }

    // --- DIRECTORS ---
    static getDirectors() {
        return this._get(KEYS.DIRECTORS, SEED_DIRECTORS);
    }

    static addDirector(item) {
        const list = this.getDirectors();
        item.id = Date.now().toString();
        list.push(item);
        this._set(KEYS.DIRECTORS, list);
        return item;
    }

    static deleteDirector(id) {
        let list = this.getDirectors();
        list = list.filter(i => i.id !== id);
        this._set(KEYS.DIRECTORS, list);
    }

    // --- GENERAL ---
    static getGeneral() {
        return this._get(KEYS.GENERAL, SEED_GENERAL);
    }

    static updateGeneral(data) {
        this._set(KEYS.GENERAL, data);
    }

    // --- REQUESTS ---
    static getRequests() {
        return this._get(KEYS.REQUESTS, []);
    }

    static addRequest(item) {
        const list = this.getRequests();
        item.id = Date.now().toString();
        item.date = new Date().toISOString();
        list.unshift(item);
        this._set(KEYS.REQUESTS, list);
        return item;
    }

    static deleteRequest(id) {
        let list = this.getRequests();
        list = list.filter(i => i.id !== id);
        this._set(KEYS.REQUESTS, list);
    }
}
