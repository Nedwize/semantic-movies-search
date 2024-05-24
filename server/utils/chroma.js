import { ChromaClient } from 'chromadb'
const client = new ChromaClient()

const collection = await client.getOrCreateCollection({
    name: 'movies',
})

// Docs of APIs on PORT 8000 - http://localhost:8000/docs
class Chroma {
    static async getCollection() {
        return collection
    }

    static async query({ q, n }) {
        try {
            const results = await collection.query({
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
            await collection.add({
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
            await collection.upsert({
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
            await collection.add({
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
            await collection.upsert({
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
