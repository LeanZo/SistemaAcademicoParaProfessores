import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
  flex: {
    flexGrow: 1,
  },
  footer: {
    padding: 0,
    position: "absolute",
    textAlign: "center",
    left: 0,
    bottom: 0,
    right: 0,
  }
});

class Footer extends React.Component {
  componentDidMount(){
      this.props.callback(this.divElement.clientHeight);
  }

  render() {
    const { classes } = this.props;

    return (
        <React.Fragment>
      <Paper className={classes.footer} ref={(divElement) => { this.divElement = divElement }}>
        {/* <Grid container spacing={8}> */}
          <Divider />

          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography
                variant="caption"
                color="inherit"
                className={classes.flex}
                style={{float: 'left', textAlign: 'left'}}
              >
                Filipe Duarte, Lucas Calvacante, Lucas Lean
              </Typography>
              <Typography color="inherit" variant="caption" style={{float: 'right'}}>
              Sistema desenvolvido como trabalho para a disciplina Tópicos em Análise e Desenvolvimento de Sistemas(4ADS) - FAETERJ, 2019
              </Typography>
            </Toolbar>
          </AppBar>
        {/* </Grid> */}
      </Paper>
      </React.Fragment>
    );
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
