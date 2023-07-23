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

  if(!userid){
    reviewCur = await reviews.find({ showid });
  }
  else {
    reviewCur = await reviews.find({
        $and: [
            {userid},
            {showid}
        ]
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
  const {
    showid,
    userid,
    stars,
    userComment,
    dateRelease,
  } = req.body;

  if (!showid || !userid) {
    res.status(400).json({
        error: "please provide required all fields (showid, userid)"
    });

    return;
  }

  const reviewCur = await reviews.findOne({showid}, {userid})


  const updatedReviewCur = await reviews.findOneAndUpdate({ showid }, {userid},
    {
        $set: {
        stars: stars ? stars : reviewCur.stars,
        userComment: userComment ? userComment : reviewCur.userComment,
        dateRelease: dateRelease ? dateRelease : reviewCur.dateRelease,
        },
    
    });

  if (updatedReviewCur) {
    res.status(200).json({
      message: "successfully updated show " + showid,
      updatedReviewCur
    });
  } else {
    res
      .status(200)
      .json({ Error: "showid not exist (most likely), or database error" });
  }
});

module.exports = { updateReview, GetReview };
