const dataModel = require('./.././../models/polution');
const express = require('express');
// plik apki z opcjami

//wyciąga router z expressa
const router = express.Router();

router.get('/', async (req, res) => {
  const allData = await dataModel.find({}, { _id: 0, __v: 0 }).exec();
  res.status(200).json({ wiadomosc: 'lista wszystkich odczytów' + allData });
});

router.post('/addData', async (req, res) => {
  const dataCount = await dataModel.count({});
  const placeData = req.body.place;
  const valueData = req.body.value;

  var myData = new dataModel({
    id: dataCount + 1,
    place: placeData,
    value: valueData,
  });

  try {
    const newData = await myData.save();
    res.status(201).json(myData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/:id', async (req, res) => {
  const defined = req.params.id;
  const definedId = dataModel.find(
    {
      id: defined,
    },
    { _id: 0, __v: 0 }
  );
  const doc = await definedId.exec();
  res.status(200).json({
    wiadomosc: 'szczegóły pomiaru o numerze ' + defined + ':' + doc,
  });
});

router.put('/:id', async (req, res) => {
  const idToDelete = req.params.id;
  const updatedPlace = req.body.place;
  const updatedValue = req.body.value;
  await dataModel
    .findOneAndUpdate(
      { id: idToDelete },
      { place: updatedPlace, value: updatedValue }
    )
    .exec();
  res.status(200).json({ wiadomosc: 'zmiana pomiaru o numerze ' + idToDelete });
});

router.delete('/:id', async (req, res) => {
  const idToDelete = req.params.id;
  await dataModel.deleteOne({ id: idToDelete }).exec();
  res
    .status(200)
    .json({ wiadomosc: 'usunięto pomiar o numerze ' + idToDelete });
});

module.exports = router;
