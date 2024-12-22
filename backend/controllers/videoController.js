const Video = require('../models/Video');
const Interaction = require('../models/Interaction');
const SavedVideo = require('../models/SavedVideo'); // Model for saved videos
// Upload video
exports.uploadVideo = async (req, res) => {
  const { title, description ,userId} = req.body;


  try {
    const videoUrl = req.file.path.replace(/\\/g, '/');
    const video = new Video({
      title,
      description,
      videoUrl: req.file.path,
      userId: req.user.userId,
    });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    const correctedVideos = videos.map((video) => ({
      ...video.toObject(),
      videoUrl: `${req.protocol}://${req.get('host')}/${video.videoUrl.replace(/\\/g, '/')}`,
    }));

    res.status(200).json(correctedVideos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Like video


exports.likeVideo = async (req, res) => {
  try {
    let interaction = await Interaction.findOne({ videoId: req.params.id });
    if (!interaction) {
      interaction = new Interaction({ videoId: req.params.id });
    }

    const userId = req.user.userId;

    // Toggle like
    if (!interaction.likes.includes(userId)) {
      interaction.likes.push(userId);
    } else {
      interaction.likes.pull(userId);
    }

    await interaction.save();

    // Emit the updated like count to all connected clients
    const io = req.app.get("io");
    io.emit("likeUpdated", {
      videoId: req.params.id,
      likes: interaction.likes.length,
    });

    res.status(200).json(interaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add comment to video
exports.commentOnVideo = async (req, res) => {
  const { text } = req.body;
  try {
    let interaction = await Interaction.findOne({ id: req.params.videoId });
    if (!interaction) {
      interaction = new Interaction({ id: req.params.videoId });
    }
    interaction.comments.push({ userId: req.user.userId, text });
    await interaction.save();
    res.status(200).json(interaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





exports.saveVideo = async (req, res) => {
  const { videoId, userId } = req.body;
  try {
    // Save the video reference in the SavedVideo collection
    const savedVideo = new SavedVideo({ videoId, userId });
    await savedVideo.save();

    // Log the saved video document
    console.log('Saved Video:', savedVideo); // Log the saved reference

    // Populate the videoId with video details (including videoUrl)
    const savedVideos = await SavedVideo.find({ userId })
      .populate('videoId', 'videoUrl title') // Populate videoId with videoUrl and title from Video model
      .exec();

    // Replace backslashes with forward slashes in videoUrl and prepend base URL
    savedVideos.forEach(video => {
      if (video.videoId && video.videoId.videoUrl) {
        video.videoId.videoUrl = `http://localhost:3000/${video.videoId.videoUrl.replace(/\\/g, '/')}`;
      }
    });

    // Log the populated savedVideos to check the videoUrl
    console.log('Populated Saved Videos:', savedVideos); // Log populated data with videoUrl

    // Emit updated saved videos list to all clients
    req.app.get("io").emit("savedVideosUpdated", savedVideos);

    // Send the populated saved video response
    res.status(201).json(savedVideos); // Return the populated savedVideos array, not savedVideo
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get saved videos for a user
exports.getSavedVideos = async (req, res) => {
  try {
    const savedVideos = await SavedVideo.find({ userId: req.user.userId }).populate('videoId');
    res.status(200).json(savedVideos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};