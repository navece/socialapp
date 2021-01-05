import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  form: {
    textAlign: "center",
  },
  submitButton: {
    margin: "20px auto 20px auto",
    position: "relative",
    float: "right",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
};

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {},
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postScream({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const { loading } = this.props.UI;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
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
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="scream!!"
                multiline
                rows="3"
                placeholder="Scream at your friends"
                error={errors.error ? true : false}
                helperText={errors.error}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.ui,
});

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
