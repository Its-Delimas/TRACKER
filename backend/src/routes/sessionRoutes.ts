import { Router} from "express"
import { createSession, getSessions,getTodaySessions} from '../controllers/sessionController'
import { protect } from "../middleware/auth"

const router = Router()

router.use(protect)

router.post('/',createSession)
router.get('/',getSessions)
router.get('/today', getTodaySessions)

export default router