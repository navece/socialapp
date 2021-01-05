import React, { Component } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";
import { withStyles, Paper } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const theme = {
  palette: {
    primary: {
      light: "#1A659E",
      main: "#164e87",
      dark: "#164e87",
      contrastText: "#fff",
    },
    secondary: {
      light: "#1A659E",
      main: "#164e87",
      dark: "#164e87",
      contrastText: "#fff",
    },
  },
};

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10,
  },
};

class ProfileSkeleton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <div className={classes.handle} />
            <hr />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <hr />
            <LocationOn color="primary" /> <span>Location</span>
            <hr />
            <LinkIcon color="primary" /> <span>https://website.com</span>
            <hr />
            <CalendarToday color="primary" /> <span>Joined date</span>
          </div>
        </div>
      </Paper>
    );
  }
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
