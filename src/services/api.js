// import { StorageService } from './storage.js';
import { FirestoreService } from './firestore-service.js';

// Alias for easier switching
const DB = FirestoreService;

export class ApiService {

    // --- NEWS ---
    static async getNews() {
        // Trigger seed check on first load of common data
        // Ideally this should be in an App.init() but here works for now
        // We can add a simple check to avoid running it every time if needed, 
        // but the service check is relatively cheap (just reads).
        // For optimization, we could cache "initialized" state in memory.
        if (!window.dbInitialized) {
            await DB.seedDatabase();
            window.dbInitialized = true;
        }

        // Simulate network delay for realism (optional, Firebase has its own)
        // await new Promise(r => setTimeout(r, 300));
        return DB.getNews();
    }

    static async addNews(item) {
        return DB.addNews(item);
    }

    static async deleteNews(id) {
        return DB.deleteNews(id);
    }

    // --- PARTNERS ---
    static async getPartners() {
        return DB.getPartners();
    }

    static async addPartner(item) {
        return DB.addPartner(item);
    }

    static async deletePartner(id) {
        return DB.deletePartner(id);
    }

    // --- SERVICES ---
    static async getServices() {
        return DB.getServices();
    }

    static async addService(item) {
        return DB.addService(item);
    }

    static async deleteService(id) {
        return DB.deleteService(id);
    }

    static async updateService(id, item) {
        return DB.updateService(id, item);
    }

    // --- DIRECTORS ---
    static async getDirectors() {
        return DB.getDirectors();
    }

    static async addDirector(item) {
        return DB.addDirector(item);
    }

    static async deleteDirector(id) {
        return DB.deleteDirector(id);
    }

    // --- GENERAL ---
    static async getGeneral() {
        return DB.getGeneral();
    }

    static async updateGeneral(data) {
        return DB.updateGeneral(data);
    }

    // --- REQUESTS ---
    static async getRequests() {
        return DB.getRequests();
    }

    static async addRequest(item) {
        return DB.addRequest(item);
    }

    static async deleteRequest(id) {
        return DB.deleteRequest(id);
    }
}
