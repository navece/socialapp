import React, { Component } from "react";
import {
  withStyles,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  button: {
    margin: "20px auto 20px auto",
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(userData, this.props.history);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="logo" className={classes.image} />
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="handle"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              Already have an acount ? login <Link to="/login">here</Link>{" "}
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.ui,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
