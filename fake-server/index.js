const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const customFormRouter = require('./custom-form/custom-form.router');
const formTemplatesRouter = require('./form-templates/form-templates.router');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

customFormRouter.prepare(app);
formTemplatesRouter.prepare(app);

const port = 5000;
app.listen(port);