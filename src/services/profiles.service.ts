import AppError from '../error/app.error';
import ProfileModel from '../models/profile.model';
import { Profile } from '../interfaces/profiles.interface';

class ProfileService {
  private profileModel: typeof ProfileModel
  constructor ({ profileModel }: {[key:string]: typeof ProfileModel}) {
    this.profileModel = profileModel;
  }

  deleteProfile = async (id: string): Promise<void> => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const profile: Profile | null = await this.profileModel.findByIdAndDelete(id);

      if (!profile) {
        throw new AppError('Profile not found', 404);
      }
    } else {
      throw new AppError('Id does not exist', 404);
    }
  };

  getProfile = async (id: string): Promise<Profile> => {
    const profile: Profile | null = await this.profileModel.findOne({ _id: id });

    if (profile) {
      return profile;
    }

    throw new AppError('Profile not found', 404);
  };

  getProfiles = async (): Promise<Profile[]> => {
    const profiles: Profile[] = await this.profileModel.find();

    return profiles;
  };

  postProfile = async (age: number, lastName: string, linkedinUrl: string, name: string, title: string): Promise<string> => {
    try {
      const profile = await this.profileModel.create({
        age,
        lastName,
        linkedinUrl,
        name,
        title
      });
      return profile.id;
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate profile', 409);
      }
      throw new AppError(error, 500);
    }
  };

  putProfile = async (id: string, age: number, lastName: string, linkedinUrl: string, name: string, title: string): Promise<string> => {
    try {
      const profile: Profile | null = await this.profileModel.findByIdAndUpdate(id, { age, lastName, linkedinUrl, name, title }, { new: true });

      if (!profile) {
        throw new AppError('Profile not found', 404);
      }

      return profile.id;
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate profile', 409);
      }
      throw new AppError(error, 500);
    }
  };
}

export default ProfileService;
