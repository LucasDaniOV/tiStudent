import { Resource } from '../model/resource';
import { Category } from '../model/category';
import { Subject } from '../model/subject';

let currentId = 1;

const resources: Resource[] = [
    new Resource({
        id: currentId++,
        creatorId: 0,
        title: 'Hello World',
        description: 'This is a test resource',
        category: Category.CheatSheet,
        subject: Subject.FullStack_Software_Develoment,
    }),
    new Resource({
        id: currentId++,
        creatorId: 0,
        title: 'Resource 2',
        description: 'This is also a test resource',
        category: Category.Summary,
        subject: Subject.Data_Analytics_Machine_Learning,
    }),
];

const getAllResources = (): Resource[] => resources;

const getResourceById = (id: number): Resource | undefined =>
    resources.find((resource) => resource.id === id);

export default { getAllResources, getResourceById };
