import { jest, test, expect } from '@jest/globals';

jest.unstable_mockModule('../../models/groupNoticeModel.js', () => ({
  getAllNotices: jest.fn().mockResolvedValue([{ title: 'hola' }]),
  getNoticesByCluster: jest.fn().mockResolvedValue([])
}));

const { getGroupNotices, getGroupNoticesByCluster } = await import('../../controllers/groupNoticeController.js');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

test('getGroupNotices responde con json', async () => {
  const res = mockRes();
  await getGroupNotices({}, res);
  expect(res.json).toHaveBeenCalledWith([{ title: 'hola' }]);
});

test('getGroupNoticesByCluster responde 404 si no hay docs', async () => {
  const req = { params: { cluster: 99 } };
  const res = mockRes();
  await getGroupNoticesByCluster(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});
