import { MeiliSearch, Index } from 'meilisearch';

export interface ISearchService {
  search(indexName: string, query: string): Promise<any>;
  addDocuments(indexName: string, documents: any[]): Promise<Object>;
  updateIndex(indexName: string, documents: any[]): Promise<void>;
  addIndex(indexName: string): Promise<void>;
  deleteIndex(indexName: string): Promise<void>;
  deleteDocument(indexName: string, documentId: string): Promise<void>;
}

export default class Search implements ISearchService {
  private client: MeiliSearch;

  constructor() {
    this.client = new MeiliSearch({
      host: process.env.MANTRA_SEARCH_URL || 'http://localhost:7700',
    });
  }

  async addDocuments(indexName: string, documents: any[]): Promise<Object> {
    console.log(documents);
    return await this.client.index(indexName).addDocuments(documents);
  }

  async search(indexName: string, query: string): Promise<any> {
    const response = await this.client.index(indexName).search(query);
    return response.hits;
  }

  async updateIndex(indexName: string, documents: any[]): Promise<void> {
    const index: Index = await this.client.getIndex(indexName);
    await index.updateDocuments(documents);
  }

  async addIndex(indexName: string): Promise<void> {
    await this.client.createIndex(indexName);
  }

  async deleteIndex(indexName: string): Promise<void> {
    await this.client.deleteIndex(indexName);
  }
  async deleteDocument(indexName: string, documentId: string): Promise<void> {
    await this.client.index(indexName).deleteDocument(documentId);
  }
}
