import { File } from '../../../domain/model/file';

test(`given: valid values for file  when: file is created, then: file is created with those values`, () => {
    // given
    const name = 'summary.pdf';
    const path = '/summary.pdf';

    // when
    const file = new File({ name, path });

    // then
    expect(file.name).toEqual(name);
    expect(file.path).toEqual(path);
});
