import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

const COLLECTIONS = {
    NEWS: 'news',
    PARTNERS: 'partners',
    SERVICES: 'services',
    DIRECTORS: 'directors',
    GENERAL: 'general',
    REQUESTS: 'requests'
};

// --- SEED DATA (COPIED FROM STORAGE.JS) ---
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
    { id: '1', name: 'Antônio Henrique Sapori', role: 'Presidente', company: 'Rodonasa Cargas', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '2', name: 'Lucio Bento Fagundes Junior', role: 'Secretário', company: 'Rápido Montes Claros', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '3', name: 'Paulo Roberto de Almeida', role: 'Tesoureiro', company: 'Transportadora Januária', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '4', name: 'Antônio Sapori', role: 'Conselho Fiscal Efetivo', company: 'Transnorte Cargas', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '5', name: 'Jorge Antônio dos Santos', role: 'Conselho Fiscal Efetivo', company: 'JLSI Logística', image: 'assets/member_placeholder_1769715974165.png' },
    { id: '6', name: 'Antônio Henrique Sapori Filho', role: 'Conselho Fiscal Suplente', company: 'PraMinas Log', image: 'assets/member_placeholder_1769715974165.png' }
];

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

export class FirestoreService {

    // --- SEED HELPER ---
    static async seedDatabase() {
        console.log("Checking database for seeds...");

        // Seed News
        const news = await this.getNews();
        if (news.length === 0) {
            console.log("Seeding News...");
            for (const item of SEED_NEWS) {
                // Remove ID to let Firestore generate one, or keep it if we want fixed IDs?
                // For migration, we might want to generate clean IDs, but keeping them is fine too.
                const { id, ...data } = item;
                await this._add(COLLECTIONS.NEWS, data);
            }
        }

        // Seed Partners
        const partners = await this.getPartners();
        if (partners.length === 0) {
            console.log("Seeding Partners...");
            for (const item of SEED_PARTNERS) {
                const { id, ...data } = item;
                await this._add(COLLECTIONS.PARTNERS, data);
            }
        }

        // Seed Services
        const services = await this.getServices();
        if (services.length === 0) {
            console.log("Seeding Services...");
            for (const item of SEED_SERVICES) {
                const { id, ...data } = item;
                await this._add(COLLECTIONS.SERVICES, data);
            }
        }

        // Seed Directors
        const directors = await this.getDirectors();
        if (directors.length === 0) {
            console.log("Seeding Directors...");
            for (const item of SEED_DIRECTORS) {
                const { id, ...data } = item;
                await this._add(COLLECTIONS.DIRECTORS, data);
            }
        }

        // Seed General
        const general = await this.getGeneral();
        if (!general) {
            console.log("Seeding General Settings...");
            await this._add(COLLECTIONS.GENERAL, SEED_GENERAL);
        }

        console.log("Database seed check complete.");
    }

    // --- GENERIC HELPERS ---
    static async _getAll(collectionName) {
        try {
            const q = query(collection(db, collectionName));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (e) {
            console.error(`Error getting ${collectionName}:`, e);
            return [];
        }
    }

    static async _add(collectionName, item) {
        try {
            const docRef = await addDoc(collection(db, collectionName), item);
            return { id: docRef.id, ...item };
        } catch (e) {
            console.error(`Error adding to ${collectionName}:`, e);
            throw e;
        }
    }

    static async _delete(collectionName, id) {
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (e) {
            console.error(`Error deleting from ${collectionName}:`, e);
            throw e;
        }
    }

    static async _update(collectionName, id, data) {
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, data);
            return { id, ...data };
        } catch (e) {
            console.error(`Error updating ${collectionName}:`, e);
            throw e;
        }
    }

    // --- NEWS ---
    static async getNews() {
        const news = await this._getAll(COLLECTIONS.NEWS);
        // Sort by date descending (Newest first)
        return news.sort((a, b) => {
            const dateA = new Date(a.news_date || a.date || 0);
            const dateB = new Date(b.news_date || b.date || 0);
            return dateB - dateA;
        });
    }

    static async addNews(item) {
        return this._add(COLLECTIONS.NEWS, item);
    }

    static async deleteNews(id) {
        return this._delete(COLLECTIONS.NEWS, id);
    }

    // --- PARTNERS ---
    static async getPartners() {
        return this._getAll(COLLECTIONS.PARTNERS);
    }

    static async addPartner(item) {
        return this._add(COLLECTIONS.PARTNERS, item);
    }

    static async deletePartner(id) {
        return this._delete(COLLECTIONS.PARTNERS, id);
    }

    // --- SERVICES ---
    static async getServices() {
        return this._getAll(COLLECTIONS.SERVICES);
    }

    static async addService(item) {
        return this._add(COLLECTIONS.SERVICES, item);
    }

    static async deleteService(id) {
        return this._delete(COLLECTIONS.SERVICES, id);
    }

    static async updateService(id, item) {
        return this._update(COLLECTIONS.SERVICES, id, item);
    }

    // --- DIRECTORS ---
    static async getDirectors() {
        return this._getAll(COLLECTIONS.DIRECTORS);
    }

    static async addDirector(item) {
        return this._add(COLLECTIONS.DIRECTORS, item);
    }

    static async deleteDirector(id) {
        return this._delete(COLLECTIONS.DIRECTORS, id);
    }

    // --- REQUESTS ---
    static async getRequests() {
        return this._getAll(COLLECTIONS.REQUESTS);
    }

    static async addRequest(item) {
        return this._add(COLLECTIONS.REQUESTS, {
            ...item,
            createdAt: new Date().toISOString()
        });
    }

    static async deleteRequest(id) {
        return this._delete(COLLECTIONS.REQUESTS, id);
    }

    // --- GENERAL SETTINGS ---
    // General settings might be a single document in a collection
    static async getGeneral() {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTIONS.GENERAL));
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return { id: doc.id, ...doc.data() };
            }
            return null; // Handle seeding if null
        } catch (e) {
            console.error("Error getting general settings:", e);
            return null;
        }
    }

    static async updateGeneral(data) {
        // Check if exists first
        const current = await this.getGeneral();
        if (current && current.id) {
            return this._update(COLLECTIONS.GENERAL, current.id, data);
        } else {
            return this._add(COLLECTIONS.GENERAL, data);
        }
    }
}
