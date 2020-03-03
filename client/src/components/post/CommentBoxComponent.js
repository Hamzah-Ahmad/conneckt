import React, { useState } from "react";
import { connect } from "react-redux";
import { postComment as makeComment } from "../../actions/commentActions";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CommentComponent from "./CommentComponent";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

const useStyles = makeStyles(theme => ({
  expansionPanel: {
    // background: "skyblue",
    boxShadow: "none",
    border: "none",
    marginLeft: "0",
    paddingLeft: "0px"
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
const CommentBoxComponent = props => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);
  return (
    <React.Fragment>
      <TextField
        fullWidth
        multiline={true}
        variant="outlined"
        id="commentTextField"
        value={commentText}
        className={classes.textField}
        placeholder="Add a comment"
        onChange={e => setCommentText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (commentText) {
                    props.makeComment(props.post._id, commentText);
                    setCommentText("");
                  }
                }}
              >
                <KeyboardArrowRightOutlinedIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <ExpansionPanel
        className={classes.expansionPanel}
        onChange={() => setExpanded(!expanded)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <small className="expansion-header">
            {expanded ? "Hide Comments" : "View Comments"}
          </small>
        </ExpansionPanelSummary>
        {props.post.comments.map(comment => (
          <CommentComponent
            comment={comment}
            post={props.post}
            auth={props.auth}
            key={comment._id}
            deleteComment={props.deleteComment}
          />
        ))}
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default connect(null, { makeComment })(CommentBoxComponent);
