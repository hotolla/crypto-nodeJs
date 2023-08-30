import fs from "fs";
import { addUser } from "../users/users.service";


app.post('/registration', async (req, res) => {
  addUser(req.body);

  res.json({ message:  existingData});

});