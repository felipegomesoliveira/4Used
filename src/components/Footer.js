import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-around",
    bordertop: "2px solid gainsboro"
  }
});

function BottomAppBar(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        color="palette.background.default"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography variant="h6" gutterBottom>
              Siga a gente
            </Typography>
            <BottomNavigation>
              <FacebookIcon
                label="Facebook"
                color="disabled"
                icon={<RestoreIcon />}
              />
              <InstagramIcon
                label="Instagram"
                color="disabled"
                icon={<FavoriteIcon />}
              />
              <TwitterIcon
                label="Twitter"
                color="disabled"
                icon={<LocationOnIcon />}
              />
              <GitHubIcon
                label="GitHub"
                color="disabled"
                icon={<LocationOnIcon />}
              />
            </BottomNavigation>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomAppBar);
