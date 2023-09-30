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
