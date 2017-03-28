const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const _ = require('lodash');
const faker = require('faker');

module.exports = function setup (app) {
    // bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // storage
    let POSTS = [];
    let TAGS = [];

    app.get('/api', (req, res) => {
        res.json({
            status: true,
        });
    });

    // -- POST -----------------------------------------------------------------

    // 获取文章列表
    app.get('/api/posts', (req, res) => {
        res.json({
            status: true,
            data: POSTS
        });
    });

    // 创建新文章
    app.post('/api/posts', (req, res) => {
        /**
         * tags
         *
         * {
         *	title: 'post title',
         *	body: 'post content',
         *	tagIds: ['1', '2', '3']
         * }
         */
        const { title, body, tagIds } = req.body;
        const pid = uuid();

        // 保存文章
        POSTS.push({
            id: pid,
            title,
            body,
            tagIds,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        // 创建 tags
        // posts.push(req.body);

        res.json({
            status: true,
            id: pid
        });
    });

    // 获取单条文章
    app.get('/api/posts/:id', (req, res) => {
        const post = POSTS.find(p => p.id === req.params.id);
        res.json({
            status: post !== undefined,
            data: post
        });
    });

    // 更新
    app.post('/api/posts/:id', (req, res) => {
        const { title, body, tagIds } = req.body;
        const { id } = req.params;
        const postIdx = POSTS.findIndex(p => p.id === id);
        if (postIdx === -1) {
            res.json({
                status: false
            });
            return;
        }

        const post = Object.assign({}, POSTS[postIdx], {
            title,
            body,
            tagIds: tagIds !== undefined ? tagIds : POSTS[postIdx].tagIds,
            updatedAt: Date.now()
        });

        POSTS.splice(postIdx, 1, post);

        res.json({
            status: true,
            id
        });
    });

    // 删除单条数据
    app.get('/api/posts/:id/delete', (req, res) => {
        const { id } = req.params;
        const postIdx = POSTS.findIndex(p => p.id === id);
        POSTS.splice(postIdx, 1);
        res.json({
            status: true
        });
    });

    // -- TAG ------------------------------------------------------------------
    // Tag list
    app.get('/api/tags', (req, res) => {
        res.json({
            status: true,
            data: TAGS
        });
    });

    // Tag detail
    app.get('/api/tags/:id', (req, res) => {
        const { id } = req.params;
        const tagIdx = TAGS.findIndex(t => t.id === id);
        if (tagIdx === -1) {
            res.json({
                status: false
            });
            return;
        }

        res.json({
            status: true,
            data: TAGS[tagIdx]
        });
    });

    // Create tag
    app.post('/api/tags', (req, res) => {
        const { name } = req.body;
        const tid = uuid();
        TAGS.push({
            id: tid,
            name
        });

        res.json({
            status: true,
            id: tid
        });
    });

    // Update tag
    app.post('/api/tags/:id', (req, res) => {
        const { name } = req.body;
        const { id } = req.params;
        const tagIdx = TAGS.findIndex(t => t.id === id);
        if (tagIdx === -1) {
            res.json({
                status: false
            });
            return;
        }
        const tag = Object.assign({}, TAGS[tagIdx], {
            name
        })
        TAGS.splice(tagIdx, 1, tag);

        res.json({
            status: true,
            id
        });
    });

    // Delete tag
    app.get('/api/tags/:id/delete', (req, res) => {
        const { id } = req.params;
        const tagIdx = TAGS.findIndex(t => t.id === id);
        if (tagIdx === -1) {
            res.json({
                status: false
            });
            return;
        }
        TAGS.splice(tagIdx, 1);

        res.json({
            status: true
        });
    });
};
