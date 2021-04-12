import dbhandler from '../db.handler';
import { Profile } from '../../src/interfaces/profiles.interface';
import ProfileModel from '../../src/models/profile.model';
import ProfilesService from '../../src/services/profiles.service';
import AppError from '../../src/error/app.error';
import mongoose from 'mongoose';

describe('Profiles test', () => {
  beforeAll(async () => { await dbhandler.connect(); });
  beforeEach(async () => {
    await ProfileModel.create({
      age: 28,
      lastName: 'Gonzalez',
      linkedinUrl: 'https://www.linkedin.com/in/martin-nicolas-gonzalez/',
      name: 'Martin',
      title: 'Software developer'
    });

    await ProfileModel.create({
      age: 29,
      lastName: 'Gonzalez',
      linkedinUrl: 'https://www.linkedin.com/in/martin-nicolas-gonzalez/',
      name: 'Nicolas',
      title: 'Senior Software developer'
    });
  });
  afterEach(async () => { await dbhandler.clearDatabase(); });
  afterAll(async () => { await dbhandler.closeDatabase(); });

  test('delete profile - should remove the profile', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const profiles = await profileService.getProfiles();
    const profileToDelete = profiles[0];

    await profileService.deleteProfile(profileToDelete.id);

    expect(await profileService.getProfiles()).toHaveLength(1);
  });

  test('delete profile - invalid id - should throw a exception', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const expected = async () => { await profileService.deleteProfile('fake-invalid-id'); };

    expect(expected).rejects.toThrowError(new AppError('Id does not exist', 404));
  });

  test('delete profile - not found profile - should throw a exception', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const fakeMongoId = mongoose.Types.ObjectId().toString();

    const expected = async () => { await profileService.deleteProfile(fakeMongoId); };

    expect(expected).rejects.toThrowError(new AppError('Profile not found', 404));
  });

  test('get profile - should get profile by id', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const profiles = (await profileService.getProfiles());
    const firstProfile = profiles[0];
    const expected = await profileService.getProfile(firstProfile._id);

    expect(expected.name).toBe(firstProfile.name);
    expect(expected.lastName).toBe(firstProfile.lastName);
    expect(expected.age).toBe(firstProfile.age);
    expect(expected.linkedinUrl).toBe(firstProfile.linkedinUrl);
    expect(expected.title).toBe(firstProfile.title);
  });

  test('get profile - invalid id - should throw exception', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const fakeMongoId = mongoose.Types.ObjectId().toString();
    const expected = async () => await profileService.getProfile(fakeMongoId);

    expect(expected).rejects.toThrowError(new AppError('Profile not found', 404));
  });

  test('get profiles - should get all profiles', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    expect(await profileService.getProfiles()).toHaveLength(2);
  });

  test('post profiles - should create a new profiles', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const profile: Profile = new ProfileModel({
      age: 30,
      lastName: 'Cabrera',
      name: 'Fabian',
      title: 'Principal Software developer'
    });

    const profileId = await profileService.postProfile(profile.age, profile.lastName, profile.linkedinUrl, profile.name, profile.title);

    const expected = await profileService.getProfile(profileId);

    expect(expected.name).toBe(profile.name);
    expect(expected.lastName).toBe(profile.lastName);
    expect(expected.age).toBe(profile.age);
    expect(expected.linkedinUrl).toBe(profile.linkedinUrl);
    expect(expected.title).toBe(profile.title);
  });

  test('put profiles - should update the profile', async () => {
    const profileModel: typeof ProfileModel = ProfileModel;
    const profileService = new ProfilesService({ profileModel });

    const profile: Profile = new ProfileModel({
      age: 30,
      lastName: 'Cabrera',
      linkedinUrl: null,
      name: 'Hernan',
      title: 'Principal Software developer'
    });

    await profile.save();

    profile.name = 'Lourdes';

    const profileId = await profileService.putProfile(profile.id, profile.age, profile.lastName, profile.linkedinUrl, profile.name, profile.title);

    const expected = await profileService.getProfile(profileId);

    expect(profileId).toBe(profile.id);
    expect(expected.name).toBe(profile.name);
    expect(expected.lastName).toBe(profile.lastName);
    expect(expected.age).toBe(profile.age);
    expect(expected.linkedinUrl).toBe(profile.linkedinUrl);
    expect(expected.title).toBe(profile.title);
  });
});
