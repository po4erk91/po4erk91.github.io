import React, { Component } from 'react';
import InputLoginField from '../Components/InputLoginField';
import FormButton from '../Components/FormButton';
import SimpleBox from '../Components/SimpleBox';
import { createAccount } from '../Actions/UserActions';
import { connect } from 'react-redux';
import ErrorAlert from '../Components/ErrorAlert';
import { errStyle } from '../Helpers/ReduxFormValidation';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  }

  isValid() {
    const { email, password, confirmPassword } = this.state;

    if (email === '' || password === '' || confirmPassword === '') {
      this.setState({
        error: 'Please enter in all fields',
      });
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: 'Please make sure your passwords match',
      });
      return false;
    }

    return true;
  }

  submitAccount(event) {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    this.props.createAccount(this.state.email, this.state.password).then(() => {
      this.props.history.replace('/');
    }).catch((err) => {
      this.setState({
        error: err.message,
      });
    });
  }

  renderBody() {
    return (
      <div>
        <form onSubmit={event => this.submitAccount(event)}>
          <InputLoginField
            id="email"
            type="text"
            label="Email"
            inputAction={event => this.setState({ email: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          <InputLoginField
            id="password"
            type="password"
            label="Password"
            inputAction={event => this.setState({ password: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          <InputLoginField
            id="confirm-password"
            type="password"
            label="Confirm password"
            inputAction={event => this.setState({ confirmPassword: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          {this.state.error && <ErrorAlert>
            {this.state.error}
          </ErrorAlert>}
          <FormButton submitLabel="Create Account" otherLabel="Go back" goToLink="/Login" {...this.props} />
        </form>
      </div>
    );
  }

  render() {
    return (
      <SimpleBox body={this.renderBody()} title="Create Account" />
    );
  }
}

export default connect(null, { createAccount })(CreateAccount);
