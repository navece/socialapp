import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles, Typography, Link } from "@material-ui/core";
import { Fragment } from "react";
import dayjs from "dayjs";

const styles = {
  commentImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: "20px",
  },
  invisibleSeperator: {
    border: "none",
    margin: 4,
  },
  visibleSeperator: {
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, userHandle, userImage, createdAt } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="Comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeperator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 ? (
                <hr className={classes.visibleSeperator} />
              ) : null}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);
