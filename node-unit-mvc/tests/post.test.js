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
    it('should return a single post when found', () => {
      const expectedPost = {
        _id: '507asdghajsdhjgasd',
        title: 'My first test post',
        content: 'Random content',
        author: 'stswenguser',
        date: Date.now(),
      };

      req = {
        params: { id: '507asdghajsdhjgasd' }
      };

      // Mock PostModel.findPost to return the expected post
      PostModel.findPost = jest.fn((id, cb) => cb(null, expectedPost));

      PostController.findPost(req, res);

      expect(PostModel.findPost).toHaveBeenCalledWith(
        req.params.id,
        expect.any(Function)
      );
      expect(res.json).toHaveBeenCalledWith(expectedPost);
    });

    it('should return 404 when post is not found', () => {
      req = {
        params: { id: 'nonexistentid' }
      };

      // Mock PostModel.findPost to return null (not found)
      PostModel.findPost = jest.fn((id, cb) => cb(null, null));

      PostController.findPost(req, res);

      expect(PostModel.findPost).toHaveBeenCalledWith(
        req.params.id,
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.end).toHaveBeenCalled();
    });

    it('should return 500 on server error', () => {
      const error = new Error('Database error');
      req = {
        params: { id: '507asdghajsdhjgasd' }
      };

      PostModel.findPost = jest.fn((id, cb) => cb(error));

      PostController.findPost(req, res);

      expect(PostModel.findPost).toHaveBeenCalledWith(
        req.params.id,
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts', () => {
      const expectedPosts = [
        {
          _id: '507asdghajsdhjgasd',
          title: 'First Post',
          content: 'Content 1',
          author: 'stswenguser',
          date: Date.now(),
        },
        {
          _id: '507asdghajsdhjgasd2',
          title: 'Second Post',
          content: 'Content 2',
          author: 'stswenguser',
          date: Date.now(),
        }
      ];

      // Mock PostModel.getAllPosts to return the expected posts
      PostModel.getAllPosts = jest.fn((cb) => cb(null, expectedPosts));

      PostController.getAllPosts(req, res);

      expect(PostModel.getAllPosts).toHaveBeenCalledWith(expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(expectedPosts);
    });

    it('should return 500 on server error', () => {
      const error = new Error('Database error');
      
      PostModel.getAllPosts = jest.fn((cb) => cb(error));

      PostController.getAllPosts(req, res);

      expect(PostModel.getAllPosts).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalled();
    });
  });
});