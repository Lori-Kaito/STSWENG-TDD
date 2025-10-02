const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller (Jest version)', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        author: 'stswenguser',
        title: 'My first test post',
        content: 'Random content',
      },
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
  });

  it('should return the created post object', () => {
    const expectedResult = {
      _id: '507asdghajsdhjgasd',
      title: 'My first test post',
      content: 'Random content',
      author: 'stswenguser',
      date: Date.now(),
    };

    // mock PostModel.createPost
    PostModel.createPost = jest.fn((data, cb) => cb(null, expectedResult));

    PostController.create(req, res);

    expect(PostModel.createPost).toHaveBeenCalledWith(req.body, expect.any(Function));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    }));
  });

  it('should return 500 on server error', () => {
    const error = new Error('Some error');
    PostModel.createPost = jest.fn((data, cb) => cb(error));

    PostController.create(req, res);

    expect(PostModel.createPost).toHaveBeenCalledWith(req.body, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalled();
  });

    describe('update', () => {
  it('should return the updated post object', () => {
    const expectedResult = {
      _id: '507asdghajsdhjgasd',
      title: 'Updated Title',
      content: 'Updated Content',
      author: 'stswenguser',
      date: Date.now(),
    };

    req = {
      params: { id: '507asdghajsdhjgasd' },
      body: {
        title: 'Updated Title',
        content: 'Updated Content',
      },
    };

    // mock PostModel.updatePost
    PostModel.updatePost = jest.fn((id, data, cb) => cb(null, expectedResult));

    PostController.update(req, res);

    expect(PostModel.updatePost).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      expect.any(Function)
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        title: req.body.title,
        content: req.body.content,
      })
    );
  });

  it('should return 500 on server error', () => {
    const error = new Error('Update failed');
    req = {
      params: { id: '507asdghajsdhjgasd' },
      body: { title: 'Updated Title' },
    };

    PostModel.updatePost = jest.fn((id, data, cb) => cb(error));

    PostController.update(req, res);

    expect(PostModel.updatePost).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalled();
  });
});

    describe('findPost', () => {

    })
});