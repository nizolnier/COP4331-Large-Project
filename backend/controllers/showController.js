const { json } = require("body-parser");
const Show = require("../models/showModel");
const asyncHandler = require("express-async-handler");

const GetShow = asyncHandler(async (req, res) => {
  const { showid } = req.body;

  if (!showid) {
    res.status(400).json({
      error: "showid can not be an empty array.",
    });
    return;
  }

  let resultArr; //array that will be returned with all the shwoid that requested

  for (let i = 0; i < showid.length; i++) {
    try {
      const showCur = await Show.findOne({ showid: showid[i] });
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
        num_of_ratings: ${showCur.num_of_ratings},
        total_ratings:${showCur.total_ratings},
        average_ratings: ${showCur.average_ratings},
        num_of_favorites: ${showCur.num_of_favorites},
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
    num_of_ratings,
    total_ratings,
    average_ratings,
    num_of_favorites,
  } = req.body;

  if (!showid) {
    res.status(400);
    throw new Error("please provide required all fields (showid)");
  }

  const showCur = await Show.findOne({ showid });

  if (showCur) {
    res.status(200).json({
      message: "successfully updated show" + showCur.title,
      showid: showCur.showid,
      picture: picture ? picture : showCur.picture,
      title: title ? title : showCur.title,
      genre: genre ? genre : showCur.genre,
      description: description ? description : showCur.description,
      year: year ? year : showCur.year,
      director: director ? director : showCur.director,
      num_of_ratings: num_of_ratings ? num_of_ratings : showCur.num_of_ratings,
      total_ratings: total_ratings ? total_ratings : showCur.total_ratings,
      average_ratings: average_ratings
        ? average_ratings
        : showCur.average_ratings,
      num_of_favorites: num_of_favorites
        ? num_of_favorites
        : showCur.num_of_favorites,
    });
  } else {
    res
      .status(200)
      .json({ Error: "showid not exist (most likely), or database error" });
  }
});


module.exports = { GetShow, updateShow };
