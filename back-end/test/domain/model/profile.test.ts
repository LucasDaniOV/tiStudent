import { Profile } from '../../../domain/model/profile';
import { User } from '../../../domain/model/user';

test(`given: valid values for Profile, when: Profile is created, then: Profile is created`, () => {
    // given
    const user = new User({ email: 'sudo@tistudent.be', password: 'TopSecret007' });
    const username = 'sudo';
    const bio = 'The Terminator';

    // when
    const profile = new Profile({ user, username, bio });

    // then
    expect(profile.user).toEqual(user);
    expect(profile.getUsername()).toEqual(username);
    expect(profile.getBio()).toEqual(bio);
});
