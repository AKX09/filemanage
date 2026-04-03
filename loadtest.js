import http from 'k6/http';
import { sleep, check } from 'k6';

const fileData = open('./f1.txt', 'b');

export let options = {
  vus: 100,           
  duration: '60s',
};

export default function () {

  const payload = {
    file: http.file(fileData, 'f1.txt'), 
  };

  let res = http.post('http://localhost:5000/files/upload', payload);


  check(res, {
    'upload success': (r) => r.status === 200,
  });


  let link;
  try {
    link = JSON.parse(res.body).link;
  } catch (e) {}

  if (link) {
    http.get(link);
  }

  sleep(1);
}