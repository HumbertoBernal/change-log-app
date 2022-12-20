import { Filter, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { CreateProject, FilterProject, PatchProject, Project, ProjectQuery } from "@/modules/projects/types";
import { getQuery } from "@/modules/projects/utils";


// Connection URL
const client = new MongoClient(process.env.MONGO_URI ?? '', { serverApi: ServerApiVersion.v1 });

// Database Name
const dbName = 'changeLogDB';
const projectCollectionName = 'projects';

const create = async <TData>(info: TData, dbName: string, collectionName: string) => {

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const now = new Date().toISOString();

    const data = {
        ...info,
        created_at: now,
        updated_at: now,
        created_by: { name: "Michael Doe", email: "jdowmich@gmail.com" }
    }

    const result = await collection.insertOne(data);

    client.close();

    return result.acknowledged ? result.insertedId : null
}

const get = async <TData>(id: string, dbName: string, collectionName: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const findResult = (await collection.findOne({ "_id": new ObjectId(id) })) as unknown as TData;

    client.close()

    return findResult
}

const list = async <TData>(query: Filter<Document> , dbName: string, collectionName: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const findResult = (await collection.find(query).toArray()) as unknown as TData[];
    client.close()
    return findResult
};

const update = async <TData>(id: string, project: TData, dbName: string, collectionName: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const updatedProject = { ...project, updated_at: new Date().toISOString() }
    const updateResult = await collection.updateOne({ "_id": new ObjectId(id) }, { $set: updatedProject });

    client.close();

    return updateResult.acknowledged ? id : null
}

const remove = async (id: string, dbName: string, collectionName: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const deleteResult = await collection.deleteOne({ "_id": new ObjectId(id) });

    client.close();

    return deleteResult
}

const createProject = (name: string, description: string) => create<CreateProject>({ name, description }, dbName, projectCollectionName);
const getProject = (id: string) => get<Project>(id, dbName, projectCollectionName);
const listProjects = async (filters?: FilterProject) => list<Project>(getQuery(filters), dbName, projectCollectionName);
const patchProject = async (id: string, project: PatchProject) => update<PatchProject>(id, project, dbName, projectCollectionName);
const putProject = async (id: string, project: Project) => update<Project>(id, project, dbName, projectCollectionName);
const deleteProject = async (id: string) => remove(id, dbName, projectCollectionName);


export const MongoService = {
    createProject,
    getProject,
    listProjects,
    patchProject,
    putProject,
    deleteProject,
}