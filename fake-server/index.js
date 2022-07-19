const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const customFormRouter = require('./modules/custom-form/custom-form.router');
const formTemplatesRouter = require('./modules/form-templates/form-templates.router');
const userRouter = require('./modules/user/user.router');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

customFormRouter.prepare(app);
formTemplatesRouter.prepare(app);
userRouter.prepare(app);

const port = 5000;
app.listen(port);