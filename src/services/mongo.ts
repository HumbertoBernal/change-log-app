import { Filter, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { CreateProjectAPI, CreateProject, FilterProject, PatchProject, Project, ProjectQuery } from "@/modules/projects/types";
import { CreateLogAPI, CreateLog, FilterLog, Log, LogQuery } from "@/modules/logs/types";
import { getProjectQuery, getLogQuery } from "@/modules/projects/utils";

export const NUMBER_PER_PAGE = 5;
// Connection URL
const client = new MongoClient(process.env.MONGO_URI ?? '', { serverApi: ServerApiVersion.v1 });

// Database Name
const dbName = 'changeLogDB';
const projectCollectionName = 'projects';
const logCollectionName = 'logs';

const create = async <TData>(info: TData, dbName: string, collectionName: string) => {

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const now = new Date().toISOString();

    const data = {
        ...info,
        created_at: now,
        updated_at: now,
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

const list = async <TData>(query: Filter<Document>, page: number, dbName: string, collectionName: string) => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const count = await collection.find(query).count();

    const findResult = (await collection.find(query).skip(NUMBER_PER_PAGE * page).limit(NUMBER_PER_PAGE).toArray()) as unknown as TData[];
    client.close()

    return { count, findResult }
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

const createProject = async ({ name, description, created_by }: CreateProjectAPI) => await create<CreateProject>({ name, description, created_by }, dbName, projectCollectionName);
const listProjects = async (filters?: FilterProject, page: number) => await list<Project>(getProjectQuery(filters), page, dbName, projectCollectionName);
const getProject = async (id: string) => await get<Project>(id, dbName, projectCollectionName);
const patchProject = async (id: string, project: PatchProject) => await update<PatchProject>(id, project, dbName, projectCollectionName);
const putProject = async (id: string, project: Project) => await update<Project>(id, project, dbName, projectCollectionName);
const deleteProject = async (id: string) => await remove(id, dbName, projectCollectionName);

const createLog = async (log: CreateLogAPI) => await create<CreateLogAPI>({ ...log }, dbName, logCollectionName);
const listLogs = async (filters?: FilterLog, page: number) => await list<Log>(getLogQuery(filters), page, dbName, logCollectionName);
const getLog = async (id: string) => await get<Log>(id, dbName, logCollectionName);
const patchLog = async (id: string, log: PatchLog) => await update<PatchLog>(id, log, dbName, logCollectionName);
const putLog = async (id: string, log: Log) => await update<Log>(id, log, dbName, logCollectionName);
const deleteLog = async (id: string) => await remove(id, dbName, logCollectionName);

export const MongoService = {
    createProject,
    getProject,
    listProjects,
    patchProject,
    putProject,
    deleteProject,

    createLog,
    listLogs,
    getLog,
    patchLog,
    putLog,
    deleteLog,
}