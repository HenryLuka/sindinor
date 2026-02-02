// import { StorageService } from './storage.js';
import { FirestoreService } from './firestore-service.js';

// Alias for easier switching
const DB = FirestoreService;

export class ApiService {

    // --- HELPERS ---
    static _fixPath(item) {
        if (!item) return item;
        const fix = (str) => {
            if (typeof str === 'string' && str.startsWith('assets/')) {
                return '/' + str;
            }
            return str;
        };

        if (Array.isArray(item)) {
            return item.map(i => this._fixPath(i));
        }

        const newItem = { ...item };
        // Common image fields
        if (newItem.image) newItem.image = fix(newItem.image);
        if (newItem.image_url) newItem.image_url = fix(newItem.image_url);
        if (newItem.img) newItem.img = fix(newItem.img);
        if (newItem.logo) newItem.logo = fix(newItem.logo);

        // Gallery arrays
        if (newItem.gallery && Array.isArray(newItem.gallery)) {
            newItem.gallery = newItem.gallery.map(img => fix(img));
        }

        return newItem;
    }

    // --- NEWS ---
    static async getNews() {
        if (!window.dbInitialized) {
            await DB.seedDatabase();
            window.dbInitialized = true;
        }
        const data = await DB.getNews();
        return this._fixPath(data);
    }

    static async addNews(item) {
        return DB.addNews(item);
    }

    static async updateNews(id, item) {
        return DB.updateNews(id, item);
    }

    static async deleteNews(id) {
        return DB.deleteNews(id);
    }

    // --- PARTNERS ---
    static async getPartners() {
        const data = await DB.getPartners();
        return this._fixPath(data);
    }

    static async addPartner(item) {
        return DB.addPartner(item);
    }

    static async deletePartner(id) {
        return DB.deletePartner(id);
    }

    // --- SERVICES ---
    static async getServices() {
        const data = await DB.getServices();
        return this._fixPath(data);
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
        const data = await DB.getDirectors();
        return this._fixPath(data);
    }

    static async addDirector(item) {
        return DB.addDirector(item);
    }

    static async deleteDirector(id) {
        return DB.deleteDirector(id);
    }

    static async updateDirector(id, item) {
        return DB.updateDirector(id, item);
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
