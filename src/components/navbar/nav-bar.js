import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBarComponent(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'linear-gradient(to right, #433775, #36314d, #817d99)'}}>
        <Toolbar>

          <Typography variant="title" color="inherit" className={classes.flex}>
            DRINK FINDER
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBarComponent);
