import React, { Component } from 'react';
import {
  withStyles,
  CircularProgress,
  Avatar,
  Typography,
  Button
} from 'material-ui';
import { inject, observer } from 'mobx-react';
import { CheckCircle, Check, Error } from 'material-ui-icons';

import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';

import cx from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  status: {
    height: theme.spacing.unit * 12,
    width: theme.spacing.unit * 12,
    position: 'relative',
    color: '#FFF',
    marginBottom: theme.spacing.unit
  },
  statusLoading: {
    backgroundColor: grey[500]
  },
  statusSuccess: {
    backgroundColor: green[500]
  },
  statusError: {
    backgroundColor: theme.palette.error.main
  },
  statusIcon: {
    height: '50%',
    width: '50%'
  },
  progress: {
    position: 'absolute',
    top: '-10%',
    left: '-10%'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class ActivateAccountStep extends Component {
  async componentDidMount() {
    this.props.rootStore.uiState.addStellarUiState.activateAccount();
  }

  tryAgain = () => {
    this.props.rootStore.uiState.addStellarUiState.activateAccount();
  };

  ok = () => {
    this.props.rootStore.uiState.addStellarUiState.done();
  };

  render() {
    const { classes, rootStore } = this.props;

    const {
      status,
      data
    } = rootStore.uiState.addStellarUiState.activateAccountStatus;

    const loading = status === 'loading';
    const success = status === 'success';
    const error = status === 'error';

    const statusClasses = cx(classes.status, {
      [classes.statusLoading]: loading,
      [classes.statusSuccess]: success,
      [classes.statusError]: error
    });

    return (
      <div>
        <Typography variant="title">Activate StellarGuard</Typography>
        <div className={classes.root}>
          <div className={classes.status}>
            <Avatar className={statusClasses}>
              {success && <CheckCircle className={classes.statusIcon} />}
              {loading && <Check className={classes.statusIcon} />}
              {error && <Error className={classes.statusIcon} />}
            </Avatar>
            {loading && (
              <CircularProgress
                thickness={2}
                size="120%"
                className={classes.progress}
              />
            )}
          </div>
          {loading && (
            <Typography>
              Verifying that your Stellar Account has Multi-Sig setup up.
            </Typography>
          )}
          {success && (
            <React.Fragment>
              <Typography>
                Your account is now protected by StellarGuard!
              </Typography>
              <Button color="primary" onClick={this.ok}>
                Ok
              </Button>
            </React.Fragment>
          )}
          {error && (
            <React.Fragment>
              <Typography>{data.error}</Typography>
              <Button color="primary" onClick={this.tryAgain}>
                Try Again
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ActivateAccountStep;
