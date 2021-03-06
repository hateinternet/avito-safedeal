import React from 'react';

import GalleryService from '../../service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import Img from '../img';
import GalleryModal from '../gallery-modal';
import './gallery.css';

export default class Gallery extends React.Component {

  galleryService = new GalleryService();

  state = {
    loading: true,
    error: false,
    images: null,
    modalOpened: false,
    modalIdx: null,
    name: '',
    text: '',
  };

  componentDidMount() {
    this.galleryService.getAllImages()
      .then(images => {
        this.setState({ loading: false, images });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  openModal = (id) => {
    this.setState({ modalOpened: true, modalIdx: id });
  };

  closeModal = () => {
    this.setState({ modalOpened: false, modalIdx: null });
  };

  keyDownGallery = (evt, id) => {
    if (evt.key === 'Enter') {
      this.openModal(id);
    }
  };

  renderImages = () => this.state.images.map(({ id, url }) => (
    <button
      key={id}
      className="gallery-item"
      onClick={() => this.openModal(id)}
      onKeyDown={(evt) => this.keyDownGallery(evt, id)}>
      <Img src={url} className="gallery-item__img" alt="" />
    </button>
  ));

  renderModal = () => {
    const { modalOpened, modalIdx } = this.state;

    if (!modalOpened) {
      return null;
    }

    return <GalleryModal modalIdx={modalIdx} closeModal={this.closeModal}/>;
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    if (this.state.error) {
      return <ErrorIndicator />;
    }

    const images = this.renderImages();
    const modal = this.renderModal();

    return (
      <div className="gallery">
        { images }
        { modal }
      </div>
    );
  }
}
