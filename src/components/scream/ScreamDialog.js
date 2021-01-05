import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  withStyles,
  CircularProgress,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
  invisibleSeperator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinner: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  visibleSeperator: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
};

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/user/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/user/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/user/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body2">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeperator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.ui,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

ScreamDialog.propTypes = {
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
  openDialog: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
