import {Router} from 'express'
import { deleteAdminUrlHandler, getAdminStatsHandler, getAdminUrlsHandler, getAllUsersHandler, updateUserRoleHandler } from './admin.controller';
import { requireRoles } from '@/middlewares/custom-role.middleware';

const router:Router = Router()


router.get('/stats', requireRoles("admin"),getAdminStatsHandler);
router.get('/urls',requireRoles("admin"), getAdminUrlsHandler);
router.get('/users', requireRoles("admin"),getAllUsersHandler);
router.delete('/urls/:shortCode', requireRoles("admin"),deleteAdminUrlHandler);
router.patch('/users/:userId/role', requireRoles("admin"),updateUserRoleHandler);

export default router
