import { ChromaClient } from 'chromadb'
import { CHROMA_ENV } from '../config.js'

// Docs of APIs on PORT 8000 - http://localhost:8000/docs
class Chroma {
    static client = null
    static collection = null

    static async init() {
        const config = {
            auth: {
                provider: 'chromadb.auth.token.TokenAuthServerProvider',
                credentials: 'test-token',
            },
            path: 'http://chroma.railway.internal:8000',
        }
        console.log(JSON.stringify(config, null, 2))
        this.client = new ChromaClient(config)
        this.collection = await this.client.getOrCreateCollection({
            name: 'movies',
        })
    }
    static async getCollection() {
        return this.collection
    }

    static async query({ q, n }) {
        try {
            const results = await this.collection.query({
                queryTexts: [q], // the search query
                nResults: n, // how many results to return
            })
            return results
        } catch (e) {
            console.log(`ChromaDB ERR: Could not query: ${q}.`)
            console.log(e)
        }
    }

    static async singleAdd(entity) {
        try {
            await this.collection.add({
                documents: [entity.text],
                ids: [entity.id],
            })
        } catch (e) {
            console.log(
                `ChromaDB ERR: Could not perform singleAdd for ID ${entity.id}.`
            )
            console.log(e)
        }
    }

    static async singleUpsert(entity) {
        try {
            await this.collection.upsert({
                documents: [entity.text],
                ids: [entity.id],
            })
        } catch (e) {
            console.log(
                `ChromaDB ERR: Could not perform upsert for ID ${entity.id}.`
            )
            console.log(e)
        }
    }

    static async bulkAdd(entities = []) {
        try {
            const documents = []
            const ids = []

            for (const doc of entities) {
                documents.push(doc.text)
                ids.push(doc.id)
            }
            console.log(documents, ids)
            await this.collection.add({
                documents,
                ids,
            })
        } catch (e) {
            console.log(`ChromaDB ERR: Could not perform bulkAdd.`)
            console.log(e)
        }
    }

    static async bulkUpsert(entities) {
        try {
            const documents = []
            const ids = []

            for (const doc of entities) {
                documents.push(doc.text)
                ids.push(doc.id)
            }
            console.log('Pushed - ', entities.length)
            await this.collection.upsert({
                documents,
                ids,
            })
        } catch (e) {
            console.log(`ChromaDB ERR: Could not perform bulkAdd.`)
            console.log(e)
        }
    }
}

export default Chroma
