import React from 'react';

import imgLoading from './loading.svg';
import imgError from './error.svg';
import './img.css';

export default class Img extends React.Component {
  state = {
    source: null,
    error: false,
  };

  loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  componentDidMount() {
    const { src } = this.props;
    this.loadImage(this.props.src)
      .then(() => {
        this.setState({ source: src });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    const { className, alt } = this.props;
    const { source, error } = this.state;

    if (error) {
      return <img src={imgError} className="img" alt="" />;
    }

    if (!source) {
      return <img src={imgLoading} className="img" alt=""/>;
    }

    return <img src={source} className={className} alt={alt} />;
  }
}
