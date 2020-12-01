export async function get(request) {
  const mockData = [
    { id: 1, title: 'Godzilla', box_art_url: 'abc.jpg' },
    { id: 2, title: 'Adventure Time', box_art_url: 'abc.jpg' },
    { id: 3, title: 'The Mandalorian', box_art_url: 'abc.jpg' },
  ]
  return { body: mockData }
}
