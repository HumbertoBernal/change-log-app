import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { CreateProject, Project, UpdateProject } from "@/modules/projects/types";


// Connection URL
const client = new MongoClient(process.env.MONGO_URI ?? '', { serverApi: ServerApiVersion.v1 });

// Database Name
const dbName = 'changeLogDB';
const collectionName = 'documents';

const createProject = async (name: string, description: string) => {

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const now = new Date().toUTCString();

    const project: CreateProject = {
        name: name,
        description: description,
        created_at: now,
        updated_at: now,
        created_by: { name: "John Doe", email: "jdow@gmail.com" }
    }

    const result = await collection.insertOne(project);

    client.close();

    return result.acknowledged ? result.insertedId : null
}

const getProject = async (id: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const findResult = (await collection.findOne({ "_id": new ObjectId(id) })) as unknown as Project;


    console.log(findResult);
    client.close()

    return findResult
}

const listProjects = async () => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const findResult = (await collection.find({}).toArray()) as unknown as Project[];

    console.log(findResult);

    client.close()

    return findResult
}

const updateProjects = async (id: string, project: UpdateProject) => {
    await client.connect();


    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const updateResult = await collection.updateOne({ "_id": new ObjectId(id) }, { $set: project });

    client.close();

    return updateResult.acknowledged ? id : null
}

const deleteProject = async (id: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('documents');

    const deleteResult = await collection.deleteOne({ "_id": new ObjectId(id) });

    client.close();

    return deleteResult.acknowledged ? id : null
}

export const MongoService = {
    createProject,
    getProject,
    listProjects,
    updateProjects,
    deleteProject,
}