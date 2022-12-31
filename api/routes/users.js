const dataModel = require('../../models/user');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const allData = await dataModel.find({}, { _id: 0, __v: 0 }).exec();
  res
    .status(200)
    .json({ response: 'lista wszystkich użytkowników :' + allData });
});

router.post('/addUser', async (req, res) => {
  const dataCount = await dataModel.count({});
  const userData = req.body.user;
  const passwordData = req.body.password;

  var myData = new dataModel({
    id: dataCount + 1,
    user: userData,
    password: passwordData,
  });

  try {
    const newData = await myData.save();
    res.status(201).json(myData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/:id', async (req, res) => {
  const paramsId = req.params.id;
  const getById = dataModel.find(
    {
      id: paramsId,
    },
    { _id: 0, __v: 0 }
  );
  const doc = await getById.exec();
  res.status(200).json({
    response: 'szczegóły użytkownika o numerze ID:' + paramsId + ':' + doc,
  });
});

router.put('/:id', async (req, res) => {
  const idToDelete = req.params.id;
  const updatedUser = req.body.user;
  const updatedPassword = req.body.password;
  await dataModel
    .findOneAndUpdate(
      { id: idToDelete },
      { password: updatedPassword, user: updatedUser }
    )
    .exec();
  res
    .status(200)
    .json({ response: 'zmiana danych użytkownika o ID : ' + idToDelete });
});

router.delete('/:id', async (req, res) => {
  const idToDelete = req.params.id;
  await dataModel.deleteOne({ id: idToDelete }).exec();
  res
    .status(200)
    .json({ response: 'usunięto użytkownika o ID : ' + idToDelete });
});

router.delete('/', async (req, res) => {
  await dataModel.remove({}).exec();
  res.status(200).json({ response: 'usunięto wszystkich użytkowników' });
});

module.exports = router;
