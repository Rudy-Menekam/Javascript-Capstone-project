import fetchLikes from '../src/modules/fetchLikes';

const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'MQomAQGD2c0JHxU5tUHT';

describe('fetchLikes', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return an array of likes when response is successful', async () => {
    const mockData = [1, 2, 3];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };

    fetch.mockResolvedValue(mockResponse);

    const result = await fetchLikes();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${APP_ID}/likes`);
    expect(result).toEqual(mockData);
  });

  it('should return an empty array when response is not successful', async () => {
    const mockResponse = {
      ok: false,
    };

    fetch.mockResolvedValue(mockResponse);

    const result = await fetchLikes();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${APP_ID}/likes`);
    expect(result).toEqual([]);
  });

  it('should return an error when fetch fails', async () => {
    const mockError = new Error('Fetch failed');

    fetch.mockRejectedValue(mockError);

    const result = await fetchLikes();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${APP_ID}/likes`);
    expect(result).toEqual(mockError);
  });
});