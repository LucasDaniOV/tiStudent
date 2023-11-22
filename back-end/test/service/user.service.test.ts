import userDb from '../../domain/data-access/user.db';
import { User } from '../../domain/model/user';
import userService from '../../service/user.service';
import { Role } from '../../types';

const validEmail = 'bob@ucll.com';
const validPassword = 'B0bbi3!!';
const validRole = 'user';

let mockUserDbCreateUser: jest.Mock;
let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbDeleteUser: jest.Mock;
let mockUserDbUpdateEmail: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;

beforeEach(() => {
    mockUserDbCreateUser = jest.fn();
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbDeleteUser = jest.fn();
    mockUserDbUpdateEmail = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for User, when: creating User, then: User is created with those values`, async () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });
    userDb.createUser = mockUserDbCreateUser.mockResolvedValue(user);
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(undefined);

    // when
    const sut = await userService.createUser({ email: validEmail, password: validPassword });

    // then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(sut.email).toEqual(validEmail);
    expect(sut.password).toEqual(validPassword);
});

test(`given: existing Users, when: requesting all users, then: all users are returned `, async () => {
    // given
    const users = [
        new User({ email: validEmail, password: validPassword }),
        new User({ email: validEmail, password: validPassword }),
        new User({ email: validEmail, password: validPassword }),
    ];
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue(users);

    // when
    const sut = await userService.getAllUsers('admin');

    // then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(sut).toBe(users);
});

test(`given: no Users, when: requesting all users, then: empty array is returned`, async () => {
    // given
    userDb.getAllUsers = mockUserDbGetAllUsers.mockResolvedValue([]);

    // when
    const sut = await userService.getAllUsers('admin');

    // then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(sut).toEqual([]);
});

test(`given: valid id, when: requesting User by id, then: the User with this id is returned`, async () => {
    // given
    const validId = 1;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });

    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(validUser);

    // when
    const sut = await userService.getUserById(validId);

    // then
    expect(sut).toBe(validUser);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});

test(`given: invalid id, when: requesting User by id, then: Error is thrown`, () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(undefined);

    // when
    const sut = async () => await userService.getUserById(69);

    // then
    expect(sut).rejects.toThrowError('No user with id 69 found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(69);
});

test(`given: valid id, when: deleting User by id, then: User is deleted`, async () => {
    // given
    const validId = 42;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(validUser);
    userDb.deleteUser = mockUserDbDeleteUser.mockResolvedValue(true);

    // when
    const sut = await userService.removeUserById(42);

    // then
    expect(sut).toBe(true);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(42);
});

test(`given: invalid id, when: deleting User by id, then: Error is thrown`, () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(undefined);

    // when
    const deleted = async () => await userService.removeUserById(69);

    // then
    expect(deleted).rejects.toThrowError('No user with id 69 found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(69);
});

test(`given: valid values, when: updating User, then: User is updated`, async () => {
    // given
    const validId = 42;
    const validUser = new User({ id: validId, email: validEmail, password: validPassword });
    const validNewEmail = 'newemail@tistudent.be';
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(validUser);
    userDb.updateEmail = mockUserDbUpdateEmail.mockResolvedValue(
        new User({ id: validId, email: validNewEmail, password: validPassword })
    );

    //when
    const sut = await userService.updateEmailById(validId, validNewEmail);

    //then
    expect(sut.email).toBe(validNewEmail);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(validId);
});

test(`given: invalid id, when: updating User, then: Error is thrown`, () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(undefined);

    //when
    const sut = async () => await userService.updateEmailById(undefined, '@');

    //then
    expect(sut).rejects.toThrowError('No user with id undefined found');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
});

test(`given valid role, when: creating user, then: user is created with that role`, async () => {
    // given
    const user = new User({ email: validEmail, password: validPassword, role: validRole });
    userDb.createUser = mockUserDbCreateUser.mockResolvedValue(user);
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(undefined);

    // when
    const sut = await userService.createUser({ email: validEmail, password: validPassword, role: validRole });

    // then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(sut.email).toEqual(validEmail);
    expect(sut.password).toEqual(validPassword);
    expect(sut.role).toEqual(validRole);
});

test(`given: invalid role, when: creating user, then: user is not created and error is thrown`, () => {
    // given
    const invalidRole = 'invalidRole';
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(undefined);

    // when
    const sut = async () => await userService.createUser({ email: validEmail, password: validPassword, role: invalidRole as Role });

    // then
    expect(sut).rejects.toThrowError('role must be one of admin, user, or guest');
});

test(`given: unauthorized role, when: requesting all users, then: Error is thrown`, () => {
    // given
    const unauthorizedRole = 'user';

    // when
    const sut = async () => await userService.getAllUsers(unauthorizedRole);

    // then
    expect(sut).rejects.toThrowError('Only admins can get all users');
});
