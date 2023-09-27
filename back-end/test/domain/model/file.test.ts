import { File } from '../../../domain/model/file';

test(`given: valid values for file  when: file is created, then: file is created with those values`, () => {
    // given
    const path = '/summary.pdf';

    // when
    const file = new File({ path });

    // then
    expect(file.path).toEqual(path);
});
