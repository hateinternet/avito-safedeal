export default class GalleryService {
  _apiBase = 'https://boiling-refuge-66454.herokuapp.com';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  async getAllImages() {
    const res = await this.getResource('/images');
    return await res;
  }

  async getImage(id) {
    const res = await this.getResource(`/images/${id}`);
    return await res;
  }

  async postComment(id, comment) {
    const res = await fetch(`${this._apiBase}/images/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(comment),
    });

    if (res.status !== 204) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }

    return Promise.resolve();
  }
}
