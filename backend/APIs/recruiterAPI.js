const exp = require('express');
const recruiterApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');

// Route to get recruiter data (public)
recruiterApp.get('/recruiters-feed', expressAsyncHandler(async (req, res) => {
  const recruiterCollection = req.app.get('recruiterCollection');

  // Fetch all recruiters from the collection
  const recruiters = await recruiterCollection.find().toArray();

  // Send the recruiters data as response
  res.send({message : "feed: ", payload : recruiters})
}));

module.exports = recruiterApp;
