export const photos = {
  reasons: ['/images/course-02.webp', '/images/course-03.webp', '/images/course-04.webp'],
  methods: ['/images/course-05.webp', '/images/course-06.webp', '/images/course-07.webp', '/images/course-08.webp'],
  results: Array.from({length: 11}, (_, i) => `/images/course-${String(i + 9).padStart(2, '0')}.webp`),
};
export const num = (n) => String(n).padStart(2, '0');
export const rub = (n) => new Intl.NumberFormat('ru-RU').format(n);
