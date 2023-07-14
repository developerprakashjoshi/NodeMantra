"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const meilisearch_1 = require("meilisearch");
class Search {
    constructor() {
        this.client = new meilisearch_1.MeiliSearch({
            host: process.env.MANTRA_SEARCH_URL || 'http://localhost:7700',
        });
    }
    addDocuments(indexName, documents) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(documents);
            return yield this.client.index(indexName).addDocuments(documents);
        });
    }
    search(indexName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.index(indexName).search(query);
            return response.hits;
        });
    }
    updateIndex(indexName, documents) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.client.getIndex(indexName);
            yield index.updateDocuments(documents);
        });
    }
    addIndex(indexName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.createIndex(indexName);
        });
    }
    deleteIndex(indexName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.deleteIndex(indexName);
        });
    }
    deleteDocument(indexName, documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.index(indexName).deleteDocument(documentId);
        });
    }
}
exports.default = Search;
