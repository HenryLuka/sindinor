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
        id: '3',
        title: 'SINDINOR Inaugura Nova Sede Operacional em Montes Claros',
        news_date: '2025-11-05',
        image_url: 'assets/hero_mobile.png',
        content: `
            <p class="mb-4">É com grande satisfação que o SINDINOR anuncia a inauguração de sua nova sede operacional em Montes Claros. O espaço, totalmente modernizado, foi projetado para oferecer mais conforto e agilidade no atendimento aos nossos associados.</p>
            
            <h3 class="text-xl font-bold text-secondary-dark mt-6 mb-3">Infraestrutura Moderna</h3>
            <p class="mb-4">A nova estrutura conta com auditório com capacidade para 50 pessoas, ideal para cursos e capacitações, além de salas de reunião equipadas com videoconferência e um setor exclusivo para o atendimento do RNTRC e Despoluir, garantindo mais privacidade e eficiência nos processos.</p>
            
            <p class="mb-4">Segundo o presidente Antônio Henrique Sapori, <em class="text-gray-600">"esta conquista representa o crescimento e a solidez do nosso sindicato, que há mais de 35 anos trabalha pelo fortalecimento do transporte no Norte de Minas. Queremos que o associado se sinta em casa."</em></p>
            
            <h3 class="text-xl font-bold text-secondary-dark mt-6 mb-3">Localização Estratégica</h3>
            <p class="mb-4">Localizada no coração da cidade, a nova sede possui fácil acesso e estacionamento conveniado. Convidamos todos os associados para um café de boas-vindas e para conhecerem as novas instalações e desfrutarem deste espaço que é de todos nós.</p>
            
            <div class="bg-gray-100 p-4 rounded-lg border-l-4 border-accent-cyan mt-6">
                <strong>Visite-nos:</strong><br>
                Avenida Doutor João Luiz de Almeida, 881 - Sala 102<br>
                Centro – Montes Claros – MG<br>
                Horário: 08h às 18h
            </div>
        `,
        gallery: [
            'assets/hero_mobile.png',
            'assets/uploaded_media_1769708685255.png',
            'assets/hero_truck_clean_hd_1769714783769.png'
        ]
    },
    {
        id: '1',
        title: 'SINDINOR promove encontro sobre RNTRC',
        news_date: '2025-10-24',
        image_url: 'assets/uploaded_media_1769708685255.png',
        content: `
            <p>O SINDINOR realizou nesta semana um importante encontro com transportadores da região para discutir as novas diretrizes do Registro Nacional de Transportadores Rodoviários de Cargas (RNTRC).</p>
            <p>O evento contou com a presença de especialistas da ANTT e representantes do setor, que esclareceram dúvidas sobre o recadastramento e as novas exigências para manutenção da regularidade.</p>
            <p>Durante a palestra, foram abordados temas como fiscalização eletrônica, vale-pedágio obrigatório e os benefícios da profissionalização do setor. O presidente do SINDINOR destacou a importância de manter a documentação em dia para evitar multas e garantir a competitividade no mercado.</p>
            <p>Os associados que não puderam comparecer podem retirar o material informativo na sede do sindicato ou acessar a área restrita do site para mais detalhes.</p>
        `
    },
    {
        id: '2',
        title: 'Nova frota sustentável com Selo Verde',
        news_date: '2025-09-15',
        image_url: 'assets/hero_truck_clean_hd_1769714783769.png',
        content: `
            <p>Empresas associadas ao SINDINOR estão liderando o caminho para um transporte mais sustentável no Norte de Minas. Graças ao Programa Despoluir, diversas transportadoras receberam este mês o Selo Verde de aprovação nos testes de emissão de poluentes.</p>
            <p>O programa, que é gratuito para associados, visa reduzir o impacto ambiental do transporte rodoviário de cargas e promover a economia de combustível através da manutenção preventiva.</p>
            <p>Além da certificação ambiental, as empresas participantes relataram uma redução média de 10% no consumo de diesel após as adequações sugeridas pelos técnicos do Despoluir. Isso demonstra que sustentabilidade e eficiência econômica caminham juntas.</p>
        `
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
        title: 'Registro RNTRC (ANTT)',
        description: 'O Sindinor é credenciado junto à ANTT para realização do Registro e Recadastramento Nacional de Transportador Rodoviário de Cargas (RNTRC).',
        full_description: 'O Sindinor é credenciado junto à Agência Nacional de Transportes Terrestres (ANTT) para realização do Registro e Recadastramento Nacional de Transportador Rodoviário de Cargas (RNTRC).\n\n**Mais informações, setor de registros do Sindinor:**\n- Tel.: (38) 3321-9110 / (38) 99985-3216\n- Email: ercadastro@gmail.com.br\n- Contato: Edson Ricardo',
        image: 'assets/service_rntrc_1769715933142.png',
        icon: 'fa-id-card',
        gallery: []
    },
    {
        id: '2',
        title: 'Programa Despoluir',
        description: 'Programa Ambiental de Transporte que objetiva a redução de emissões de poluentes com aferição gratuita e Selo Verde.',
        full_description: 'O Despoluir é um Programa Ambiental de Transporte, que objetiva a redução de emissões de poluentes. Gratuitamente, as empresas associadas Sindinor, podem aferir sua frota. O processo é feito por veículos equipados com opacímetros que vão até as empresas para fazer as aferições sem custos. Os veículos aprovados recebem o Selo Verde Despoluir e a cada ano, empresas que se destacam participam do Prêmio Melhor Ar, promovido pelo Fetcemg.',
        image: 'assets/service_despoluir_1769715948131.png',
        icon: 'fa-leaf',
        gallery: []
    },
    {
        id: '3',
        title: 'Consultoria Técnica e Econômica',
        description: 'Assessoria econômica sistemática para planilhas de custos, formação de preços e indicadores econômicos atualizados.',
        full_description: 'Em qualquer negócio, o processo de precificação pode ser decisivo quanto ao futuro da empresa. O Sindinor oferece assessoria econômica com o objetivo de auxiliar as empresas na elaboração de planilhas de custos e formação de preços, além de fornecimento de indicadores econômicos e banco de dados com informações atualizadas sobre custo de transporte de cargas, seguindo as orientações do Índice Nacional de Custos de Transporte de Carga Fracionada e o Índice Nacional de Custo do Transporte de cara Lotação.',
        image: 'assets/service_consultoria_1769715961860.png',
        icon: 'fa-chart-line',
        gallery: []
    }
];

const SEED_DIRECTORS = [
    { id: '1', name: 'Antônio Henrique Sapori', role: 'Presidente', company: 'Rodonasa Cargas', image: '../assets/member_placeholder_1769715974165.png' },
    { id: '2', name: 'Lucio Bento Fagundes Junior', role: 'Secretário', company: 'Rápido Montes Claros', image: '../assets/member_placeholder_1769715974165.png' },
    { id: '3', name: 'Paulo Roberto de Almeida', role: 'Tesoureiro', company: 'Transportadora Januária', image: '../assets/member_placeholder_1769715974165.png' },
    { id: '4', name: 'Antônio Sapori', role: 'Conselho Fiscal Efetivo', company: 'Transnorte Cargas', image: '../assets/member_placeholder_1769715974165.png' },
    { id: '5', name: 'Jorge Antônio dos Santos', role: 'Conselho Fiscal Efetivo', company: 'JLSI Logística', image: '../assets/member_placeholder_1769715974165.png' },
    { id: '6', name: 'Antônio Henrique Sapori Filho', role: 'Conselho Fiscal Suplente', company: 'PraMinas Log', image: '../assets/member_placeholder_1769715974165.png' }
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
        item.gallery = item.gallery || []; // Ensure gallery exists
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

    static updateService(id, data) {
        let list = this.getServices();
        const index = list.findIndex(i => i.id === id);
        if (index !== -1) {
            list[index] = { ...list[index], ...data, id };
            this._set(KEYS.SERVICES, list);
            return list[index];
        }
        return null;
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
        return this._get(KEYS.REQUESTS, [
            {
                id: '1',
                company: 'Transportadora Exemplo Ltda',
                cnpj: '12.345.678/0001-90',
                city: 'Montes Claros/MG',
                name: 'João da Silva',
                role: 'Gerente Operacional',
                phone: '(38) 99999-8888',
                date: new Date().toISOString()
            }
        ]);
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
