import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';

class WaitForIt extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      error: null,
      startedAt: null,
      promise: null,
    };
  }

  hookOnToPromise (promise) {
    const startedAt = Date.now();

    this.setState({
      loading: true,
      data: null,
      error: null,
      startedAt,
      promise: this.appendPromise(promise, startedAt),
    })
  }

  appendPromise (promise, startedAt) {
    return promise
      .then(data => {
        if (this.state.startedAt === startedAt) {
          this.setState({ data });
        }
      })
      .catch(error => {
        if (this.state.startedAt === startedAt) {
          this.setState({ error });
        }
      })
      .then(() => {
        if (this.state.startedAt === startedAt) {
          this.setState({ loading: false })
        }
      });
  }

  componentDidMount () {
    this.hookOnToPromise(this.props.promise);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.promise !== this.props.promise) {
      this.hookOnToPromise(nextProps.promise);
    }
  }

  render () {
    const { render, renderLoading, renderError } = this.props;
    const { loading, data, error } = this.state;

    if (loading) {
      return renderLoading();
    } else if (error) {
      return renderError(error);
    }

    return render(data);
  }
}

WaitForIt.defaultProps = {
  render: data => JSON.stringify(data),
  renderLoading: () => "Loading...",
  renderError: e => JSON.stringify(e),
};

WaitForIt.propTypes = {
  promise: instanceOf(Promise),
  render: func,
  renderLoading: func,
  renderError: func,
};

export default WaitForIt;
