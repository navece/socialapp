import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Profile from "../components/profile/Profile";
import Scream from "../components/scream/Scream";
import { getScreams } from "../redux/actions/dataActions";
import ScreamSkeleton from "../util/ScreamSkeleton";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getScreams,
};

home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
