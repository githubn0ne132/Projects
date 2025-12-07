const request = require('supertest');
const app = require('../index');
const { sequelize, User, Project, Task } = require('../models');

// Increase timeout for DB operations
jest.setTimeout(30000);

let server;
let adminToken;
let contributorToken;
let adminId;
let contributorId;
let projectId;
let taskId;

beforeAll(async () => {
    // Start server manually to avoid EADDRINUSE if tests run in parallel or if index.js auto-starts
    // But index.js exports app and only listens if main.
    // However, supertest creates a temporary server.

    // Connect and sync DB
    await sequelize.authenticate();
    // We don't want to wipe the remote production DB if possible, but for tests to be reliable, we usually need a clean slate.
    // Given we are using the user's provided DB which is "defaultdb", I should be careful.
    // The user said "implement full unit test". Ideally, I should use a separate test DB or transaction rollbacks.
    // Since I cannot create a new DB easily on a managed cloud instance without permissions, I will prefix test data or just create data and clean it up.
    // Or I can force sync with force: true if I am allowed to wipe it.
    // "Use this db for it". I will assume I can use it.
    // I will CREATE unique users for testing to avoid conflict.
});

afterAll(async () => {
    await sequelize.close();
});

describe('Backend API Tests', () => {

    // Auth Tests
    describe('Auth Endpoints', () => {
        it('should register a new admin user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testadmin_' + Date.now(),
                    email: 'admin_' + Date.now() + '@test.com',
                    password: 'password123',
                    role: 'Admin'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body.user).toHaveProperty('id');
            adminId = res.body.user.id;
        });

        it('should login the admin user', async () => {
             // Retrieve the user created above
             const user = await User.findByPk(adminId);
             const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: user.email,
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            adminToken = res.body.token;
        });

        it('should register a contributor user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testcontrib_' + Date.now(),
                    email: 'contrib_' + Date.now() + '@test.com',
                    password: 'password123',
                    role: 'Contributor'
                });
            expect(res.statusCode).toEqual(201);
            contributorId = res.body.user.id;
        });

         it('should login the contributor user', async () => {
             const user = await User.findByPk(contributorId);
             const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: user.email,
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            contributorToken = res.body.token;
        });
    });

    // Project Tests
    describe('Project Endpoints', () => {
        it('should create a project (Admin)', async () => {
            const res = await request(app)
                .post('/api/projects')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    title: 'Test Project',
                    description: 'Test Description',
                    status: 'Active'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            projectId = res.body.id;
        });

        it('should not allow contributor to create a project', async () => {
             const res = await request(app)
                .post('/api/projects')
                .set('Authorization', `Bearer ${contributorToken}`)
                .send({
                    title: 'Contrib Project',
                    description: 'Desc'
                });
            expect(res.statusCode).toEqual(403);
        });

        it('should get all projects', async () => {
             const res = await request(app)
                .get('/api/projects')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.some(p => p.id === projectId)).toBeTruthy();
        });

        it('should get project by id', async () => {
             const res = await request(app)
                .get(`/api/projects/${projectId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toEqual(projectId);
        });
    });

    // Task Tests
    describe('Task Endpoints', () => {
        it('should create a task (Admin)', async () => {
             const res = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    title: 'Test Task',
                    description: 'Task Desc',
                    priority: 'High',
                    project_id: projectId,
                    assignee_id: contributorId
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            taskId = res.body.id;
        });

        it('should update task status (Contributor)', async () => {
             const res = await request(app)
                .put(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${contributorToken}`)
                .send({
                    status: 'In Progress',
                    progress: 50
                });
             expect(res.statusCode).toEqual(200);
             expect(res.body.status).toEqual('In Progress');
             expect(res.body.progress).toEqual(50);
        });
    });

    // Search Test
    describe('Search Endpoints', () => {
        it('should search for projects', async () => {
            const res = await request(app)
               .get('/api/search?q=Test')
               .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('projects');
            expect(res.body.projects.length).toBeGreaterThan(0);
        });
    });

    // Cleanup
    afterAll(async () => {
        // Delete created resources
        if (taskId) await Task.destroy({ where: { id: taskId } });
        if (projectId) await Project.destroy({ where: { id: projectId } });
        if (adminId) await User.destroy({ where: { id: adminId } });
        if (contributorId) await User.destroy({ where: { id: contributorId } });
    });
});
