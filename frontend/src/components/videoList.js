






// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CommentIcon from "@mui/icons-material/Comment";
// import ShareIcon from "@mui/icons-material/Share"; // Import Share Icon
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import AddIcon from "@mui/icons-material/Add";
// import api from "../services/api";

// const socket = io("http://localhost:5000");

// const FeedPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const navigate = useNavigate();
//   const containerRef = useRef(null);

//   useEffect(() => {
//     fetchVideos();

//     // Listen for real-time like updates
//     socket.on("likeUpdated", ({ videoId, likes }) => {
//       setVideos((prevVideos) =>
//         prevVideos.map((video) =>
//           video._id === videoId ? { ...video, likes: new Array(likes).fill(1) } : video
//         )
//       );
//     });

//     return () => {
//       socket.off("likeUpdated");
//     };
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const { data } = await api.get("/videos/videos");
//       setVideos(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       await api.put(`/videos/like/${id}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCommentClick = () => setIsCommentDialogOpen(true);

//   const handleCommentSubmit = async () => {
//     try {
//       await api.post(`/videos/comment/${videos[currentIndex]._id}`, {
//         text: commentText,
//       });
//       setCommentText("");
//       setIsCommentDialogOpen(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleShare = () => {
//     const videoUrl = videos[currentIndex]?.videoUrl;
//     if (videoUrl) {
//       const whatsappUrl = `https://wa.me/?text=Check out this video: ${videoUrl}`;
//       window.open(whatsappUrl, "_blank");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#000",
//       }}
//     >
//       <Box
//         ref={containerRef}
//         sx={{
//           width: 350,
//           height: 550,
//           backgroundColor: "#1c1c1c",
//           borderRadius: 20,
//           boxShadow: "0 0 15px rgba(255, 0, 80, 0.8)",
//           overflow: "auto",
//         }}
//       >
//         {videos.map((video, index) => (
//           <CardMedia
//             key={video._id}
//             component="video"
//             src={video.videoUrl}
//             autoPlay={index === currentIndex}
//             loop
//             muted
//             sx={{ width: "100%", height: "100%", objectFit: "contain" }}
//           />
//         ))}
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           top: "70%",
//           right: "34%",
//           transform: "translateY(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           gap: 4,
//         }}
//       >
//         <IconButton
//           sx={{ color: "#ff0050" }}
//           onClick={() => handleLike(videos[currentIndex]?._id)}
//         >
//           <FavoriteIcon />
//         </IconButton>
//         <Typography
//           sx={{
//             color: "#fff",
//             fontSize: "0.8rem",
//             textAlign: "center",
//           }}
//         >
//           {videos[currentIndex]?.likes?.length || 0}
//         </Typography>
//         <IconButton sx={{ color: "#fff" }} onClick={handleCommentClick}>
//           <CommentIcon />
//         </IconButton>
//         <IconButton sx={{ color: "#25D366" }} onClick={handleShare}>
//           <ShareIcon />
//         </IconButton>
//       </Box>
//       <Button
//         variant="contained"
//         sx={{
//           position: "absolute",
//           bottom: 30,
//           right: 30,
//           backgroundColor: "#ff0050",
//           color: "#fff",
//           width: 60,
//           height: 60,
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           "&:hover": { backgroundColor: "#d60046" },
//         }}
//         onClick={() => navigate("/upload")}
//       >
//         <AddIcon />
//       </Button>

//       <Dialog
//         open={isCommentDialogOpen}
//         onClose={() => setIsCommentDialogOpen(false)}
//       >
//         <DialogTitle>Add a Comment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Comment"
//             variant="outlined"
//             fullWidth
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleCommentSubmit} color="primary">
//             Post
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default FeedPage;



















// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CommentIcon from "@mui/icons-material/Comment";
// import ShareIcon from "@mui/icons-material/Share";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import AddIcon from "@mui/icons-material/Add";
// import api from "../services/api";

// const socket = io("http://localhost:5000");

// const FeedPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [comments, setComments] = useState([]); // New state for storing comments
//   const navigate = useNavigate();
//   const containerRef = useRef(null);

//   useEffect(() => {
//     fetchVideos();

//     // Listen for real-time like updates
//     socket.on("likeUpdated", ({ videoId, likes }) => {
//       setVideos((prevVideos) =>
//         prevVideos.map((video) =>
//           video._id === videoId ? { ...video, likes: new Array(likes).fill(1) } : video
//         )
//       );
//     });

//     return () => {
//       socket.off("likeUpdated");
//     };
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const { data } = await api.get("/videos/videos");
//       setVideos(data);
//       // Initialize comments for each video (empty initially)
//       setComments(data.map(() => [])); 
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       await api.put(`/videos/like/${id}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCommentClick = () => setIsCommentDialogOpen(true);

//   const handleCommentSubmit = () => {
//     const newComment = { text: commentText };
    
//     // Update comments state to show the new comment immediately
//     setComments((prevComments) => {
//       const updatedComments = [...prevComments];
//       updatedComments[currentIndex].push(newComment);
//       return updatedComments;
//     });

//     setCommentText("");
//     setIsCommentDialogOpen(false);
//   };

//   const handleShare = () => {
//     const videoUrl = videos[currentIndex]?.videoUrl;
//     if (videoUrl) {
//       const whatsappUrl = `https://wa.me/?text=Check out this video: ${videoUrl}`;
//       window.open(whatsappUrl, "_blank");
//     }
//   };

//   // Use IntersectionObserver to detect when the video comes into view
//   const videoRefs = useRef([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = videoRefs.current.indexOf(entry.target);
//             if (index !== -1) {
//               setCurrentIndex(index);
//             }
//           }
//         });
//       },
//       { threshold: 0.5 } // Trigger when 50% of the video is in view
//     );

//     videoRefs.current.forEach((video) => {
//       observer.observe(video);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height:'90vh',
//         backgroundColor: "#000",
//         mt:4
//       }}
//     >
//       <Box
//         ref={containerRef}
//         sx={{
//           width: 350,
//           height: 550,
//           backgroundColor: "#1c1c1c",
//           borderRadius: 20,
//           boxShadow: "0 0 15px rgba(255, 0, 80, 0.8)",
//           overflow: "auto",
//         }}
//       >
//         {videos.map((video, index) => (
//           <CardMedia
//             key={video._id}
//             component="video"
//             src={video.videoUrl}
       
//             controls
//             ref={(el) => (videoRefs.current[index] = el)} // Assign refs to each video
//             autoPlay={index === currentIndex} // Only play the video that is in view
//             loop
//             muted
//             sx={{ width: "100%", height: "100%", objectFit: "contain" }}
//           />
//         ))}
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           top: "70%",
//           right: "34%",
//           transform: "translateY(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           gap: 4,
//         }}
//       >
//         <IconButton
//           sx={{ color: "#ff0050" }}
//           onClick={() => handleLike(videos[currentIndex]?._id)}
//         >
//           <FavoriteIcon />
//         </IconButton>
//         <Typography
//           sx={{
//             color: "#fff",
//             fontSize: "0.8rem",
//             textAlign: "center",
//           }}
//         >
//           {videos[currentIndex]?.likes?.length || 0}
//         </Typography>
//         <IconButton sx={{ color: "#fff" }} onClick={handleCommentClick}>
//           <CommentIcon />
//         </IconButton>
//         <IconButton sx={{ color: "#25D366" }} onClick={handleShare}>
//           <ShareIcon />
//         </IconButton>
//       </Box>
//       <Button
//         variant="contained"
//         sx={{
//           position: "absolute",
//           bottom: 30,
//           right: 30,
//           backgroundColor: "#ff0050",
//           color: "#fff",
//           width: 60,
//           height: 60,
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           "&:hover": { backgroundColor: "#d60046" },
//         }}
//         onClick={() => navigate("/upload")}
//       >
//         <AddIcon />
//       </Button>

//       <Dialog
//         open={isCommentDialogOpen}
//         onClose={() => setIsCommentDialogOpen(false)}
//       >
//         <DialogTitle>Add a Comment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Comment"
//             variant="outlined"
//             fullWidth
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleCommentSubmit} color="primary">
//             Post
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Display comments for the current video */}
//       <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
//         {comments[currentIndex]?.map((comment, index) => (
//           <Typography key={index} sx={{ marginBottom: "8px" }}>
//             {comment.text}
//           </Typography>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default FeedPage;




import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/api";

const socket = io("https://mern-azure-1-web-app-gydtebb3g4hua0h2.uksouth-01.azurewebsites.net");

const FeedPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]); // New state for storing comments
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    fetchVideos();

    // Listen for real-time like updates
    socket.on("likeUpdated", ({ videoId, likes }) => {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId ? { ...video, likes: new Array(likes).fill(1) } : video
        )
      );
    });

    return () => {
      socket.off("likeUpdated");
    };
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await api.get("/videos/videos");
      setVideos(data);
      // Initialize comments for each video (empty initially)
      setComments(data.map(() => []));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await api.put(`/videos/like/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentClick = () => setIsCommentDialogOpen(true);

  const handleCommentSubmit = () => {
    const newComment = { text: commentText };

    // Update comments state to show the new comment immediately
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[currentIndex].push(newComment);
      return updatedComments;
    });

    setCommentText("");
    setIsCommentDialogOpen(false);
  };

  const handleShare = () => {
    const videoUrl = videos[currentIndex]?.videoUrl;
    if (videoUrl) {
      const whatsappUrl = `https://wa.me/?text=Check out this video: ${videoUrl}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // Use IntersectionObserver to detect when the video comes into view
  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index);
              // Set video quality to 360p when it comes into view
              videoRefs.current[index].playbackRate = 1; // Default playbackRate
              videoRefs.current[index].setAttribute("playsinline", "true"); // Important for mobile
              videoRefs.current[index].setAttribute("muted", "muted");
              videoRefs.current[index].setAttribute("poster", ""); // Optional poster image to hide loading screen
              console.log("Video at index", index, "set to 360p");
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in view
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "#000",
        mt: 4,
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: 350,
          height: 550,
          backgroundColor: "#1c1c1c",
          borderRadius: 20,
          boxShadow: "0 0 15px rgba(255, 0, 80, 0.8)",
          overflow: "auto",
        }}
      >
        {videos.map((video, index) => (
          <CardMedia
            key={video._id}
            component="video"
            src={video.videoUrl}
            controls
            ref={(el) => (videoRefs.current[index] = el)} // Assign refs to each video
            autoPlay={index === currentIndex} // Only play the video that is in view
            loop
            muted
            controlsList="nodownload noplaybackrate" // Prevent user from changing playback speed and video quality
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "34%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <IconButton
          sx={{ color: "#ff0050" }}
          onClick={() => handleLike(videos[currentIndex]?._id)}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          {videos[currentIndex]?.likes?.length || 0}
        </Typography>
        <IconButton sx={{ color: "#fff" }} onClick={handleCommentClick}>
          <CommentIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }} onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: "#ff0050",
          color: "#fff",
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { backgroundColor: "#d60046" },
        }}
        onClick={() => navigate("/upload")}
      >
        <AddIcon />
      </Button>

      <Dialog
        open={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
      >
        <DialogTitle>Add a Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCommentSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display comments for the current video */}
      <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
        {comments[currentIndex]?.map((comment, index) => (
          <Typography key={index} sx={{ marginBottom: "8px" }}>
            {comment.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default FeedPage;
