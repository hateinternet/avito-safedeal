import React from 'react';
import FocusLock from "react-focus-lock";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import GalleryService from '../../service';
import Img from '../img';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import Input from '../input';
import { generateId, transformDate } from '../../utils';
import './gallery-modal.css';

export default class GalleryModal extends React.Component {
  galleryService = new GalleryService();
  modalRef = React.createRef();
  buttonRef = React.createRef();

  state = {
    loading: true,
    error: false,
    url: '',
    comments: [],
    name: '',
    text: '',
    nameIsValid: true,
    textIsValid: true,
    submitBlocked: false,
  };

  componentDidMount() {
    this.galleryService
      .getImage(this.props.modalIdx)
      .then(({ url, comments }) => {
        this.setState({
          url,
          comments,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false,
        });
      });

    disableBodyScroll(this.modalRef.current);
    document.body.addEventListener('keydown', this.keyDownModal);
  }

  componentWillUnmount() {
    enableBodyScroll(this.modalRef.current);
    document.body.removeEventListener('keydown', this.keyDownModal);
  }

  keyDownModal = ({ key }) => {
    key === 'Escape' && this.props.closeModal();
  };

  validateForm() {
    const { name, text } = this.state;
    const nameIsEmpty = name.trim().length === 0;
    const textIsEmpty = text.trim().length === 0;

    this.setState({
      nameIsValid: !nameIsEmpty,
      textIsValid: !textIsEmpty,
    });

    if (nameIsEmpty || textIsEmpty) {
      return false;
    }

    return true;
  }

  submitForm = (evt) => {
    evt.preventDefault();

    const formIsValid = this.validateForm();
    if (!formIsValid) {
      return ;
    }

    const { submitBlocked } = this.state;
    if (submitBlocked) {
      return ;
    }

    const text = this.state.text.trim();
    const name = this.state.name.trim();
    this.setState({ submitBlocked: true });
    this.galleryService
      .postComment(this.props.modalIdx, { name, comment: text })
      .then(() => {
        const { comments } = this.state;
        const newComment = {
          text,
          name,
          id: generateId(),
          date: Date.now(),
        };

        this.setState({
          name: '',
          text: '',
          nameIsValid: true,
          textIsValid: true,
          comments: comments.concat(newComment),
          submitBlocked: false,
        });
      });

    this.buttonRef.current.blur();
  };

  changeInput = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  renderComments = () => {
    const { comments } = this.state;

    if (comments.length === 0) {
      return (
        <div className="gallery-modal__comments-dummy">
          Здесь пока никто не написал... :(
          <br />
          Оставьте первый комментарий!
        </div>
      );
    }

    const renderedComments = comments.map(comment => {
      const { id, date, text, name } = comment;
      return (
        <div key={id} className="gallery-modal__comment">
          <div className="gallery-modal__comment-info">
            <time className="gallery-modal__comment-date">{transformDate(date)}</time>
            <span className="gallery-modal__comment-user">{name || 'User'}</span>
          </div>
          <p className="gallery-modal__comment-text">{text}</p>
        </div>
      );
    });

    return renderedComments;
  };

  renderModalContent = () => {
    if (this.state.loading) {
      return <Spinner />;
    }

    if (this.state.error) {
      return <ErrorIndicator />;
    }

    const { closeModal } = this.props;
    const { url, name, text, nameIsValid, textIsValid } = this.state;
    const comments = this.renderComments();

    return (
      <>
        <div className="gallery-modal__image-container">
          <Img src={url} className="gallery-modal__image" alt="" />
        </div>
        <div className="gallery-modal__comments">{comments}</div>
        <form className="gallery-modal__form" onSubmit={this.submitForm}>
          <div className="gallery-modal__input">
            <Input name="name"
              value={name}
              onChange={this.changeInput}
              placeholder="Ваше имя"
              errorText="Введите ваше имя"
              isValid={nameIsValid} />
          </div>
          <div className="gallery-modal__input">
            <Input name="text"
              value={text}
              onChange={this.changeInput}
              placeholder="Ваш комментарий"
              errorText="Введите комментарий"
              isValid={textIsValid} />
          </div>
          <button className="gallery-modal__button" ref={this.buttonRef}>Оставить комментарий</button>
        <button className="gallery-modal__close" onClick={closeModal}/>
        </form>
      </>
    );
  };

  render() {
    const { closeModal } = this.props;
    const modalContent = this.renderModalContent();

    return (
      <FocusLock>
        <div className="gallery-modal" ref={this.modalRef}>
          <div className="gallery-modal__paranja" onClick={closeModal}/>
          <div className="gallery-modal__content">
            { modalContent }
          </div>
        </div>
      </FocusLock>
    );
  }
}
