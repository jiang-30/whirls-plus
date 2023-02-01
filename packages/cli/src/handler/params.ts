import inquirer from "inquirer";
import { exitHandler } from "src/utils";

export type module = 'lint' | 'e2e' | 'auth'
export interface IParams {
  projectName: string
  modules: module[]
}

export async function generateParams(projectName: string) {
  const answers: IParams = await inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "项目名称",
        default: projectName,
        validate(input, answers) {
          if(input) {
            return true
          }
          return false
        }
      },
      // version、description、git repository、keywords、author、license
      {
        type: "checkbox",
        name: "modules",
        message: "开启的功能",
        choices: [
          {
            name: "代码风格",
            value: "lint",
          },
          {
            name: "E2E测试",
            value: "e2e",
          },
          {
            name: "权限模块",
            value: "auth",
          },
        ],
      },

    ])

  return answers

}


export async function confirmParams(isExist: boolean) {
  const { isConfirm } = await inquirer.prompt([{
    type: "confirm",
    name: "isConfirm",
    default: true,
    message: `项目配置
{
type: "confirm",
name: "confirm",
default: true
}
${isExist ? '会覆盖原有项目，' : ''}是否确定`
  }])

  if(!isConfirm) {
    exitHandler('已取消')
  }
}
