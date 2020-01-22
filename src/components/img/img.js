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
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });
  };

  componentDidMount() {
    const { src } = this.props;
    this.loadImage(src)
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
      return (
        <div className="img">
          <img className="img_loader" alt="" src={imgError} />
        </div>
      );
    }

    if (!source) {
      return (
        <div className="img">
          <img className="img_loader" alt="" src={imgLoading} />
        </div>
      );
    }

    return <img src={source} className={className} alt={alt} />;
  }
}
