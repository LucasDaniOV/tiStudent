import resourceDb from '../../domain/data-access/resource.db';
import userDb from '../../domain/data-access/user.db';
import { Category } from '../../domain/model/category';
import { Resource } from '../../domain/model/resource';
import { Subject } from '../../domain/model/subject';
import { User } from '../../domain/model/user';
import resourceService from '../../service/resource.service';

const creator = new User({ id: 0, email: 'resource.service.test@tistudent.be', password: '_r3sourceSe4viceTe5t' });
const creatorInput = { id: 0 };

const createdAt = new Date();
const title = 'Hello World';
const description = 'This is a test resource';
const category = Category.CheatSheet;
const subject = Subject.FullStack_Software_Develoment;

let mockResourceDbCreateResource: jest.SpyInstance<Resource, [{ creator: any; createdAt: any; title: any; description: any; category: any; subject: any }], any>;
let mockUserDbGetUserById: jest.SpyInstance<User, [id: number], any>;
let mockResourceDbGetResourceById: jest.SpyInstance<Resource, [id: number], any>;
let mockResourceDbGetAllResources: jest.SpyInstance<Resource[], [], any>;

beforeEach(() => {
    mockResourceDbCreateResource = jest.spyOn(resourceDb, 'createResource');
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
    mockResourceDbGetResourceById = jest.spyOn(resourceDb, 'getResourceById');
    mockResourceDbGetAllResources = jest.spyOn(resourceDb, 'getAllResources');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for Resource, when: Resource is created, then: Resource is created with those values`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(creator);

    // when
    resourceService.createResource({ creator: creatorInput, createdAt, title, description, category, subject });

    // then
    expect(mockResourceDbCreateResource).toHaveBeenCalledTimes(1);
    expect(mockResourceDbCreateResource).toHaveBeenCalledWith(
        new Resource({ creator, createdAt, title, description, category, subject })
    );
});

test(`given: no creator, when: Resource is created, then: error is thrown`, async () => {
    // when
    const createResource = () =>
        resourceService.createResource({
            createdAt: createdAt,
            title: title,
            description: description,
            category: category,
            subject: subject,
        });

    // then
    await expect(createResource).rejects.toThrowError('creator User is required');
});

test(`given: invalid creator, when: Resource is created, then: error is thrown`, async () => {
    // given
    mockUserDbGetUserById.mockReturnValue(undefined);

    // when
    const createResource = () =>
        resourceService.createResource({
            creator: { id: 69420 },
            createdAt: createdAt,
            title: title,
            description: description,
            category: category,
            subject: subject,
        });

    // then
    await expect(createResource).rejects.toThrowError('User with id 69420 does not exist');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});

test(`given: valid id for Resource, when: Resource is requested, then: Resource is returned`, async () => {
    // given
    const resource = new Resource({ id: 0, creator, createdAt, title, description, category, subject });
    mockResourceDbGetResourceById.mockReturnValue(resource);

    // when
    const returnedResource = await resourceService.getResourceById(0);

    // then
    expect(mockResourceDbGetResourceById).toHaveBeenCalledTimes(1);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(0);
    expect(returnedResource).toEqual(resource);
});

test(`given: invalid id for Resource, when: Resource is requested, then: error is thrown`, async () => {
    // given
    mockResourceDbGetResourceById.mockReturnValue(undefined);

    // when
    const getResource = () => resourceService.getResourceById(69420);

    // then
    await expect(getResource).rejects.toThrowError('Resource with id 69420 does not exist');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledTimes(1);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(69420);
});

test(`given: available Resources, when: all Resources are requested, then: all Resources are returned`, async () => {
    // given
    const resources = [
        new Resource({ id: 0, creator, createdAt, title, description, category, subject }),
        new Resource({ id: 1, creator, createdAt, title, description, category, subject }),
        new Resource({ id: 2, creator, createdAt, title, description, category, subject }),
    ];
    mockResourceDbGetAllResources.mockReturnValue(resources);

    // when
    const returnedResources = await resourceService.getAllResources();

    // then
    expect(mockResourceDbGetAllResources).toHaveBeenCalledTimes(1);
    expect(returnedResources).toEqual(resources);
});