import { User } from '../../../domain/model/user';
import { Resource } from '../../../domain/model/resource';

test(`given: valid values for Resource, when: Resource is created, then: Resource is created`, () => {
    // given
    const creator = new User({ email: 'sudo@tistudent.be', password: 'TopSecret007' });
    const title = 'Hello World';
    const description = 'This is a test resource';

    // when
    const resource = new Resource({ creator, title, description });

    // then
    expect(resource.creator).toEqual(creator);
    expect(resource.getTitle()).toEqual(title);
    expect(resource.getDescription()).toEqual(description);
});
