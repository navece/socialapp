import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserData } from "../redux/actions/dataActions";
import Axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

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
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
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
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  button: {
    margin: "20px auto 20px auto",
    position: "relative",
  },
};

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }

    this.props.getUserData(handle);
    Axios.get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { screamIdParam } = this.state;
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No scream from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} />;
        } else {
          return <Scream key={scream.screamId} scream={scream} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(user)
);
