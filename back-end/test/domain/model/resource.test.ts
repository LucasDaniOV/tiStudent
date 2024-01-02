import { Resource } from '../../../domain/model/resource';

const validId = 1;
const validCreatedAt = new Date();
const validUpdatedAt = new Date();
const validTitle = 'Hello World';
const validDescription = 'This is a test resource';
const validProfileId = 1;
const validFilePath = 'aple.jpg';
const validThumbnail = 'default-thumbnail1.jpg';

test(`given: valid values for Resource, when: Resource is created, then: Resource is created`, () => {
    // when
    const resource = new Resource({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        title: validTitle,
        description: validDescription,
        profileId: validProfileId,
        filePath: validFilePath,
        thumbNail: validThumbnail,
    });

    // then
    expect(resource instanceof Resource).toBeTruthy();
});

test(`given: no title, when: Resource is created, then: error is thrown`, () => {
    // when
    const createResource = () =>
        new Resource({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            description: validDescription,
            profileId: validProfileId,
        } as Resource);

    // then
    expect(createResource).toThrowError('title is required');
});

test(`given: no description, when: Resource is created, then: error is thrown`, () => {
    // when
    const createResource = () =>
        new Resource({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            title: validTitle,
            profileId: validProfileId,
        } as Resource);

    // then
    expect(createResource).toThrowError('description is required');
});

test(`given: too long title, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidTitle = 'a'.repeat(61);

    // when
    const createResource = () =>
        new Resource({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            title: invalidTitle,
            description: validDescription,
            profileId: validProfileId,
            filePath: validFilePath,
            thumbNail: validThumbnail,
        });

    // then
    expect(createResource).toThrowError('title cannot be longer than 60 characters');
});

test(`given: too long description, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidDescription =
        "As a developer, it's important to stay up-to-date with the latest technologies and trends in the industry. This means constantly learning and improving your skills, whether it's through online courses, attending conferences, or collaborating with other developers. It's also important to prioritize clean and efficient code, as this can save time and prevent errors down the line. Remember to always test your code thoroughly and seek feedback from others to ensure the best possible outcome. Happy coding!";

    // when
    const createResource = () =>
        new Resource({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            title: validTitle,
            description: invalidDescription,
            profileId: validProfileId,
            filePath: validFilePath,
            thumbNail: validThumbnail,
        });

    // then
    expect(createResource).toThrowError('description cannot be longer than 500 characters');
});
