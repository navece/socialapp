import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = {
  form: {
    textAlign: "center",
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
  button: {
    margin: "20px auto 20px auto",
  },
};

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const { classes, authenticated } = this.props;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Add Comment"
            error={errors.comment ? true : false}
            onChange={this.handleChange}
            helperText={errors.comment}
            value={this.state.body}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeperator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

const mapStateToProps = (state) => ({
  UI: state.ui,
  authenticated: state.user.authenticated,
});

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
