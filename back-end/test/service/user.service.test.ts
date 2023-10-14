import userDb from '../../domain/data-access/user.db';
import { User } from '../../domain/model/user';
import userService from '../../service/user.service';

const validEmail = 'bob@ucll.com';
const validPassword = 'B0bbi3!!';

let mockUserDbCreateUser: jest.SpyInstance<User, [{ email: any; password: any }]>;
let mockUserDbGetAllUsers: jest.SpyInstance<User[]>;
let mockUserDbGetUserById: jest.SpyInstance<User, [id: number]>;

beforeEach(() => {
    mockUserDbCreateUser = jest.spyOn(userDb, 'createUser');
    mockUserDbGetAllUsers = jest.spyOn(userDb, 'getAllUsers');
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for User, when: creating User, then: User is created with those values`, () => {
    // given
    // when
    const user = userService.createUser({ email: validEmail, password: validPassword });

    // then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(user.email).toEqual(validEmail);
    expect(user.password).toEqual(validPassword);
    expect(user.id).toBeDefined();
});

test(`given: existing Users, when: requesting all users, then: all users are returned `, () => {
    // given
    const users = [
        new User({ email: validEmail, password: validPassword }),
        new User({ email: validEmail, password: validPassword }),
        new User({ email: validEmail, password: validPassword }),
    ];
    mockUserDbGetAllUsers.mockReturnValue(users);

    // when
    const returnedUsers = userService.getAllUsers();

    // then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(returnedUsers).toBe(users);
});

test(`given: no Users, when: requesting all users, then: empty array is returned`, () => {
    // given
    mockUserDbGetAllUsers.mockReturnValue([]);

    // when
    const returnedUsers = userService.getAllUsers();

    // then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(returnedUsers).toEqual([]);
});

test(`given: valid id, when: requesting User by id, then: the User with this id is returned`, () => {
    // given
    const validId = 1;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });

    mockUserDbGetUserById.mockReturnValue(validUser);

    // when
    const requestedUser = userService.getUserById(validId);

    // then
    expect(requestedUser).toBe(validUser);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});

test(`given: invalid id, when: requesting User by id, then: Error is thrown`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(undefined);

    // when
    const requestedUser = () => userService.getUserById(69);

    // then
    expect(requestedUser).toThrowError('No user with ID 69 found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(69);
});

test(`given: valid id, when: deleting User by id, then: User is deleted`, () => {
    // given
    const validId = 42;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });
    mockUserDbGetUserById.mockReturnValue(validUser);

    // when
    const deleted = userService.removeUser(42);

    // then
    expect(deleted).toBe(true);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(42);
});

test(`given: invalid id, when: deleting User by id, then: Error is thrown`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(undefined);

    // when
    const deleted = () => userService.removeUser(69);

    // then
    expect(deleted).toThrowError('No user with ID 69 found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(69);
});

test(`given: valid values, when: updating User, then: User is updated`, () => {
    // given
    const validId = 42;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });
    const validNewEmail = 'newemail@tistudent.be';
    mockUserDbGetUserById.mockReturnValue(validUser);

    //when
    userService.updateUser(validId, 'email', validNewEmail);

    //then
    expect(validUser.email).toBe(validNewEmail);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(validId);
});

test(`given: invalid id, when: updating User, then: Error is thrown`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(undefined);

    //when
    const updateUser = () => userService.updateUser(undefined, 'email', '@');

    //then
    expect(updateUser).toThrowError('No user with ID undefined found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});

test(`given: invalid field, when: updating User, then: Error is thrown`, () => {
    // given
    const validId = 42;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });
    mockUserDbGetUserById.mockReturnValue(validUser);

    //when
    const updateUser = () => userService.updateUser(validId, 'invalidField', 'newValue');

    //then
    expect(updateUser).toThrowError('Unsupported field');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});
