import profileDb from '../../domain/data-access/profile.db';
import resourceDb from '../../domain/data-access/resource.db';
import { Category } from '../../domain/model/category';
import { Profile } from '../../domain/model/profile';
import { Resource } from '../../domain/model/resource';
import { Subject } from '../../domain/model/subject';
import resourceService from '../../service/resource.service';

const creator = new Profile({
    id: 69420,
    email: 'resource.service.test@tistudent.be',
    password: '_r3sourceSe4viceTe5t',
    role: 'admin',
    username: 'resourceServiceTest',
});

const title = 'Hello World';
const description = 'This is a test resource';
const category = Category.CheatSheet;
const subject = Subject.FullStack_Software_Develoment;

let mockResourceDbGetResourceByContent: jest.Mock;
let mockResourceDbCreateResource: jest.Mock;
let mockResourceDbGetResourceById: jest.Mock;
let mockResourceDbGetAllResources: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;

beforeEach(() => {
    mockResourceDbCreateResource = jest.fn();
    mockResourceDbGetResourceByContent = jest.fn();
    mockResourceDbGetResourceById = jest.fn();
    mockResourceDbGetAllResources = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for Resource, when: Resource is created, then: Resource is created with those values`, async () => {
    // given
    const resource = new Resource({ creator, title, description, category, subject });
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(creator);
    resourceDb.getResourceByContent = mockResourceDbGetResourceByContent.mockReturnValue(undefined);
    resourceDb.createResource = mockResourceDbCreateResource.mockResolvedValue(resource);

    // when
    const sut = await resourceService.createResource({ creator, title, description, category, subject });

    // then
    expect(mockResourceDbCreateResource).toHaveBeenCalledTimes(1);
    expect(sut.creator).toEqual(creator);
    expect(sut.title).toEqual(title);
    expect(sut.description).toEqual(description);
    expect(sut.category).toEqual(category);
    expect(sut.subject).toEqual(subject);
});

test(`given: existing Resource, when: Resource is created, then: error is thrown`, () => {
    // given
    const resource = new Resource({ creator, title, description, category, subject });
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(creator);
    resourceDb.getResourceByContent = mockResourceDbGetResourceByContent.mockReturnValue(resource);

    // when
    const sut = async () => await resourceService.createResource({ creator, title, description, category, subject });

    // then
    expect(sut).rejects.toThrowError('Resource already exists');
});

test(`given: no creator, when: Resource is created, then: error is thrown`, () => {
    // when
    const sut = async () => await resourceService.createResource({ title, description, category, subject });

    // then
    expect(sut).rejects.toThrowError('creator Profile is required');
});

test(`given: invalid creator, when: Resource is created, then: error is thrown`, async () => {
    // given
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

    // when
    const sut = async () => await resourceService.createResource({ creator, title, description, category, subject });

    // then
    await expect(sut).rejects.toThrowError('Profile with id 69420 does not exist');
    expect(mockProfileDbGetProfileById).toHaveBeenCalledTimes(1);
});

test(`given: valid id for Resource, when: Resource is requested, then: Resource is returned`, async () => {
    // given
    const resource = new Resource({ creator, title, description, category, subject });
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(resource);

    // when
    const sut = await resourceService.getResourceById(0);

    // then
    expect(mockResourceDbGetResourceById).toHaveBeenCalledTimes(1);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(0);
    expect(sut).toEqual(resource);
});

test(`given: invalid id for Resource, when: Resource is requested, then: error is thrown`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(undefined);

    // when
    const sut = () => resourceService.getResourceById(69420);

    // then
    await expect(sut).rejects.toThrowError('Resource with id 69420 does not exist');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledTimes(1);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(69420);
});

test(`given: available Resources, when: all Resources are requested, then: all Resources are returned`, async () => {
    // given
    const resources = [
        new Resource({ id: 0, creator, title, description, category, subject }),
        new Resource({ id: 1, creator, title, description, category, subject }),
        new Resource({ id: 2, creator, title, description, category, subject }),
    ];
    resourceDb.getAllResources = mockResourceDbGetAllResources.mockResolvedValue(resources);

    // when
    const returnedResources = await resourceService.getAllResources('admin');

    // then
    expect(mockResourceDbGetAllResources).toHaveBeenCalledTimes(1);
    expect(returnedResources).toEqual(resources);
});
