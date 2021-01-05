import React, { Component, Fragment } from "react";
import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import dayjs from "dayjs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (e) => {
    this.setState({ anchorEl: e.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((noti) => !noti.read)
      .map((noti) => noti.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  render() {
    var relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((noti) => noti.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter((noti) => noti.read === false).length
              }
              color="secondary"
            >
              <NotificationIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationIcon />);
    } else {
      notificationIcon = <NotificationIcon />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((noti) => {
          const verb = noti.type === "like" ? "liked" : "commented on";
          const time = dayjs(noti.createdAt).fromNow();
          const iconColor = noti.read ? "primary" : "secondary";
          const icon =
            noti.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={noti.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                variant="body1"
                to={`/user/${noti.recipient}/scream/${noti.screamId}`}
              >
                {noti.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip title="Notifications" placement="top">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
