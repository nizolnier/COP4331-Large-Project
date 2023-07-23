const { json } = require("body-parser");
const shows = require("../models/showModel");
const asyncHandler = require("express-async-handler");

const GetShow = asyncHandler(async (req, res) => {
  const { showid } = req.body;

  if (!showid) {
    res.status(400).json({
      error: "showid can not be empty.",
    });
    return;
  }

  if (typeof showid === "number") {

    const showCur = await shows.findOne({ showid });

    console.log(showCur);

    if (showCur) {
      res.json(JSON.parse(showCur));
    } else {
      res.json({
        error: "No results found associated with showid " + showid,
      });
    }

    return;
  }

  let resultArr; //array that will be returned with all the shwoid that requested

  for (let i = 0; i < showid.length; i++) {
    try {
      const showCur = await shows.findOne({ showid: showid[i] });
      let showCurJson;

      if (showCur) {
        showCurJson = `{
        found: ${true},
        showid: ${showCur.showid},
        picture: ${showCur.picture},
        title: ${showCur.title},
        genre: ${showCur.genre},
        description: ${showCur.description},
        year: ${showCur.year},
        director: ${showCur.director},
        nrating: ${showCur.nrating},
        trating:${showCur.trating},
        avgrating: ${showCur.avgrating},
        nfavorites: ${showCur.nfavorites},
      }`;
      } else {
        showCur = `
      {
        showid: ${showid[i]},
        found: ${false}
      }`;
      }
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }

    resultArr = [...resultArr, showCur];
  } //end for

  res.status(200).json(JSON.parse(resultArr));
});

const updateShow = asyncHandler(async (req, res) => {
  const {
    showid,
    picture,
    title,
    genre,
    description,
    year,
    director,
    nrating,
    trating,
    avgrating,
    nfavorites,
  } = req.body;

  if (!showid) {
    res.status(400);
    throw new Error("please provide required all fields (showid)");
  }

  const showCur = await shows.findOne({showid})


  const updatedShowCur = await shows.findOneAndUpdate(
    { showid },
    {
      $set: {
        picture: picture ? picture : showCur.picture,
        title: title ? title : showCur.title,
        genre: genre ? genre : showCur.genre,
        description: description ? description : showCur.description,
        year: year ? year : showCur.year,
        director: director ? director : showCur.director,
        nrating: nrating
          ? nrating
          : showCur.nrating,
        trating: trating ? trating : showCur.trating,
        avgrating: avgrating
          ? avgrating
          : showCur.avgrating,
        nfavorites: nfavorites
          ? nfavorites
          : showCur.nfavorites,
      },
    }
  );

  if (updatedShowCur) {
    res.status(200).json({
      message: "successfully updated shows" + updatedShowCur.title,
      showid: updatedShowCur.showid,
      picture: updatedShowCur.picture,
      title: updatedShowCur.title,
      genre: updatedShowCur.genre,
      description: updatedShowCur.description,
      year: updatedShowCur.year,
      director: updatedShowCur.director,
      nrating: updatedShowCur.nrating,
      trating: updatedShowCur.trating,
      avgrating: updatedShowCur.avgrating,
      nfavorites: updatedShowCur.nfavorites,
    });
  } else {
    res
      .status(200)
      .json({ Error: "showid not exist (most likely), or database error" });
  }
});

module.exports = { GetShow, updateShow };
