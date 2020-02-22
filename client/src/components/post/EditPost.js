import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

const EditPost = ({ dialogOpen, setDialogOpen, content, editPost, postId }) => {
  const [postContent, setPostContent] = useState(content);
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline={true}
            variant="outlined"
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              editPost(postId, postContent);
              setDialogOpen(false);
            }}
            color="primary"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPost;
