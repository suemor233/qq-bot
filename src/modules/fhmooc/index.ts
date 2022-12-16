import axios from 'axios'
import qs from 'qs'

import { commandRegistry } from '~/registries/command'
import {
  educationLoginRequest,
  educationProcessRequest,
} from '~/service/education'

import { answerLibrary } from './answer'

export const register = () => {
  commandRegistry.register('safe', async (event) => {
    const { commandParsedArgs } = event
    const username = commandParsedArgs._[1] || commandParsedArgs.username
    const password = commandParsedArgs._[2] || commandParsedArgs.password
    if (!username || !password) {
      event.reply('格式错误 ❌', true)
      return
    }

    const user = (await educationLoginRequest({
      username,
      password,
    })) as any
    if (user.data.code <= 0) {
      event.reply(user.data.msg, true)
      return
    }

    if (user.data.code == 5) {
      event.reply('请先去修改密码！！！👊', true)
      return
    }

    await educationProcessRequest({
      cookie: user.headers['set-cookie'][1],
    })
    const { data } = await educationProcessRequest({
      cookie: user.headers['set-cookie'][1],
    })

    if (data.code == 1) {
      event.reply('时长刷课成功', true)
    } else {
      event.reply('时长刷课出现未知错误', true)
    }

    const cookie = user.headers['set-cookie'][1]

    const {
      data: { paperId, paperStuId, stuPaperQuesList },
    } = await axios({
      url: 'https://aq.fhmooc.com/api/design/PaperStudent/getStuPaper',
      method: 'post',
      headers: {
        Cookie: cookie,
      },
      data: qs.stringify({
        courseId: 'qkcfawcsxyrom0zrwghhwq',
      }),
    })

    await stuPaperQuesList.map(async (item: any) => {
      const answerJson: { quesId: string; answer: number | string } = {
        quesId: '',
        answer: 0,
      }
      const res = answerLibrary.find(
        (itemLib) => itemLib.paperQuestionId === item.quesId,
      )
      if (res) {
        answerJson.quesId = item.quesId
        if (item.quesType == 1 || item.quesType == 3) {
          answerJson.answer = Number(res.answers[0])
        } else {
          answerJson.answer = res.answers.join('；')
        }
        await axios({
          url: 'https://aq.fhmooc.com/api/design/PaperStudent/saveStuQuesAnswer',
          method: 'post',
          headers: {
            Cookie: cookie,
          },
          data: qs.stringify({
            paperStuId,
            paperId,
            quesId: item.quesId,
            answerJson: JSON.stringify(answerJson),
          }),
        })
      }
    })

    const test = await axios({
      url: 'https://aq.fhmooc.com/api/design/PaperStudent/submitStuPaper',
      method: 'post',
      headers: {
        Cookie: cookie,
      },
      data: qs.stringify({
        paperStuId,
        paperId,
      }),
    })
    if (test.data.code == 1) {
      event.reply('刷题成功', true)
    } else {
      event.reply('刷题失败', true)
    }
  })
}
