import fetchLikes from '../src/modules/fetchLikes.js';

const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'MQomAQGD2c0JHxU5tUHT';

describe('fetchLikes', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return an empty array when there are no likes', async () => {
    const mockData = [];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };

    fetch.mockResolvedValue(mockResponse);

    const result = await fetchLikes();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${APP_ID}/likes`);
    expect(result).toEqual(mockData);
  });
});
