import { Subject } from '../../../domain/model/subject';

test(`given: valid values for subject when: subject is created, then: subject is created with those values`, () => {
    // given
    const name = 'Full-Stack Development';

    // when
    const subject = new Subject({ name });

    // then
    expect(subject.name).toEqual(name);
});
