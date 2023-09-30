import { User } from '../../../domain/model/user';
import { Resource } from '../../../domain/model/resource';
import { Category } from '../../../domain/model/category';
import { Subject } from '../../../domain/model/subject';

test(`given: valid values for Resource, when: Resource is created, then: Resource is created`, () => {
    // given
    const id = 1;
    const creator = new User({ email: 'sudo@tistudent.be', password: 'TopSecret007$' });
    const title = 'Hello World';
    const description = 'This is a test resource';
    const category = Category.CheatSheet;
    const subject = Subject.FullStack_Software_Develoment

    // when
    const resource = new Resource({ id, creator, title, description, category, subject });

    // then
    expect(resource.id).toEqual(id);
    expect(resource.creator).toEqual(creator);
    expect(resource.getTitle()).toEqual(title);
    expect(resource.getDescription()).toEqual(description);
    expect(resource.getCategory()).toEqual(category);
    expect(resource.getSubject()).toEqual(subject);
});
