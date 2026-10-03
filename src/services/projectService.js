import { api } from './apiClient';

const mockProjects = [
{
    id: 1,
    name: 'E-Commerce Website',
    client: 'ABC Technologies',
    status: 'In Progress',
    ownerId: 1,
    startDate: '2025-01-10',
    endDate: '2025-03-15',
    hours: 120,
    finalCost: 24000
},
{
    id: 2,
    name: 'Banking Application',
    client: 'SBI Bank',
    status: 'Pending',
    ownerId: 2,
    startDate: '2025-02-01',
    endDate: '2025-04-20',
    hours: 96,
    finalCost: 18500
},
{
    id: 3,
    name: 'Mobile App Development',
    client: 'Tech Solutions',
    status: 'Completed',
    ownerId: 3,
    startDate: '2025-03-01',
    endDate: '2025-06-15',
    hours: 200,
    finalCost: 40000
}
];

const mockUsers = [
  { id: 1, name: 'Sai' },
  { id: 2, name: 'Seetha' },
  { id: 3, name: 'Ram' }
];

export const getProjects = ({ signal } = {}) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(
          new DOMException(
            'The operation was aborted.',
            'AbortError'
          )
        );
        return;
      }

      resolve(mockProjects);
    }, 2500);

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);

          reject(
            new DOMException(
              'The operation was aborted.',
              'AbortError'
            )
          );
        },
        { once: true }
      );
    }
  });
};

export const getProject = (id, { signal } = {}) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(
          new DOMException(
            'The operation was aborted.',
            'AbortError'
          )
        );
        return;
      }

      const project = mockProjects.find(
        (item) => String(item.id) === String(id)
      );

      resolve(project || null);
    }, 500);

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);

          reject(
            new DOMException(
              'The operation was aborted.',
              'AbortError'
            )
          );
        },
        { once: true }
      );
    }
  });
};

export const getUsers = ({ signal } = {}) => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    return Promise.resolve(mockUsers);
  }

  return api.get('/users', { signal }).catch(() => mockUsers);
};