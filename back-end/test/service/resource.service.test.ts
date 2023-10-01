import resourceDb from '../../domain/data-access/resource.db';
import userDb from '../../domain/data-access/user.db';
import { Category } from '../../domain/model/category';
import { Resource } from '../../domain/model/resource';
import { Subject } from '../../domain/model/subject';
import { User } from '../../domain/model/user';
import resourceService from '../../service/resource.service';

const creator = new User({ id: 0, email: 'resource.service.test@tistudent.be', password: '_r3sourceSe4viceTe5t' });
const createdAt = new Date();
const title = 'Hello World';
const description = 'This is a test resource';
const category = Category.CheatSheet;
const subject = Subject.FullStack_Software_Develoment;

let mockUserDbGetUserById: jest.SpyInstance<User, [id: number], any>;
let mockResourceDbCreateResource: jest.SpyInstance<
    Resource,
    [{ creator: any; createdAt: any; title: any; description: any; category: any; subject: any }],
    any
>;
let mockResourceDbGetResourceByContent: jest.SpyInstance<
    Resource,
    [title: string, description: string, category: string, subject: string],
    any
>;

beforeEach(() => {
    mockResourceDbCreateResource = jest.spyOn(resourceDb, 'createResource');
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
    mockResourceDbGetResourceByContent = jest.spyOn(resourceDb, 'getResourceByContent');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for Resource, when: Resource is created, then: Resource is created with those values`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(creator);

    // when
    resourceService.createResource({ creator, createdAt, title, description, category, subject });

    // then
    expect(mockResourceDbCreateResource).toHaveBeenCalledTimes(1);
    expect(mockResourceDbCreateResource).toHaveBeenCalledWith(
        new Resource({ creator, createdAt, title, description, category, subject })
    );
});

test(`given: existing Resource, when: Resource is created, then: error is thrown`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(creator);
    mockResourceDbGetResourceByContent.mockReturnValue(
        new Resource({ creator, createdAt, title, description, category, subject })
    );

    // when
    const createResource = () =>
        resourceService.createResource({ creator, createdAt, title, description, category, subject });

    // then
    expect(createResource).toThrowError('Resource already exists');
});
