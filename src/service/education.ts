import axios from 'axios'
import qs from 'qs'
import { botConfig } from 'config';

export const educationLoginRequest = ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  return axios.post(
    'https://aq.fhmooc.com/api/common/Login/login',
    qs.stringify({
      schoolId: botConfig.fhmooc.schoolId,
      userName: username,
      userPwd: password,
    }),
  )
}

export const educationProcessRequest = ({ cookie }: { cookie: string }) => {
  return axios({
    url: 'https://aq.fhmooc.com/api/design/LearnCourse/statStuProcessCellLogAndTimeLong',
    method: 'post',
    headers: {
      Cookie: cookie,
    },
    data: qs.stringify({
      courseId: 'qkcfawcsxyrom0zrwghhwq',
      moduleIds: 'amifawcspkfh3ziyldznq',
      cellId: 'fz6aioszalf4jlptdibcq',
      auvideoLength: '1111111',
      videoTimeTotalLong: '1111111',
    }),
  })
}
