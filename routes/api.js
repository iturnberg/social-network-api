const router = require('express').Router();
const User = require('../models/user');
const Thought = require('../models/thought');

// User Routes
router.get('/users', async (req, res) => {
  const users = await User.find().populate('thoughts').populate('friends');
  res.json(users);
});

router.post('/users', async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

router.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Thought Routes
router.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find().populate('reactions');
  res.json(thoughts);
});

router.post('/thoughts', async (req, res) => {
  const newThought = await Thought.create(req.body);
  res.json(newThought);
});

router.put('/thoughts/:id', async (req, res) => {
  const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedThought);
});

router.delete('/thoughts/:id', async (req, res) => {
  await Thought.findByIdAndDelete(req.params.id);
  res.json({ message: 'Thought deleted' });
});

// Add friend to user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.friends.push(req.params.friendId);
  await user.save();
  res.json(user);
});

// Remove friend from user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.friends.pull(req.params.friendId);
  await user.save();
  res.json(user);
});

// Add reaction to thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  thought.reactions.push(req.body);
  await thought.save();
  res.json(thought);
});

// Remove reaction from thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  thought.reactions.id(req.params.reactionId).remove();
  await thought.save();
  res.json(thought);
});

module.exports = router;
