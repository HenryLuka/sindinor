import { StorageService } from './storage.js';

export class ApiService {

    // --- NEWS ---
    static async getNews() {
        // Simulate network delay for realism
        await new Promise(r => setTimeout(r, 300));
        return StorageService.getNews();
    }

    static async addNews(item) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.addNews(item);
    }

    static async deleteNews(id) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.deleteNews(id);
    }

    // --- PARTNERS ---
    static async getPartners() {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.getPartners();
    }

    static async addPartner(item) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.addPartner(item);
    }

    static async deletePartner(id) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.deletePartner(id);
    }

    // --- SERVICES ---
    static async getServices() {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.getServices();
    }

    static async addService(item) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.addService(item);
    }

    static async deleteService(id) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.deleteService(id);
    }

    static async updateService(id, item) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.updateService(id, item);
    }

    // --- DIRECTORS ---
    static async getDirectors() {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.getDirectors();
    }

    static async addDirector(item) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.addDirector(item);
    }

    static async deleteDirector(id) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.deleteDirector(id);
    }

    // --- GENERAL ---
    static async getGeneral() {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.getGeneral();
    }

    static async updateGeneral(data) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.updateGeneral(data);
    }

    // --- REQUESTS ---
    static async getRequests() {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.getRequests();
    }

    static async addRequest(item) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.addRequest(item);
    }

    static async deleteRequest(id) {
        await new Promise(r => setTimeout(r, 300));
        return StorageService.deleteRequest(id);
    }
}
