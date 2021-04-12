import diContainer from '../container/di.container';
import { Router } from 'express';
import ProfilesController from '../controllers/profiles.controller';

const profilesController: ProfilesController = diContainer.container.resolve('profilesController');
const router = Router();

router.delete('/profiles/:id', async (req, res) => {
  const response = await profilesController.deleteProfile(req.params.id);

  res.status(response.statusCode).json(response.data);
});

router.get('/profiles/:id', async (req, res) => {
  const response = await profilesController.getProfile(req.params.id);

  res.status(response.statusCode).json(response.data);
});

router.get('/profiles', async (req, res) => {
  const response = await profilesController.getProfiles();

  res.status(response.statusCode).json(response.data);
});

router.post('/profiles', async (req, res) => {
  const response = await profilesController.postProfile(req.body);

  res.status(response.statusCode).json(response.data);
});

router.put('/profiles/:id', async (req, res) => {
  const response = await profilesController.putProfile(req.params.id, req.body);

  res.status(response.statusCode).json(response.data);
});

export default router;
