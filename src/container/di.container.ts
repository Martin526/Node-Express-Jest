import { createContainer, asClass, InjectionMode, asValue } from 'awilix';
import ProfilesController from '../controllers/profiles.controller';
import ProfileModel from '../models/profile.model';
import ProfilesService from '../services/profiles.service';

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

(() => {
  container.register({
    profilesController: asClass(ProfilesController),
    profilesService: asClass(ProfilesService),
    profileModel: asValue(ProfileModel)
  });
})();

export default {
  container
};
