import userDb from '../../domain/data-access/user.db';
import { User } from '../../domain/model/user';
import userService from '../../service/user.service';

let mockUserDbCreateUser: jest.SpyInstance<User, [{ email: any; password: any }]>;
let mockUserDbGetAllUsers: jest.SpyInstance<User[]>;
let mockUserDbGetUserById: jest.SpyInstance<User, [id: number]>;
const validEmail = 'bob@ucll.com';
const validPassword = 'B0bbi3!!';

beforeEach(() => {
    mockUserDbCreateUser = jest.spyOn(userDb, 'createUser');
    mockUserDbGetAllUsers = jest.spyOn(userDb, 'getAllUsers');
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for User, when: creating User, then: User is created with those values`, () => {
    //given

    //when
    userService.createUser({ email: validEmail, password: validPassword });
    //then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(new User({ email: validEmail, password: validPassword }));
});

test(`given: valid Users when: requesting all users then: all users are returned `, () => {
    //given
    const users = [
        new User({ email: validEmail, password: validPassword }),
        new User({ email: validEmail, password: validPassword }),
        new User({ email: validEmail, password: validPassword }),
    ];
    mockUserDbGetAllUsers.mockReturnValue(users);

    //when
    const returnedUsers = userService.getAllUsers();

    //then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(returnedUsers).toBe(users);
});

test(`given: valid id when: requesting User by id then: the User with this id is returned`, () => {
    //given
    const validId = 1;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });

    mockUserDbGetUserById.mockReturnValue(validUser);

    //when
    const requestedUser = userService.getUserById(validId);

    //then
    expect(requestedUser).toBe(validUser);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});

test(`given: invalid id when: requesting User by id then: Error is thrown`, () => {
    //given
    mockUserDbGetUserById.mockReturnValue(undefined);

    //when
    const requestedUser = () => userService.getUserById(69);

    //then
    expect(requestedUser).toThrowError('No user with ID 69 found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(69);
});
