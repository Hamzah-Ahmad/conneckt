import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withRouter } from "react-router-dom";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

const EditPost = ({
  dialogOpen,
  setDialogOpen,
  content,
  editPost,
  postId,
  redirectBool,
  ...props
}) => {
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
              //Edit post is used in both HomePage component and PostPage component. Redirection was required in the PostPage component, therefore I introduced this variable here. This variable should be only in these three files.
              if (redirectBool == true) {
                props.history.push("/");
              }
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

export default withRouter(EditPost);
