const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const gettingUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userID;
    if (id !== userId) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
    }
    const user = await User.findById({ _id: id }).select("-password")
    res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something wrong happend" });
  }
};
const edittingProfileInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userID;
    if (id !== userId) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
    }
    const { name, image, email, phone, address } = req.body;
    if (name) {
      await findByIdUpdate(id, { name });
    }
    if (email) {
      await findByIdUpdate(id, { email });
    }
    if (address) {
      await findByIdUpdate(id, { address });
    }
    if (image) {
      await findByIdUpdate(id, { image });
    }
    const user = await User.findByIdUpdate({ _id: id }, {}).select("password");
    res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something wrong happend" });
  }
};
module.exports = { gettingUserDetail, edittingProfileInfo };
