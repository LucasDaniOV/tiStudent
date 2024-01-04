import { Subject } from '../../../domain/model/subject';

const id: number = 1;
const name: string = 'name';

test(`given: valid values for subject, when: creating a subject, then: should create a subject`, () => {
    // given
    // when
    const subject = new Subject({ id, name });

    // then
    expect(subject.id).toBe(id);
    expect(subject.name).toBe(name);
});

test(`given: empty name for subject, when: creating a subject, then: should throw an error`, () => {
    // given
    const invalidName = '';

    // when
    const createSubject = () => new Subject({ id, name: invalidName });

    // then
    expect(createSubject).toThrowError('name is required');
});

test(`given: too long name for subject, when: creating a subject, then: should throw an error`, () => {
    // given
    const invalidName = 'a'.repeat(61);

    // when
    const createSubject = () => new Subject({ id, name: invalidName });

    // then
    expect(createSubject).toThrowError('name cannot be longer than 60 characters');
});

test(`given: not a string for subject, when: creating a subject, then: should throw an error`, () => {
    // given
    const invalidName = 1;

    // when
    const createSubject = () => new Subject({ id, name: invalidName as unknown as string });

    // then
    expect(createSubject).toThrowError('name must be a string');
});

test(`given: null for subject id, when: creating a subject, then: should throw an error`, () => {
    // given
    // when
    const createSubject = () => new Subject({ id: null, name });

    // then
    expect(createSubject).toThrowError('id is required');
});

test(`given: undefined for subject id, when: creating a subject, then: should throw an error`, () => {
    // given
    // when
    const createSubject = () => new Subject({ id: undefined, name });

    // then
    expect(createSubject).toThrowError('id is required');
});

test(`given: not a number for subject id, when: creating a subject, then: should throw an error`, () => {
    // given
    const invalidId = '1';

    // when
    const createSubject = () => new Subject({ id: invalidId as unknown as number, name });

    // then
    expect(createSubject).toThrowError('id must be a number');
});

test(`given: negative number for subject id, when: creating a subject, then: should throw an error`, () => {
    // given
    const invalidId = -1;

    // when
    const createSubject = () => new Subject({ id: invalidId, name });

    // then
    expect(createSubject).toThrowError('id cannot be negative');
});

test(`given: valid values for subject, when: comparing two subjects, then: should return true`, () => {
    // given
    const subject = new Subject({ id, name });

    // when
    const equals = subject.equals(subject);

    // then
    expect(equals).toBe(true);
});

test(`given: valid values for subject, when: comparing two subjects, then: should return false`, () => {
    // given
    const subject = new Subject({ id, name });
    const otherSubject = new Subject({ id: 2, name: 'otherName' });

    // when
    const equals = subject.equals(otherSubject);

    // then
    expect(equals).toBe(false);
});

test(`given: valid values for subject, when: creating a subject from a prisma subject, then: should create a subject`, () => {
    // given
    const subjectPrisma = { id, name };

    // when
    const subject = Subject.from(subjectPrisma);

    // then
    expect(subject.id).toBe(id);
    expect(subject.name).toBe(name);
});
