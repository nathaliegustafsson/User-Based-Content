// import {
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function DeletePostDialog({
//   postId,
//   open,
//   handleClose,
// }: {
//   postId: number;
//   open: boolean;
//   handleClose: () => void;
// }) {
//   const navigate = useNavigate();
//   const [openUp, setOpenUp] = useState(false);

//   const handleOpen = () => {
//     setOpenUp(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenUp(false);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/posts/${postId}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         navigate("/");
//       } else {
//         throw new Error("Failed to delete post");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}>
//       <Typography variant="h4">Delete Post</Typography>
//       <Typography variant="body1">
//         Are you sure you want to delete this post?
//       </Typography>
//       <Button variant="contained" onClick={handleOpen}>
//         Delete
//       </Button>
//       <Dialog open={open} onClose={handleCloseDialog}>
//         <DialogTitle>Delete Post</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete this post?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleDelete} autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default DeletePostDialog;
