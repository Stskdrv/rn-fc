const jwt = require('jsonwebtoken');
const { JWT_KEY, JWT_REF_KEY } = require('../../config/keys');
const User = require('../models/User');

exports.generateRefreshToken =  async (userId) => {
  const refreshToken = jwt.sign({ userId }, JWT_REF_KEY);
  const user = await User.findById(userId);
  user.refreshToken = refreshToken;
  await user.save();
  return refreshToken;
}

const updateRefreshToken = async (refreshToken, userId) => {
  const user = await User.findById(userId);
  if (!existingToken) {
    throw new Error('Refresh token not found');
  }
  user.refreshToken = refreshToken;
  await user.save();
}

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const userId = req.user.id;

  try {
    const decoded = jwt.verify(refreshToken, JWT_REF_KEY);
    if (decoded.userId !== userId) {
      throw new Error('Invalid refresh token');
    }

    const newToken = jwt.sign({ userId }, JWT_KEY, { expiresIn: 3600 });

    await updateRefreshToken(newToken, userId);

    res.json({
      token: newToken,
      refreshToken: refreshToken
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}