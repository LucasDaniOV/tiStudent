import resourceDb from '../domain/data-access/resource.db';
import { Resource } from '../domain/model/resource';

const getAllResources = async (): Promise<Resource[]> => resourceDb.getAllResources();

const getResourceById = async (id: number): Promise<Resource> => {
    const resource = await resourceDb.getResourceById(id);
    if (!resource) throw new Error(`Resource with id ${id} does not exist`);
    return resource;
};

export default { getAllResources, getResourceById };
