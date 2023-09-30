import { User } from '../../../domain/model/user';
import { Resource } from '../../../domain/model/resource';
import { Category } from '../../../domain/model/category';
import { Subject } from '../../../domain/model/subject';

const validUser = new User({ email: 'resource-test@tistudent.be', password: '_R3sourceTe5t' });
const validCreatedAt = new Date();
const validTitle = 'Hello World';
const validDescription = 'This is a test resource';
const validCategory = Category.CheatSheet;
const validSubject = Subject.FullStack_Software_Develoment;

test(`given: valid values for Resource, when: Resource is created, then: Resource is created`, () => {
    // when
    const resource = new Resource({
        creator: validUser,
        createdAt: validCreatedAt,
        title: validTitle,
        description: validDescription,
        category: validCategory,
        subject: validSubject,
    });

    // then
    expect(resource.creator).toEqual(validUser);
    expect(resource.createdAt).toEqual(validCreatedAt);
    expect(resource.title).toEqual(validTitle);
    expect(resource.description).toEqual(validDescription);
    expect(resource.category).toEqual(validCategory);
    expect(resource.subject).toEqual(validSubject);
});

test(`given: empty title, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidTitle = '';

    // when
    const createResource = () =>
        new Resource({
            creator: validUser,
            createdAt: validCreatedAt,
            title: invalidTitle,
            description: validDescription,
            category: validCategory,
            subject: validSubject,
        });

    // then
    expect(createResource).toThrowError('Title cannot be empty');
});

test(`given: too long title, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidTitle = 'a'.repeat(31);

    // when
    const createResource = () =>
        new Resource({
            creator: validUser,
            createdAt: validCreatedAt,
            title: invalidTitle,
            description: validDescription,
            category: validCategory,
            subject: validSubject,
        });

    // then
    expect(createResource).toThrowError('Title cannot be longer than 30 characters');
});

test(`given: empty description, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidDescription = '';

    // when
    const createResource = () =>
        new Resource({
            creator: validUser,
            createdAt: validCreatedAt,
            title: validTitle,
            description: invalidDescription,
            category: validCategory,
            subject: validSubject,
        });

    // then
    expect(createResource).toThrowError('Description cannot be empty');
});

test(`given: too long description, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidDescription = "As a developer, it's important to stay up-to-date with the latest technologies and trends in the industry. This means constantly learning and improving your skills, whether it's through online courses, attending conferences, or collaborating with other developers. It's also important to prioritize clean and efficient code, as this can save time and prevent errors down the line. Remember to always test your code thoroughly and seek feedback from others to ensure the best possible outcome. Happy coding!";

    // when
    const createResource = () =>
        new Resource({
            creator: validUser,
            createdAt: validCreatedAt,
            title: validTitle,
            description: invalidDescription,
            category: validCategory,
            subject: validSubject,
        });

    // then
    expect(createResource).toThrowError('Description cannot be longer than 500 characters');
});

test(`given: invalid category, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidCategory = 'invalid category';

    // when
    const createResource = () =>
        new Resource({
            creator: validUser,
            createdAt: validCreatedAt,
            title: validTitle,
            description: validDescription,
            category: invalidCategory as Category,
            subject: validSubject,
        });

    // then
    expect(createResource).toThrowError('Invalid category');
});

test(`given: invalid subject, when: Resource is created, then: error is thrown`, () => {
    // given
    const invalidSubject = 'invalid subject';

    // when
    const createResource = () =>
        new Resource({
            creator: validUser,
            createdAt: validCreatedAt,
            title: validTitle,
            description: validDescription,
            category: validCategory,
            subject: invalidSubject as Subject,
        });

    // then
    expect(createResource).toThrowError('Invalid subject');
});
