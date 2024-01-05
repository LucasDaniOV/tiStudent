import subjectDb from '../../domain/data-access/subject.db';
import { Subject } from '../../domain/model/subject';
import subjectService from '../../service/subject.service';
import { AuthenticationResponse } from '../../types';

const name = 'name';
const id = 1;
const newName = 'newName';

const subject = new Subject({
    id,
    name,
});

let mockSubjectDbCreateSubject = jest.fn();
let mockSubjectDbGetSubjectByName = jest.fn();
let mockSubjectDbGetSubjectById = jest.fn();
let mockSubjectDbGetAllSubjects = jest.fn();
let mockSubjectDbUpdateSubject = jest.fn();
let mockSubjectDbDeleteSubject = jest.fn();

beforeEach(() => {
    mockSubjectDbCreateSubject = jest.fn();
    mockSubjectDbGetSubjectByName = jest.fn();
    mockSubjectDbGetSubjectById = jest.fn();
    mockSubjectDbGetAllSubjects = jest.fn();
    mockSubjectDbUpdateSubject = jest.fn();
    mockSubjectDbDeleteSubject = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for subject, when: creating a subject, then: should create a subject`, async () => {
    // given
    mockSubjectDbCreateSubject.mockReturnValue(subject);
    subjectDb.createSubject = mockSubjectDbCreateSubject;

    // when
    const result = await subjectService.createSubject(name, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subject);
    expect(mockSubjectDbCreateSubject).toHaveBeenCalledWith(name);
});

test(`given: invalid role, when: creating a subject, then: error is thrown`, async () => {
    // given
    // when
    const sut = async () => await subjectService.createSubject(name, { role: 'USER' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Only admins can create subjects');
    expect(mockSubjectDbCreateSubject).not.toHaveBeenCalled();
});

test(`given: valid id for subject, when: subject is requested, then: subject is returned`, async () => {
    // given
    mockSubjectDbGetSubjectById.mockReturnValue(subject);
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;

    // when
    const result = await subjectService.getSubjectById(id);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subject);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(id);
});

test(`given: invalid id for subject, when: subject is requested, then: error is thrown`, async () => {
    // given
    mockSubjectDbGetSubjectById.mockReturnValue(undefined);
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;

    // when
    const sut = async () => await subjectService.getSubjectById(id);

    // then
    await expect(sut).rejects.toThrowError('Subject not found');
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(id);
});

test(`given: valid name for subject, when: subject is requested, then: subject is returned`, async () => {
    // given
    mockSubjectDbGetSubjectByName.mockReturnValue(subject);
    subjectDb.getSubjectByName = mockSubjectDbGetSubjectByName;

    // when
    const result = await subjectService.getSubjectByName(name);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subject);
    expect(mockSubjectDbGetSubjectByName).toHaveBeenCalledWith(name);
});

test(`given: invalid name for subject, when: subject is requested, then: error is thrown`, async () => {
    // given
    mockSubjectDbGetSubjectByName.mockReturnValue(undefined);
    subjectDb.getSubjectByName = mockSubjectDbGetSubjectByName;

    // when
    const sut = async () => await subjectService.getSubjectByName(name);

    // then
    await expect(sut).rejects.toThrowError('Subject not found');
    expect(mockSubjectDbGetSubjectByName).toHaveBeenCalledWith(name);
});

test(`given: existing subjects, when: all subjects are requested, then: all subjects are returned`, async () => {
    // given
    mockSubjectDbGetAllSubjects.mockReturnValue([subject]);
    subjectDb.getAllSubjects = mockSubjectDbGetAllSubjects;

    // when
    const result = await subjectService.getAllSubjects();

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([subject]);
    expect(mockSubjectDbGetAllSubjects).toHaveBeenCalledTimes(1);
});

test(`given: no subjects, when: all subjects are requested, then: empty array is returned`, async () => {
    // given
    mockSubjectDbGetAllSubjects.mockReturnValue([]);
    subjectDb.getAllSubjects = mockSubjectDbGetAllSubjects;

    // when
    const result = await subjectService.getAllSubjects();

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([]);
    expect(mockSubjectDbGetAllSubjects).toHaveBeenCalledTimes(1);
});

test(`given: valid values for subject, when: subject is updated, then: subject is updated`, async () => {
    // given
    mockSubjectDbUpdateSubject.mockReturnValue(subject);
    mockSubjectDbGetSubjectByName.mockReturnValue(undefined);
    mockSubjectDbGetSubjectById.mockReturnValue(subject);
    subjectDb.getSubjectByName = mockSubjectDbGetSubjectByName;
    subjectDb.updateSubject = mockSubjectDbUpdateSubject;
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;

    // when
    const result = await subjectService.updateSubject(id, newName);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subject);
    expect(mockSubjectDbUpdateSubject).toHaveBeenCalledTimes(1);
    expect(mockSubjectDbUpdateSubject).toHaveBeenCalledWith(id, newName);
});

test(`given: invalid id for subject, when: subject is updated, then: error is thrown`, async () => {
    // given
    mockSubjectDbGetSubjectById.mockReturnValue(undefined);
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;

    // when
    const sut = async () => await subjectService.updateSubject(id, newName);

    // then
    await expect(sut).rejects.toThrowError('Subject not found');
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(id);
});

test(`given: existing subject with new name, when: subject is updated, then: error is thrown`, async () => {
    // given
    mockSubjectDbGetSubjectByName.mockReturnValue(subject);
    mockSubjectDbGetSubjectById.mockReturnValue(subject);
    subjectDb.getSubjectByName = mockSubjectDbGetSubjectByName;
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;

    // when
    const sut = async () => await subjectService.updateSubject(id, newName);

    // then
    await expect(sut).rejects.toThrowError('Subject already exists');
    expect(mockSubjectDbGetSubjectByName).toHaveBeenCalledWith(newName);
});

test(`given: valid id for subject, when: subject is deleted, then: subject is deleted`, async () => {
    // given
    mockSubjectDbGetSubjectById.mockReturnValue(subject);
    mockSubjectDbDeleteSubject.mockReturnValue(subject);
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;
    subjectDb.deleteSubject = mockSubjectDbDeleteSubject;

    // when
    const result = await subjectService.deleteSubject(id);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subject);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(id);
    expect(mockSubjectDbDeleteSubject).toHaveBeenCalledWith(id);
});

test(`given: invalid id for subject, when: subject is deleted, then: error is thrown`, async () => {
    // given
    mockSubjectDbGetSubjectById.mockReturnValue(undefined);
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById;

    // when
    const sut = async () => await subjectService.deleteSubject(id);

    // then
    await expect(sut).rejects.toThrowError('Subject not found');
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(id);
});
