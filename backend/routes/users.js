const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  const respond = (data) => {
    res.json({
      success: true,
      data
    });
  };

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  User.find()
    .then(respond)
    .catch(onError);
});

router.post("/", (req, res, next) => {
  const { email, name, phoneNumber, address } = req.body;

  const create = user => {
    if (user) {
      throw new Error("이미 생성한 이메일입니다.");
    } else {
      return User.create(email, name, phoneNumber, address);
    }
  };

  const respond = () => {
    res.json({
      success: true,
      message: "성공적으로 등록 되었습니다."
    });
  };

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  User.findOneByEmail(email)
    .then(create)
    .then(respond)
    .catch(onError);
});

router.delete("/", (req, res, next) => {
  const { id } = req.query;
  const respond = (user) => {
    if(user) {
      res.json({
        success: true,
        message: "삭제 되었습니다."
      });
    } else {
      throw new Error("해당 유저를 찾지 못했습니다.");
    }
  };

  const onError = (error) => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  User.deleteUserById(id)
    .then(respond)
    .catch(onError);
});

module.exports = router;
