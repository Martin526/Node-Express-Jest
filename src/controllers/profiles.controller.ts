import ControlResponse from '../interfaces/controlResponse';
import ProfilesService from '../services/profiles.service';

class ProfilesController {
  private profilesService: ProfilesService;
  constructor ({ profilesService } : {[key :string] : ProfilesService}) {
    this.profilesService = profilesService;
  }

  deleteProfile = async (id: string): Promise<ControlResponse> => {
    try {
      await this.profilesService.deleteProfile(id);

      return {
        statusCode: 200
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        data: error.message || 'unknow error'
      };
    }
  };

  getProfile = async (id: string): Promise<ControlResponse> => {
    try {
      const profile = await this.profilesService.getProfile(id);

      return {
        statusCode: 200,
        data: profile as unknown as Record<string, unknown>
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        data: error.message || 'unknow error'
      };
    }
  };

  getProfiles = async (): Promise<ControlResponse> => {
    try {
      const profiles = await this.profilesService.getProfiles();

      return {
        statusCode: 200,
        data: profiles as unknown as Record<string, unknown>[]
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        data: error.message || 'unknow error'
      };
    }
  };

  postProfile = async (body: { age: number, lastName: string, linkedinUrl: string, name: string, title: string }): Promise<ControlResponse> => {
    try {
      const { age, lastName, linkedinUrl, name, title } = body;
      const id = await this.profilesService.postProfile(age, lastName, linkedinUrl, name, title);

      return {
        statusCode: 200,
        data: id
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        data: error.message || 'unknow error'
      };
    }
  };

  putProfile = async (id: string, body: { age: number, lastName: string, linkedinUrl: string, name: string, title: string }): Promise<ControlResponse> => {
    try {
      const { age, lastName, linkedinUrl, name, title } = body;
      await this.profilesService.putProfile(id, age, lastName, linkedinUrl, name, title);

      return {
        statusCode: 200,
        data: id
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        data: error.message || 'unknow error'
      };
    }
  };
}

export default ProfilesController;
