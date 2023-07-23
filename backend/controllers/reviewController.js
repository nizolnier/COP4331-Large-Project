const { json } = require("body-parser");
const reviews = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");

const GetReview = asyncHandler(async (req, res) => {
  const { showid, userid } = req.body;

  if (!showid) {
    res.status(400).json({
      error: "showid can not be empty.",
    });
    return;
  }

  let reviewCur;

  if (!userid) {
    reviewCur = await reviews.find({ showid });
  } else {
    reviewCur = await reviews.find({
      $and: [{ userid }, { showid }],
    });
  }

  if (reviewCur) {
    res.json(reviewCur);
  } else {
    res.json({
      error: "No results found associated with " + showid,
    });
  }
});

const updateReview = asyncHandler(async (req, res) => {
  const { showid, userid, stars, userComment, dateRelease } = req.body;

  if (!showid || !userid) {
    res.status(400).json({
      error: "please provide required all fields (showid, userid)",
    });

    return;
  }

  const reviewCur = await reviews.findOne({ showid }, { userid });

  const updatedReviewCur = await reviews.findOneAndUpdate(
    { showid },
    { userid },
    {
      $set: {
        stars: stars ? stars : reviewCur.stars,
        userComment: userComment ? userComment : reviewCur.userComment,
        dateRelease: dateRelease ? dateRelease : reviewCur.dateRelease,
      },
    }
  );

  if (updatedReviewCur) {
    res.status(200).json({
      message: "successfully updated show " + showid,
      updatedReviewCur,
    });
  } else {
    res
      .status(200)
      .json({ Error: "showid not exist (most likely), or database error" });
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { showid, userid, stars, comment, favorite } = req.body;

  if (!showid) {
    res.status(400);
    throw new Error("please provide required all fields (showid)");
  }

  const reviewCur = await shows.create({
    userid: userid,
    showid: showid,
    stars: stars,
    comment: comment,
    created: Date.now(),
    favorite: favorite,
 
  });

  if (reviewCur) {
    res.status(200).json({
      message: "successfully created review for " + showCur.title + " as userid " + userid,
      reviewCur,
    });
  } else {
    res.status(200).json({ Error: "Internal error fail to create review" });
  }
});


const deleteReview = asyncHandler(async (req, res) => {
    const {showid, userid} = req.body;
  
    if(!showid || !userid)
    {
      res.json({error: "showid and userid can not be empty"});
      return;
    }
  
    const deletedReview = await reviews.deleteOne({showid: showid, userid: userid});
  
    if(deletedReview)
    {
      res.json({status: "successfully deleted review " + showid + " with userid " + userid});
    }
    else{
      res.json({error: "Internal error failed to delete review " + showid + " with userid " + userid});
    }
  })

module.exports = { updateReview, GetReview, addReview, deleteReview };
