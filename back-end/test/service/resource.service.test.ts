import profileDb from '../../domain/data-access/profile.db';
import resourceDb from '../../domain/data-access/resource.db';
import { Profile } from '../../domain/model/profile';
import { Resource } from '../../domain/model/resource';
import resourceService from '../../service/resource.service';
import { AuthenticationResponse, ResourceInput } from '../../types';

const id = 1;
const createdAt = new Date();
const updatedAt = new Date();
const latestActivity = new Date();
const title = 'Hello World';
const description = 'This is a test resource';
const profileId = 1;
const email = 'resource.service.test@tistudent.com';
const username = 'DonVitoCorleone';
const password = 'resourceServiceT3st_;D';
const role = 'USER';
const picture = 'default-profilePicture.jpg';
const filePath = 'aple.jpg';
const thumbNail = 'default-thumbnail1.jpg';

const resource = new Resource({
    id,
    createdAt,
    updatedAt,
    title,
    description,
    filePath,
    thumbNail,
    profileId,
});

const profile = new Profile({
    id,
    createdAt,
    updatedAt,
    latestActivity,
    email,
    username,
    password,
    role,
    picture: picture,
});

const resourceInput: ResourceInput = {
    title,
    description,
    profileId,
    filePath,
    thumbNail,
};

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
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(profile);
    resourceDb.createResource = mockResourceDbCreateResource.mockResolvedValue(resource);

    // when
    const sut = await resourceService.createResource(
        { id: String(profileId) } as AuthenticationResponse,
        resourceInput
    );

    // then
    expect(mockResourceDbCreateResource).toHaveBeenCalledTimes(1);
    expect(sut.title).toEqual(title);
    expect(sut.description).toEqual(description);
    expect(sut.profileId).toEqual(profileId);
});

test(`given: invalid profile id, when: Resource is created, then: error is thrown`, async () => {
    // given
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

    // when
    const sut = async () =>
        await resourceService.createResource({ id: String(profileId) } as AuthenticationResponse, resourceInput);

    // then
    await expect(sut).rejects.toThrowError('Profile with id 1 does not exist');
    expect(mockProfileDbGetProfileById).toHaveBeenCalledTimes(1);
});

test(`given: not owner of Resource, when: Resource is created, then: error is thrown`, async () => {
    // given
    // when
    const sut = async () =>
        await resourceService.createResource({ id: String(69420) } as AuthenticationResponse, resourceInput);

    // then
    await expect(sut).rejects.toThrowError('You cannot create a resource as someone else!');
});

test(`given: valid id for Resource, when: Resource is requested, then: Resource is returned`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(resource);

    // when
    const sut = await resourceService.getResourceById(1);

    // then
    expect(mockResourceDbGetResourceById).toHaveBeenCalledTimes(1);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(1);
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
    resourceDb.getAllResources = mockResourceDbGetAllResources.mockResolvedValue([resource]);

    // when
    const returnedResources = await resourceService.getAllResources();

    // then
    expect(mockResourceDbGetAllResources).toHaveBeenCalledTimes(1);
    expect(returnedResources).toEqual([resource]);
});

test(`given: not owner of Resource, when: Resource is updated, then: error is thrown`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(resource);

    // when
    const sut = async () =>
        await resourceService.updateResource({ id: String(69420) } as AuthenticationResponse, 1, resourceInput);

    // then
    await expect(sut).rejects.toThrowError("You cannot update someone else's resource!");
});

test(`given: not owner of Resource, when: Resource is deleted, then: error is thrown`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(resource);
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(profile);

    // when
    const sut = async () => await resourceService.deleteResource({ id: String(69420) } as AuthenticationResponse, 1);

    // then
    await expect(sut).rejects.toThrowError("You cannot delete someone else's resource!");
});
